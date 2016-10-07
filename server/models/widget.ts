import * as mongoose from "mongoose";
import { DashboardSchema } from "./dashboard";
import { FeedSchema } from "./feed";

export var WidgetSchema = new mongoose.Schema({
    dashboard: { type: mongoose.Schema.ObjectId, ref: DashboardSchema },
    feed:  { type: mongoose.Schema.ObjectId, ref: FeedSchema },
    name: String,
    type: String,
    value: String
});
 
export interface IWidget extends mongoose.Document {
  dashboard: mongoose.Schema.ObjectId;
  feed: mongoose.Schema.ObjectId;
  name: string; 
  type: string;
  value: string;
};
 
