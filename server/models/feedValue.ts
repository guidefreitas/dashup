import * as mongoose from "mongoose";
import { FeedSchema } from "./feed";

export var FeedValueSchema = new mongoose.Schema({
    feed: { type: mongoose.Schema.ObjectId, ref: FeedSchema },
    value: String,
    date: { type: Date, default: Date.now }
});
 
export interface IFeedValue extends mongoose.Document {
  feed: mongoose.Schema.ObjectId;
  value: string;
  date: Date;
};
 
