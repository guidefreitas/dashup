import * as mongoose from "mongoose";
import { UserSchema } from "./user";

export var DashboardSchema = new mongoose.Schema({
    name: String,
    user: { type: mongoose.Schema.ObjectId, ref: UserSchema }
});
 
export interface IDashboard extends mongoose.Document {
  name: string; 
  user: mongoose.Schema.ObjectId;
  value: string;
};
 
