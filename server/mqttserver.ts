import * as mosca from 'mosca';
import { UserRepository, FeedRepository } from './models/repositories'
import { IFeedValue } from "./models/feedValue";
import { WebSocketServer } from './websocketserver';

export class MqttServer{

    server : mosca.Server;

    authenticate(client, username, password, callback)
    {
        var authorized = false;
        let promise = Promise.resolve();
        promise.then(() => {
            return UserRepository.findOne()
                                 .where('email')
                                 .equals(username)
                                 .where('apiToken')
                                 .equals(password)
                                 .exec();
        }).then((res) => {
            if(res){
                console.log('MqttServer:Authenticate:User found: ' + res.name);
                authorized = true;
                client.user_id = res._id;
                callback(null, authorized);
            }else{
                throw new Error();
            }
            
        }).catch((error) => {
            console.log('MqttServer:Authenticate:Error:' + error);
            authorized = false;
            callback(null, authorized);
            
        })
 
    }

    authorizePublish(client, topic, payload, callback){
        var authorized = false;
        let promise = Promise.resolve();
        promise.then(() => {
            //var feedName = topic.split("/")[1];
            var feedName = topic;
            return FeedRepository.findOne().where('user').equals(client.user_id)
                                           .where('name').equals(new RegExp('^'+feedName+'$', "i")) 
                                           .exec()
        }).then((res) => {
            if(res){
                authorized = true;
                callback(null, authorized);
            }else{
                console.log('MqttServer:AuthorizePublish:Feed not found');
            }
            
        }).catch((error) => {
            console.log('MqttServer:AuthorizePublish:Error:' + error);
            authorized = false;
            callback(null, authorized);
        })
        
    }

    authorizeSubscribe(client, topic, callback){
        var authorized = false;
        let promise = Promise.resolve();
        promise.then(() => {
            var feedName = topic.split("/")[1];
            return FeedRepository.findOne({
                                    user: client.user_id,  
                                    name: new RegExp('^'+feedName+'$', "i") 
                                }).exec()
        }).then((res) => {
            if(res){
                authorized = true;
                callback(null, authorized);
            }
        }).catch((error) => {
            authorized = false;
            callback(null, authorized);
        })
    }

    setup(){
        this.server.authenticate = this.authenticate;
        this.server.authorizePublish = this.authorizePublish;
        this.server.authorizeSubscribe = this.authorizeSubscribe;
    }

    start() {
        let pubsubsettings = {
            type: 'mongo',
            url: 'mongodb://localhost:27017/mqtt',
            pubsubCollection: 'mqtt_messages',
            mongo: {}
        };

        let moscaSettings = {
            port: 1883,
            backend: pubsubsettings
        };

        this.server = new mosca.Server(moscaSettings);
        this.server.on('ready', () => {
            console.log("Mqtt server started");
            this.setup();
        }); 

        this.server.on('clientConnected', (client) => {
            console.log('MQTT Client Connected:', client.id);
        });

        this.server.on('published', (packet, client) => {
            if(packet.topic.indexOf('/new/clients') !== -1){
                return;
            }

            if(packet.topic.indexOf('/new/unsubscribes') !== -1){
                return;
            }

            if(packet.topic.indexOf('/new/subscribes') !== -1){
                return;
            }

            var feedDb : any;
            let promise = Promise.resolve();
            promise.then(() => {
                var feedName = packet.topic;
                return FeedRepository.findOne().where('user').equals(client.user_id)
                                               .where('name').equals(new RegExp('^'+feedName+'$', "i"))
                                               .populate('values')
                                               .exec();
            }).then((res) => {
                if(res){

                    let dataJsonString = new Buffer(packet.payload).toString('ascii');
                    let dataJson = JSON.parse(dataJsonString);
                    let feedValue = <IFeedValue>{
                        feed: res._id,
                        value: dataJson.value
                    }
                    feedDb = res;
                    res.values.push(feedValue);
                    return res.save();
                }else{
                    feedDb = undefined;
                    throw new Error("MqttServer:Published:Error:Feed not Found");
                }
            }).then((res2) => {
                if(feedDb){
                    WebSocketServer.Send(feedDb._id, feedDb.values);
                }
            }).catch((error) => {
                console.log("MqttServer:Published:Error:" + error.message);
            })            
        });
    }
}