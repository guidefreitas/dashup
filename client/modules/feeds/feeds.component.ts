import { Component, ViewChild } from "@angular/core";
import { ApiService } from "../../service/api.service";
import { Observable }        from 'rxjs/Observable';
import { SemanticModalComponent } from "ng-semantic";

@Component({
    selector: "feeds",
    templateUrl: `client/modules/feeds/feeds.component.html`
})
export class FeedsComponent {
    @ViewChild("newFeedModal") newFeedModal: SemanticModalComponent;

    newFeed : {
        name: ""
    };

    error: string;
    response: {};
    feeds: Observable<[any]>;
    errorMessage : String;

    LoadFeeds(){
        let promise = this.apiService.getFeeds();
        promise.then((res) => {
            this.feeds = res.data;
        }).catch((error) => {
            this.errorMessage = error;
        });
    }

    constructor(private apiService: ApiService) {
        this.LoadFeeds();
        this.newFeed = { name: "" };
    }

    deleteFeed(id){
        console.log('Deleting' + id);
        let promise = this.apiService.deleteFeed(id);
        promise.then((res) => {
            //res.subscribe((data) => {});
            this.LoadFeeds();
        }).catch((error) => {
            console.error(error);
        });
    }

    createNewFeed() {
        let promise = this.apiService.createFeed(this.newFeed);
        promise.then((res) => {
            console.log(res);
            this.newFeed.name = "";
            this.newFeedModal.hide();
            this.LoadFeeds();
        }).catch((error) => {
            console.error(error);
        });
        
    }

}
