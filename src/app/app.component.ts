import {Component, OnInit} from '@angular/core';
import { OrderBookService } from './providers/order.book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public orderBook;

  constructor(
    private orderBookService: OrderBookService,
  ) { }

  public ngOnInit() {
    this.orderBookService
      .retrieveOrderBook('BTC-ETH')
      .subscribe((data) => {
        this.orderBook = data;
      });
  }
}
