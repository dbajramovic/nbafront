import { Component } from '@angular/core';
import { Game } from '../game';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { mergeMap } from 'rxjs/operators';
import { GamePriceStructure } from '../GamePriceStructure';
import { PlayerSalaryPair } from '../PlayerSalaryPair';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-gameprice',
  templateUrl: './gameprice.component.html',
  styleUrls: ['./gameprice.component.css']
})

export class GamepriceComponent {
  [x: string]: any;

  games:Game[] = [];

  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  years:string[] = [
    "2020","2019", "2018", "2017", "2016"
  ]
  selectedYear:string;
  yearIsSelected: boolean = false;
  priceIsSelected: boolean = false;
  dataSource: Observable<any>;
  statesComplex: any[] = [];
  gameId:string = "";
  homeSturcture: PlayerSalaryPair = new PlayerSalaryPair();
  awayStructure: PlayerSalaryPair = new PlayerSalaryPair();
 
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) {
    this.dataSource = Observable.create((observer: any) => {
      observer.next(this.asyncSelected);
    })
      .pipe(
        mergeMap((token: string) => this.getStatesAsObservable(token))
      );
  }
 
  getStatesAsObservable(token: string): Observable<any> {
    const query = new RegExp(token, 'i');
    return of(
      this.games.filter((state: Game) => {
        return query.test(state.matchDescription);
      })
    );
  }

  onChange(newValue) {
    this.selectedYear = newValue;
    this.search();
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
 
  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
 
  typeaheadOnSelect(e: TypeaheadMatch): void {
    if(this.gameId != null) {
    this.gameId = this.games.find(x => x.matchDescription === e.value).gameId;
    this.spinner.show();
    this.http.get<GamePriceStructure>('http://localhost:8080/getPriceOfGame?gameId='+this.gameId).subscribe(data => {
      this.gridOptionsHome.rowData = data.homeTeamPrice;
      this.gridOptionsAway.rowData = data.visitorTeamPrice;
      this.homeSturcture = data.teamPriceMap[0];
      this.awayStructure = data.teamPriceMap[1];
      this.priceIsSelected = true;
      this.spinner.hide();
          }, err => {
        this.toastr.error("SHIT");
    });
    }
  }

  gridOptionsHome = {
    defaultColDef: {
        resizable: true
    },
    columnDefs:[
      {headerName: 'Player Name', field: 'name', sortable: true, filter: true, resizable: true},
      {headerName: 'Salary ($)', field: 'formattedValue', sortable: true, filter: true, resizable: true},
  ],
    rowData: null,
    onGridReady: function(event) { console.log('the grid is now ready'); },
  };

  gridOptionsAway = {
    defaultColDef: {
        resizable: true
    },
    columnDefs:[
      {headerName: 'Player Name', field: 'name', sortable: true, filter: true, resizable: true},
      {headerName: 'Salary ($)', field: 'formattedValue', sortable: true, filter: true, resizable: true},
  ],
    rowData: null,
    onGridReady: function(event) { console.log('the grid is now ready'); },
  };
  
   onReady(params) {
}
rowData: any = [];


}
