import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { FormsModule } from '@angular/forms';
import { SignupComponent } from "./signup/signup.component";
import { routing } from "./auth.routing";
import { SharedModule } from "../shared/shared.module";
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        HttpModule,
        NgSemanticModule,
        routing,
        FormsModule,
        BrowserModule,
        SharedModule.forRoot()
    ],
    exports: [ SignupComponent ],
    declarations: [ SignupComponent ],
    bootstrap:    [ SignupComponent ]
})
export class AuthModule { }