import {Component, OnInit} from '@angular/core';
import { OrderBookService } from './service/order.book.service';

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
    private orderBookService: OrderBookService,
  ) { }

  public ngOnInit() {
    this.orderBookService
      .retrieveTradingPairs()
      .subscribe((data) => {
        this.tradingPairs = data;
      });

    this.orderBookService
      .retrieveOrderBook('BTC-ETH')
      .subscribe((data) => {
        this.orderBook = data;
        this.loadingIndicator = false;
      });
  }
}
