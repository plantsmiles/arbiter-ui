import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {Bid} from '../model/bid';
import {Ask} from '../model/ask';

@Injectable()
export class OrderBookService {

  constructor(private apiService: ApiService) { }

  public retrieveOrderBook(tradingPair: string): Observable<any> {
    return this.apiService.makeObservableCall(`/markets/orderbook?tradingPair=${tradingPair}`, { method: 'GET' });
  }

  public buildOrderBook(orderBook) {
    const bids = [];
    const asks = [];

    if (!orderBook) {
      return {
        bids: bids,
        asks: asks
      };
    }

    const bittrexBidPricePoints = orderBook.bittrex.bids.map((bid) => {
      return bid[0];
    });
    const bittrexBidVolumes = orderBook.bittrex.bids.map((bid) => {
      return bid[1];
    });
    const poloniexBidPricePoints = orderBook.poloniex.bids.map((bid) => {
      return bid[0];
    });
    const poloniexBidVolumes = orderBook.poloniex.bids.map((bid) => {
      return bid[1];
    });

    _.union(bittrexBidPricePoints, poloniexBidPricePoints).forEach((pricePoint) => {
      const bittrexVolume = bittrexBidPricePoints.indexOf(pricePoint) > -1 ?
        bittrexBidVolumes[bittrexBidPricePoints.indexOf(pricePoint)] : 0;

      const poloniexVolume = poloniexBidPricePoints.indexOf(pricePoint) > -1 ?
        poloniexBidVolumes[poloniexBidPricePoints.indexOf(pricePoint)] : 0;

      const bid = {
        bid: pricePoint,
        bittrexVolume: bittrexVolume,
        poloniexVolume: poloniexVolume,
        totalVolume: bittrexVolume + poloniexVolume,
        overlap: bittrexVolume > 0 && poloniexVolume > 0
      } as Bid;

      bids.push(bid);
    });


    const bittrexAskPricePoints = orderBook.bittrex.asks.map((ask) => {
      return ask[0];
    });
    const bittrexAskVolumes = orderBook.bittrex.asks.map((ask) => {
      return ask[1];
    });
    const poloniexAskPricePoints = orderBook.poloniex.asks.map((ask) => {
      return ask[0];
    });
    const poloniexAskVolumes = orderBook.poloniex.asks.map((ask) => {
      return ask[1];
    });

    _.union(bittrexAskPricePoints, poloniexAskPricePoints).forEach((pricePoint) => {
      const bittrexVolume = bittrexAskPricePoints.indexOf(pricePoint) > -1 ?
        bittrexAskVolumes[bittrexAskPricePoints.indexOf(pricePoint)] : 0;

      const poloniexVolume = poloniexAskPricePoints.indexOf(pricePoint) > -1 ?
        poloniexAskVolumes[poloniexAskPricePoints.indexOf(pricePoint)] : 0;

      const ask = {
        ask: pricePoint,
        bittrexVolume: bittrexVolume,
        poloniexVolume: poloniexVolume,
        totalVolume: bittrexVolume + poloniexVolume,
        overlap: bittrexVolume > 0 && poloniexVolume > 0
      } as Ask;

      asks.push(ask);
    });

    return {
      bids: bids,
      asks: asks
    };
  }
}
