import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';

import { ApiService } from './providers/api.service';
import { OrderBookService } from './providers/order.book.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxDatatableModule
  ],
  providers: [ApiService, OrderBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
