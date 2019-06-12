import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Stats } from '../stats';
import { HttpClient } from '@angular/common/http';
import { Cumulativestat } from '../cumulativestat';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  
  dropdown: NgMultiSelectDropDownModule = new NgMultiSelectDropDownModule;
  canvas: any;
  ctx: any;
  stats:Cumulativestat[];
  points:number[] = [];
  cumulativeStat:Cumulativestat = new Cumulativestat;
  firstName:string;
  lastName:string;
  steals: number[] = [];
  rebounds: number[] = [];
  dates: string[] = [];
  constructor(private http: HttpClient) { }

  dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    ngOnInit(){
        this.dropdownList = [
                              {"id":1,"itemName":"India"},
                              {"id":2,"itemName":"Singapore"},
                              {"id":3,"itemName":"Australia"},
                              {"id":4,"itemName":"Canada"},
                              {"id":5,"itemName":"South Korea"},
                              {"id":6,"itemName":"Germany"},
                              {"id":7,"itemName":"France"},
                              {"id":8,"itemName":"Russia"},
                              {"id":9,"itemName":"Italy"},
                              {"id":10,"itemName":"Sweden"}
                            ];
        this.selectedItems = [
                                {"id":2,"itemName":"Singapore"},
                                {"id":3,"itemName":"Australia"},
                                {"id":4,"itemName":"Canada"},
                                {"id":5,"itemName":"South Korea"}
                            ];
        this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Select Countries",
                                  selectAllText:'Select All',
                                  unSelectAllText:'UnSelect All',
                                  enableSearchFilter: true,
                                  classes:"myclass custom-class"
                                };            
    }
    onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }
  search() {
    this.http.get<Stats>('http://localhost:8080/player/timeline?end=2019-08-04&name='+this.firstName+'&start=2012-08-04&surname='+this.lastName+'').subscribe(data => {
      this.stats = data.stats;
      this.cumulativeStat = data.cumulativeStats;
      this.stats.forEach(stat => {
        this.points.push(stat.points);
        this.steals.push(stat.steals);
        this.rebounds.push(stat.totReb);
        this.dates.push(stat.matchDescription);
      });
      console.log(this.stats);
      console.log(this.points);
      this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        let myChart = new Chart(this.ctx, {
          type: 'line',
          data: {
              labels: this.dates,
              datasets: [{
                  label: 'Points',
                  data: this.points,
                  backgroundColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)'
                  ],
                  borderWidth: 2, 
                  fill: false
              }, 
              {
                label: 'Steals',
                data: this.steals,
                backgroundColor: [
                    'rgba(0, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 2,
                fill: false
            }, {
              label: 'Points',
              data: this.points,
              backgroundColor: [
                  'rgba(255, 99, 0, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 2, 
              fill: false
          }],
          },
          options: {
            responsive: false
          }
        });
      }, err => {
      console.log("SHIT");
    });
  }
}
