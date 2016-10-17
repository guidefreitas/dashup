import { Component, ViewChild } from "@angular/core";
import { ApiService } from "../../service/api.service";
import { AuthService } from '../../service/auth.service';
import { Observable }        from 'rxjs/Observable';
import { SemanticModalComponent } from "ng-semantic";
import { ActivatedRoute } from '@angular/router';
import * as io from "socket.io-client";
import { config } from '../../config';

@Component({
    selector: "feed",
    templateUrl: `client/modules/feeds/feed.detail.component.html`
})
export class FeedDetailComponent {
    socket:any = null;
    error: string;
    response: {};
    feed: { _id: '', name: '', values: [any]};
    errorMessage: '';
    authSrv : AuthService;

    LoadFeed(){
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.apiService
                .getFeed(id)
                .subscribe(res => {
                    this.feed = res.data;
                    this.InitWS();
                });
            });
    }

    constructor(private apiService: ApiService, 
                private route: ActivatedRoute,
                private authService : AuthService) {
        this.feed = { _id: '', name: '', values: [{}]};
        this.authSrv = authService;
        
    }

    InitWS(){
        if(!this.socket){
            let wsUrl = 'http://' + config.websocketUrl + ':' + config.websocketPort; 
            this.socket = io.connect(wsUrl);
            
            let channel = this.feed._id;
            console.log('Channel:' + channel);
            this.socket.on(channel, (message) => {
                console.log('Recebido por WS:' + message);
                this.LoadFeed();
            });
            console.log(this.socket);
        }
        
    }

    ngOnInit() {
        this.LoadFeed();
    }
}
