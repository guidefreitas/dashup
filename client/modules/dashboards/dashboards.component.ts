import { Component } from "@angular/core";
import { ApiService } from "../../service/api.service";

@Component({
    selector: "dashboards",
    templateUrl: `client/modules/dashboards/dashboards.component.html`
})
export class DashboardsComponent {
    error: string;
    response: {};

    constructor(private apiService: ApiService) {}

}
