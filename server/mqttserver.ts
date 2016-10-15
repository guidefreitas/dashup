import * as mosca from 'mosca';
import { UserRepository, FeedRepository } from './models/repositories'

export class MqttServer{
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

        let server = new mosca.Server(moscaSettings);
        server.on('ready', () => {
            console.log("Mqtt server started");
        }); 

        server.on('clientConnected', (client) => {
            console.log('MQTT Client Connected:', client.id);
        });

        server.on('published', (packet, client) => {
            //console.log('Published', packet);
            if(packet.topic == '/feed'){
                try{
                    let dataJsonString = new Buffer(packet.payload).toString('ascii');
                    let dataJson = JSON.parse(dataJsonString);
                    console.log('AuthToken: ', dataJson.AuthToken);
                    let promise = Promise.resolve();
                    promise.then(() => {
                        return UserRepository.findOne()
                                             .where('apiToken')
                                             .equals(dataJson.AuthToken)
                                             .exec();
                    }).then((user) => {
                        console.log('User: ', user.name)
                        return FeedRepository.findOne()
                                             .where('user')
                                             .equals(user._id)
                                             .where('name')
                                             .equals(dataJson.Feed)
                                             .exec()
                    }).then((feed) => {
                        console.log(feed);
                    }).catch((error) => {
                        console.log('Error: ', error);
                    });
                    //console.log('Client', client);
                }catch(ex){
                    console.log(ex);
                }
                
            }
            
        });
    }
}