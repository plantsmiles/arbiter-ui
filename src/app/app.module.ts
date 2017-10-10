import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { AppComponent } from './app.component';

import { ApiService } from './service/api.service';
import { OrderBookService } from './service/order.book.service';
import { environment } from '../environments/environment';

const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [ApiService, OrderBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
