import * as mongoose from "mongoose";
import { IFeed, FeedSchema } from "./feed"
import { IDashboard, DashboardSchema } from "./dashboard"

export var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    hashedPassword: String,
    salt: String,
    feeds: [FeedSchema],
    dashboards: [DashboardSchema]
});
 
export interface IUser extends mongoose.Document {
  name: string; 
  email: string;
  hashedPassword: string;
  salt: string;
  feeds: [IFeed];
  dashboards: [IDashboard]
};
 
