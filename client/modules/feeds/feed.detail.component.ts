import { Component, ViewChild } from "@angular/core";
import { ApiService } from "../../service/api.service";
import { AuthService } from '../../service/auth.service';
import { Observable }        from 'rxjs/Observable';
import { SemanticModalComponent } from "ng-semantic";
import { ActivatedRoute } from '@angular/router';
import * as io from "socket.io-client";
import { config } from '../../config';
import { Chart } from 'angular-highcharts';

@Component({
    selector: "feed",
    templateUrl: `client/modules/feeds/feed.detail.component.html`
})
export class FeedDetailComponent {
    options: HighchartsOptions;
    socket:any = null;
    error: string;
    response: {};
    feed: { _id: '', name: '', values: [any]};
    errorMessage: '';
    authSrv : AuthService;
    graphData: Array<number>;
    graphLabels: Array<Date>;

    chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      xAxis: {
            type: 'datetime',
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
      yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
      },
      credits: {
        enabled: false
      },
      series: [{
        name: '',
        data: []
      }]
    });

    LoadFeed(){
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.apiService
                .getFeed(id)
                .then((res) => {
                    this.feed = res.data;
                    this.graphData = new Array<number>();
                    this.graphLabels = new Array<Date>();
                    this.feed.values.forEach((value) => {
                        this.graphData.push(parseInt(value.value));
                        this.graphLabels.push(new Date(value.date));
                    });
                    this.InitWS();
                    this.LoadGraph();
                });
            });
    }

    constructor(private apiService: ApiService, 
                private route: ActivatedRoute,
                private authService : AuthService) {
        this.feed = { _id: '', name: '', values: [{}]};
        this.authSrv = authService;
    }

    LoadGraph(){
        this.chart.removeSerie(0);
        this.chart.ref.addSeries({
            name: 'Values',
            data: this.graphData.reverse(),
            dataLabels: this.graphLabels.reverse(),
            color: '#808080',
            dashStyle: 'Solid',
            marker: {
                symbol: 'circle'
            }
        }, true);
        
    }

    InitWS(){
        if(!this.socket){
            let wsUrl = 'http://' + config.websocketUrl + ':' + config.websocketPort; 
            this.socket = io.connect(wsUrl);
            
            let channel = this.feed._id;
            this.socket.on(channel, (message) => {
                this.LoadFeed();
            });
        }
        
    }

    ngOnInit() {
        this.LoadFeed();
    }
}
