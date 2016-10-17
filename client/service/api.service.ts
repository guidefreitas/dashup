import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Response } from "@angular/http";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';

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
                   .map((response: Response) => response.json())
                   .toPromise();
    }

    getFeeds() {
        return this.authHttp
                   .get(this.API_PREFIX + '/feeds')
                   .map((response: Response) => response.json())
                   .toPromise();
    }

    getFeed(id : String){
        return this.authHttp
                   .get(this.API_PREFIX + '/feeds/' + id)
                   .map((response: Response) => response.json())
                   .toPromise();
    }

    getDashboards(){
        return this.authHttp
                   .get(this.API_PREFIX + '/dashboards')
                   .map((response: Response) => response.json())
                   .toPromise();
    }

    getDashboard(id : String){
        return this.authHttp
                   .get(this.API_PREFIX + '/dashboards/' + id)
                   .map((response: Response) => response.json())
                   .toPromise();
    }

    deleteFeed(id){
        return this.authHttp.delete(this.API_PREFIX + '/feeds/' + id)
                            .map((res: Response) => res.json())
                            .toPromise();
    }
    createFeed(data){
        return this.authHttp.post(this.API_PREFIX + '/feeds', data)
                            .map((res : Response) => res.json())
                            .toPromise();
    }
}
