import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { CumulativestatsComponent } from './cumulativestats/cumulativestats.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AppRoutingModule } from './app-routing.module';
import { GamepriceComponent } from './gameprice/gameprice.component';
import { TeamrosterComponent } from './teamroster/teamroster.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GamescoreLineChartComponent } from './gamescore-line-chart/gamescore-line-chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    CumulativestatsComponent,
    TimelineComponent,
    GamepriceComponent,
    TeamrosterComponent,
    GamescoreLineChartComponent
  ],
  imports: [
    BrowserModule,
  HttpClientModule,
  NgbModule,
  FormsModule,
  AgGridModule.withComponents(),
  AppRoutingModule,
  BrowserAnimationsModule,
  TypeaheadModule.forRoot(),
  NgxSpinnerModule,
  ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
