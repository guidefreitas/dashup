import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";
import { FeedsComponent } from "./feeds.component";
import { FeedDetailComponent } from './feed.detail.component';
import { feedsRouting } from "./feeds.routing";
import { SharedModule } from "../shared/shared.module";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        feedsRouting,
        SharedModule.forRoot(),
        BrowserModule,
        FormsModule,
        NgSemanticModule       
    ],
    declarations: [
        FeedsComponent,
        FeedDetailComponent
    ],
    providers: [
        AuthService
    ],
    bootstrap: [
        FeedsComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class FeedsModule { }