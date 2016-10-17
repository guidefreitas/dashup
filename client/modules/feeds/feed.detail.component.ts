import { Component, ViewChild } from "@angular/core";
import { ApiService } from "../../service/api.service";
import { Observable }        from 'rxjs/Observable';
import { SemanticModalComponent } from "ng-semantic";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "feed",
    templateUrl: `client/modules/feeds/feed.detail.component.html`
})
export class FeedDetailComponent {
    error: string;
    response: {};
    feed: { _id: '', name: '', values: [any]};
    errorMessage: '';

    LoadFeed(){
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.apiService
                .getFeed(id)
                .subscribe(res => {
                    console.log(res);
                    this.feed = res.data;
                });
            });
    }

    constructor(private apiService: ApiService, private route: ActivatedRoute) {
        this.feed = { _id: '', name: '', values: [{}]};
    }

    ngOnInit() {
        this.LoadFeed();
    }
}
