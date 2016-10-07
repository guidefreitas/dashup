import * as mongoose from "mongoose";
import { IUser, UserSchema } from "./user"
import { IWidget, WidgetSchema } from "./widget"
import { IDashboard, DashboardSchema } from "./dashboard"
import { IFeed, FeedSchema } from "./feed"
import { IFeedValue, FeedValueSchema } from "./feedValue"

export var UserRepository = mongoose.model<IUser>('User', UserSchema);
export var WidgetRepository = mongoose.model<IWidget>('Widget', WidgetSchema);
export var DashboardRepository = mongoose.model<IDashboard>('Dashboard', DashboardSchema);
export var FeedRepository = mongoose.model<IFeed>('Feed', FeedSchema);
export var FeedValueRepository = mongoose.model<IFeedValue>('FeedValue', FeedValueSchema);