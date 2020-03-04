import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TimelineComponent} from './timeline/timeline.component';
import {CumulativestatsComponent} from './cumulativestats/cumulativestats.component';
import { GamepriceComponent } from './gameprice/gameprice.component';
import { TeamrosterComponent } from './teamroster/teamroster.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
 
import { ToastrModule } from 'ngx-toastr';
import { GamescoreLineChartComponent } from './gamescore-line-chart/gamescore-line-chart.component';

const routes: Routes = [
  { path: 'timeline', component: TimelineComponent },
  
  { path: 'stats', component: CumulativestatsComponent },
  
  { path: 'gameprice', component: GamepriceComponent },
  
  { path: 'rosters', component: TeamrosterComponent },
  { path: 'gamescore', component: GamescoreLineChartComponent }
];
@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes),
    CommonModule,
    BrowserAnimationsModule, 
    NgxSpinnerModule,
    ToastrModule.forRoot() ]
})
export class AppRoutingModule { }
