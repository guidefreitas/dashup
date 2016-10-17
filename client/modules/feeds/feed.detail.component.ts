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

    public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
    };
    public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    public randomize():void {
        // Only Change 3 values
        let data = [
        Math.round(Math.random() * 100),
        59,
        80,
        (Math.random() * 100),
        56,
        (Math.random() * 100),
        40];
        let clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }

    LoadFeed(){
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.apiService
                .getFeed(id)
                .then((res) => {
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
