import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { AppComponent } from './app.component';

import { ApiService } from './service/api.service';
import { OrderBookService } from './service/order.book.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    NgxDatatableModule
  ],
  providers: [ApiService, OrderBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
