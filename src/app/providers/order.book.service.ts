import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OrderBookService {
  constructor(private apiService: ApiService) { }

  public retrieveOrderBook(tradingPair: string): Observable<any> {
    return this.apiService.makeObservableCall(`/markets/orderbook?tradingPair=${tradingPair}`, { method: 'GET' });
  }

}
