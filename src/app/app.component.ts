import {Component, HostListener, OnInit} from '@angular/core';
import { OrderBookService } from './service/order.book.service';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  orderBook = {
    bids: [],
    asks: []
  };

  tradingPairs = [];
  currentTradingPair = 'BTC-ETH';
  loadingIndicator = true;

  bidColumns = [
    { name: 'Bids' },
    { name: 'Bittrex Volume' },
    { name: 'Poloniex Volume' },
    { name: 'Total Volume' },
    { name: 'Overlap'}
  ];

  askColumns = [
    { name: 'Asks' },
    { name: 'Bittrex Volume' },
    { name: 'Poloniex Volume' },
    { name: 'Total Volume' },
    { name: 'Overlap'}
  ];

  constructor(
    private orderBookService: OrderBookService, private socket: Socket
  ) { }

  public ngOnInit() {
    this.orderBookService
      .retrieveTradingPairs()
      .subscribe((data) => {
        this.tradingPairs = data;
      });

    this.orderBookService
      .retrieveOrderBook(this.currentTradingPair)
      .subscribe((data) => {
        this.orderBook = data;
        this.loadingIndicator = false;
      });

    this.socket.on(this.currentTradingPair, (data: any) => {
        console.log(`Received ${this.currentTradingPair} update via socket io`);
        this.orderBook = data;
      });
  }

  @HostListener('window:beforeunload', ['$event'])
  close($event) {
    this.socket.disconnect();
  }
}
