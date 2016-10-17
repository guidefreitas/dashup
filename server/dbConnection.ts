import * as mongoose from "mongoose";
import * as config from './config';

export class DbConnection{

  static uri : string = 'mongodb://' + config.mongoDbHost + '/' + config.mongoDbName;

   static connect() {
    mongoose.Promise = global.Promise; 
    if(mongoose.connection.readyState == 0){
      mongoose.connect(this.uri, (err) => {
      if (err) {
        console.log(err.message);
        console.log(err);
      }
      else {
        console.log('Connected to MongoDb');
      }
    });
    }
    
  }
}
