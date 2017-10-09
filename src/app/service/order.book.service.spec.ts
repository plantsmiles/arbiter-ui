import { TestBed, inject } from '@angular/core/testing';
import { OrderBookService } from './order.book.service';
import { HttpModule, ConnectionBackend } from '@angular/http';
import { ApiService } from './api.service';

describe('OrderBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [OrderBookService, ApiService, ConnectionBackend]
    });
  });

  it('should be created', inject([OrderBookService], (service: OrderBookService) => {
    expect(service).toBeTruthy();
  }));
});
