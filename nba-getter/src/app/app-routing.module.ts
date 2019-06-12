import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TimelineComponent} from './timeline/timeline.component';
import {CumulativestatsComponent} from './cumulativestats/cumulativestats.component';
import { GamepriceComponent } from './gameprice/gameprice.component';

const routes: Routes = [
  { path: 'timeline', component: TimelineComponent },
  
  { path: 'stats', component: CumulativestatsComponent },
  
  { path: 'gameprice', component: GamepriceComponent }
];
@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
