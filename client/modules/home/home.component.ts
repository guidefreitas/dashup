import { Component } from "@angular/core";
import { ApiService } from "../../service/api.service";

@Component({
    selector: "home",
    templateUrl: `client/modules/home/home.component.html`
})
export class HomeComponent {
    error: string;
    response: {};

    constructor(private apiService: ApiService) {}

    protected() {
        this.apiService
            .get("/protected")
            .subscribe(
                (data) => { this.response = data; },
                (error: Error) => {
                    this.error = error.message;
                    setTimeout(() => this.error = null, 4000)
                });
    }
}
