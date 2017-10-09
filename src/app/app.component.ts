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

  loadingIndicator = true;

  bidColumns = [
    { name: 'Bid' },
    { name: 'Bittrex Volume' },
    { name: 'Poloniex Volume' },
    { name: 'Total Volume' },
    { name: 'Overlap'}
  ];

  askColumns = [
    { name: 'Bid' },
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
      .retrieveOrderBook('BTC-ETH')
      .subscribe((data) => {
        this.orderBook = data;
        this.orderBook = this.orderBookService.buildOrderBook(data);
        this.loadingIndicator = false;
      });
  }
}
