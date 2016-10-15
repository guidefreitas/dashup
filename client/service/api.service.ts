import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Response } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class ApiService {

    API_PREFIX : String = '/api';

    constructor(private authHttp: AuthHttp) {}

    get(url: string) {
        return this
            .authHttp
            .get(url)
            .map((response: Response) => response.json());
    }
    

    getUserProfile(){
        return this.authHttp
                   .get(this.API_PREFIX + '/users/profile')
                   .map((response: Response) => response.json());
    }

    getFeeds() {
        return this.authHttp
                   .get(this.API_PREFIX + '/feeds')
                   .map((response: Response) => response.json());
    }

    getFeed(id : String){
        return this.authHttp
                   .get(this.API_PREFIX + '/feeds/' + id)
                   .map((response: Response) => response.json());
    }

    getDashboards(){
        return this.authHttp
                   .get(this.API_PREFIX + '/dashboards')
                   .map((response: Response) => response.json());
    }

    getDashboard(id : String){
        return this.authHttp
                   .get(this.API_PREFIX + '/dashboards/' + id)
                   .map((response: Response) => response.json());
    }

    deleteFeed(id){
        return this.authHttp.delete(this.API_PREFIX + '/feeds/' + id)
                            .map((res: Response) => res.json());
    }
    createFeed(data){
        return this.authHttp.post(this.API_PREFIX + '/feeds', data)
                            .map((res : Response) => res.json());
    }
}
