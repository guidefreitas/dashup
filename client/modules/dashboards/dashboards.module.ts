import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";
import { DashboardsComponent } from "./dashboards.component";
import { dashboardsRouting } from "./dashboards.routing";
import { SharedModule } from "../shared/shared.module";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        dashboardsRouting,
        SharedModule.forRoot(),
        BrowserModule,
        FormsModule,
        NgSemanticModule
    ],
    declarations: [
        DashboardsComponent
    ],
    bootstrap: [
        DashboardsComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DashboardsModule { }