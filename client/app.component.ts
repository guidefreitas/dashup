import { Component, ViewChild } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { SemanticPopupComponent } from "ng-semantic";
import { Router } from '@angular/router'
import "rxjs/add/operator/map";
import { ApiService } from "./service/api.service";
import { Observable }        from 'rxjs/Observable';

@Component({
    selector: "app",
    templateUrl: "client/app.component.html"
})
export class AppComponent {
    
    appName: string = "Dashup";
    user: any = {
        email: "",
        password: ""
    };
    errorMessage: string;
    isLogged: boolean;
    response: Response & { hashed?: string, salt?: string };
    @ViewChild("myPopup") myPopup: SemanticPopupComponent;
    @ViewChild("myProfilePoppup") myProfilePoppup: SemanticPopupComponent;

    constructor(private http: Http, private router: Router, private apiService: ApiService) {
        
    }


    LoadProfile(){
        let promise = Promise.resolve();
        promise.then(() => {
            return this.apiService.getUserProfile();
        }).then((res) => {
            res.subscribe(resSub => this.user = resSub.data)
        }).catch((error) => {
            this.isLogged = false;
        });
    }

    ngOnInit() {
        this.isLogged = !!localStorage.getItem("id_token");
        if(this.isLogged){
            this.LoadProfile();
        }
    }

    login() {
        this.http.post("/login", JSON.stringify({ email: this.user.email, password: this.user.password }), new RequestOptions({
            headers: new Headers({"Content-Type": "application/json"})
        }))
            .map((res: Response) => res.json())
            .subscribe(
                (res: Response & { jwt: string }) => {
                    localStorage.setItem("id_token", res.jwt);
                    this.isLogged = true;
                    this.myPopup.hide();
                    this.router.navigate(['./dashboards']);
                },
                (error: Error) => { 
                    this.isLogged = false;
                    this.errorMessage = "Invalid email or password"; 
                }
            );
    }

    logout(): void {
        localStorage.removeItem("id_token");
        this.isLogged = false;
        this.myProfilePoppup.hide();
        this.user.email = "";
        this.user.password = "";
        this.router.navigate(['./home']);
    }
}