import {Component, OnInit} from '@angular/core';
import { OrderBookService } from './providers/order.book.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  orderBook;
  bids = [];
  asks = [];
  loadingIndicator = true;
  reorderable = true;

  bidColumns = [
    { name: 'Bid' },
    { name: 'Bittrex Volume' },
    { name: 'Poloniex Volume' },
    { name: 'Total Volume' },
    { name: 'Overlap'}
  ];

  askColumns = [
    { name: 'Ask' },
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
        this.combineBooks();
        this.loadingIndicator = false;
      });
  }

  public combineBooks() {
    this.bids = [];
    const bittrexBidPricePoints = this.orderBook.bittrex.bids.map((bid) => {
      return bid[0];
    });
    const bittrexBidVolumnes = this.orderBook.bittrex.bids.map((bid) => {
      return bid[1];
    });
    const poloniexBidPricePoints = this.orderBook.poloniex.bids.map((bid) => {
      return bid[0];
    });
    const poloniexBidVolumnes = this.orderBook.poloniex.bids.map((bid) => {
      return bid[1];
    });

    _.union(bittrexBidPricePoints, poloniexBidPricePoints).forEach((pricePoint) => {
      const bittrexVolume = bittrexBidPricePoints.indexOf(pricePoint) > -1 ?
        bittrexBidVolumnes[bittrexBidPricePoints.indexOf(pricePoint)] : 0;

      const poloniexVolume = poloniexBidPricePoints.indexOf(pricePoint) > -1 ?
        poloniexBidVolumnes[poloniexBidPricePoints.indexOf(pricePoint)] : 0;

      const bidRow = {
        bid: pricePoint,
        bittrexVolume: bittrexVolume,
        poloniexVolume: poloniexVolume,
        totalVolume: bittrexVolume + poloniexVolume,
        overlap: bittrexVolume > 0 && poloniexVolume > 0
      };

      this.bids.push(bidRow);
    });

    this.asks = [];
    const bittrexAskPricePoints = this.orderBook.bittrex.asks.map((ask) => {
      return ask[0];
    });
    const bittrexAskVolumnes = this.orderBook.bittrex.asks.map((ask) => {
      return ask[1];
    });
    const poloniexAskPricePoints = this.orderBook.poloniex.asks.map((ask) => {
      return ask[0];
    });
    const poloniexAskVolumnes = this.orderBook.poloniex.asks.map((ask) => {
      return ask[1];
    });

    _.union(bittrexAskPricePoints, poloniexAskPricePoints).forEach((pricePoint) => {
      const bittrexVolume = bittrexAskPricePoints.indexOf(pricePoint) > -1 ?
        bittrexAskVolumnes[bittrexAskPricePoints.indexOf(pricePoint)] : 0;

      const poloniexVolume = poloniexAskPricePoints.indexOf(pricePoint) > -1 ?
        poloniexAskVolumnes[poloniexAskPricePoints.indexOf(pricePoint)] : 0;

      const askRow = {
        ask: pricePoint,
        bittrexVolume: bittrexVolume,
        poloniexVolume: poloniexVolume,
        totalVolume: bittrexVolume + poloniexVolume,
        overlap: bittrexVolume > 0 && poloniexVolume > 0
      };

      this.asks.push(askRow);
    });
  }
}
