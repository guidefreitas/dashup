import * as mongoose from "mongoose";

export class DbConnection{
  static uri : string = 'mongodb://localhost/dashup';

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
