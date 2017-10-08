import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class OrderBookService {
  constructor(private apiService: ApiService) { }

  public retrieveOrderBook(tradingPair: string): Promise<any> {
    return this.apiService.makeCall(`/markets/orderbook?tradingPair=${tradingPair}`, { method: 'GET' });
  }

}
