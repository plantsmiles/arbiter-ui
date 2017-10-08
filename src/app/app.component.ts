import {Component, OnInit} from '@angular/core';
import { OrderBookService } from './providers/order.book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public orderBook;
  public chartOptions;
  public chartData;

  constructor(
    private orderBookService: OrderBookService,
  ) { }

  public ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'stackedAreaChart',
        title: 'Asks',
        height: 450,
        // color: '#ffffff',
        // margin : {
        //   top: 20,
        //   right: 20,
        //   bottom: 30,
        //   left: 40
        // },
        x: function(d) {
          return d[0];
        },
        y: function(d) {
          return d[1];
        },
        useVoronoi: false,
        clipEdge: true,
        duration: 100,
        useInteractiveGuideline: true,
        xAxis: {
          showMaxMin: false,
          tickFormat: function(d) {
            return d3.format(',.8f')(d);
          },
          axisLabel: 'Price'
        },
        yAxis: {
          tickFormat: function(d){
            return d3.format('1f')(d);
          },
          axisLabel: 'Volume'
        },
        zoom: {
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
        }
      }
    };

    this.orderBookService
      .retrieveOrderBook('BTC-ETH')
      .subscribe((data) => {
        this.orderBook = data;
        this.chartData = [
          {
            key: 'Poloniex',
            values: this.orderBook.poloniex.asks
          }, {
            key: 'Bittrex',
            values: this.orderBook.bittrex.asks
          }];
      });
  }
}
