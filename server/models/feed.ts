import * as mongoose from "mongoose";
import { UserSchema } from "./user";
import { IFeedValue, FeedValueSchema } from "./FeedValue"

export var FeedSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: UserSchema },
    name: String,
    values: [FeedValueSchema]
});
 
export interface IFeed extends mongoose.Document {
  user: string;
  name: mongoose.Schema.ObjectId;
  values: [IFeedValue];
};
 
