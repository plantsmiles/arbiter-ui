import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NvD3Module } from 'ng2-nvd3'

import { AppComponent } from './app.component';

import { ApiService } from './providers/api.service';
import { OrderBookService } from './providers/order.book.service';

import 'd3';
import 'nvd3';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NvD3Module
  ],
  providers: [ApiService, OrderBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
