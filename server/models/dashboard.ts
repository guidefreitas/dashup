import * as mongoose from "mongoose";
import { UserSchema } from "./user";
import { IWidget, WidgetSchema } from './widget';

export var DashboardSchema = new mongoose.Schema({
    name: String,
    user: { type: mongoose.Schema.ObjectId, ref: UserSchema },
    widgets: [WidgetSchema]
});
 
export interface IDashboard extends mongoose.Document {
  name: string; 
  user: mongoose.Schema.ObjectId;
  value: string;
  widgets: [IWidget];
};
 
