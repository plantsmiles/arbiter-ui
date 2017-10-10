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
    { name: 'Bittrex Volume', width: '200' },
    { name: 'Poloniex Volume', width: '200' },
    { name: 'Total Volume', width: '200' },
    { name: 'Overlap'}
  ];

  askColumns = [
    { name: 'Asks' },
    { name: 'Bittrex Volume', width: '200' },
    { name: 'Poloniex Volume', width: '200' },
    { name: 'Total Volume', width: '200' },
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

    this.changeTradingPair(this.currentTradingPair);
  }

  public changeTradingPair(tradingPair) {
    this.loadingIndicator = true;
    this.socket.emit('unsubscribe', this.currentTradingPair);
    this.socket.removeAllListeners();

    this.orderBookService
      .retrieveOrderBook(tradingPair)
      .subscribe((data) => {
        this.orderBook = data;
        this.loadingIndicator = false;
      });

    this.socket.emit('subscribe', tradingPair);
    this.socket.on(tradingPair, (data: any) => {
      this.orderBook = data;
      this.loadingIndicator = false;
    });

    this.currentTradingPair = tradingPair;
  }

  @HostListener('window:beforeunload', ['$event'])
  close($event) {
    this.socket.disconnect();
  }
}
