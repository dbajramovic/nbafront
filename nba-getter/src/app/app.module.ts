import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { CumulativestatsComponent } from './cumulativestats/cumulativestats.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    CumulativestatsComponent
  ],
  imports: [
    BrowserModule,
  HttpClientModule,
  FormsModule,
  AgGridModule.withComponents()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
