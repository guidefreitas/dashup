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
        let promise = Promise.resolve();
        promise.then(() => {
            return this.apiService.getFeeds();
        }).then((response) => {
            response.subscribe((res) => {
                this.feeds = res.data;
            });
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
        let promise = Promise.resolve();
        promise.then(() => {
            return this.apiService.deleteFeed(id);
        }).then((res) => {
            res.subscribe((data) => {});
            this.LoadFeeds();
        }).catch((error) => {
            console.error(error);
        });
    }

    createNewFeed() {
        let promise = Promise.resolve();
        promise.then(() => {
            console.log('calling ws');
            return this.apiService.createFeed(this.newFeed);
        }).then((res) => {
            res.subscribe((data) => {
                console.log(data);
            })
            this.newFeed.name = "";
            this.newFeedModal.hide();
            this.LoadFeeds();
        }).catch((error) => {
            console.error(error);
        });
        
    }

}
