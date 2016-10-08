import { Component, ViewChild } from "@angular/core";
import { Router } from '@angular/router'
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { SemanticPopupComponent } from "ng-semantic";
import "rxjs/add/operator/map";

@Component({
    selector: "app",
    templateUrl: "client/modules/auth/signup/signup.component.html"
})
export class SignupComponent {

    message: string = ""

    user: any = {
        name: "",
        email: "",
        password: ""
    }

    constructor(private http: Http, private router: Router) {
        
    }

    signup(event) {
        event.preventDefault();
        this.message = "Enviando";
        let data = JSON.stringify({ 
            name: this.user.name,
            email: this.user.email, 
            password: this.user.password 
        });
        
        this.http.post("/login/signup", data, new RequestOptions({
            headers: new Headers({"Content-Type": "application/json"})}))
            .map((res: any) => res.json())
            .subscribe(
                (res: Response) => {
                    this.router.navigate(['./home']);
                },
                (error: Error) => { 
                    this.message = error.message;
                    console.log(error); 
                }
            );
    }
}