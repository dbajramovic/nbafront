import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Game } from '../game';
import { GameScore } from '../GameScore';

@Component({
  selector: 'gamescore-line-chart',
  templateUrl: './gamescore-line-chart.component.html',
  styleUrls: ['./gamescore-line-chart.component.scss']
})
export class GamescoreLineChartComponent implements OnInit {
  [x: string]: any;
  gameScore:GameScore = {homePoints: 0, visitorPoints:0, periodPointsHome:[], periodPointsAway:[],coordinates:[] };
  games:Game[] = [];
  dataHome:number[] = [];
  dataAway:number[] = [];
  public steps:Label[] = [];
  public years:string[] = [
    "2020","2019", "2018", "2017", "2016" 
  ]
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Home' },
    {data: [], label: 'Visitors'}
  ];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // blue
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'blue',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  selectedYear:string;
  yearIsSelected: boolean = false;
  priceIsSelected: boolean = false;
  dataSource: Observable<any>;
  statesComplex: any[] = [];
  gameId:string = "";
  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean; 
  gameSelected: boolean = false;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) {    this.dataSource = Observable.create((observer: any) => {
    observer.next(this.asyncSelected);
  })
    .pipe(
      mergeMap((token: string) => this.getStatesAsObservable(token))
    ); }

  ngOnInit() {
  }

  onChange(newValue) {
    this.selectedYear = newValue;
    this.search();
  }


  getStatesAsObservable(token: string): Observable<any> {
    const query = new RegExp(token, 'i');
    return of(
      this.games.filter((state: Game) => {
        return query.test(state.matchDescription);
      })
    );
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  search() {
    this.spinner.show();
    this.http.get<Game[]>('http://localhost:8080/games/light?year='+this.selectedYear).subscribe(data => {
      this.games = data;
      this.yearIsSelected = true;
      this.spinner.hide();
      }, err => {
        this.toastr.error("SHIT");
    });
  }


  typeaheadOnSelect(e: TypeaheadMatch): void {
    var that = this;
    if(this.gameId != null) {
    this.gameId = this.games.find(x => x.matchDescription === e.value).id;
    this.spinner.show();
    this.http.get<GameScore>('http://localhost:8080/gamescore?gameId='+this.gameId).subscribe(data => {
      this.gameScore = data;
      this.chart.update();
      if(!that.dataLoaded){
        that.dataHome = [];
        that.dataAway = [];
        that.steps = [];
        that.gameScore.coordinates.forEach(function (value) {
          that.dataHome.push(value.homeScore);
          that.dataAway.push(value.visitorScore);
          that.steps.push(value.step+ '');
        })
        that.lineChartData = [{data: that.dataHome, label : 'Home'}, {data: that.dataAway, label : 'Away'}];
        that.gameSelected = true;
      }
      this.spinner.hide();
          }, err => {
        this.toastr.error("SHIT");
    });
    }
  }


  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
}