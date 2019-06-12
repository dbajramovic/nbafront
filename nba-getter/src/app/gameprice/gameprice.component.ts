import { Component } from '@angular/core';
import { Game } from '../game';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { mergeMap } from 'rxjs/operators';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import { GamePriceStructure } from '../GamePriceStructure';
import { PlayerSalaryPair } from '../PlayerSalaryPair';

@Component({
  selector: 'app-gameprice',
  templateUrl: './gameprice.component.html',
  styleUrls: ['./gameprice.component.css']
})

export class GamepriceComponent {

  games:Game[] = [];

  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  year:string;
  yearIsSelected: boolean = false;
  priceIsSelected: boolean = false;
  dataSource: Observable<any>;
  statesComplex: any[] = [];
  gameId:string = "";
  homeSturcture: PlayerSalaryPair;
  awayStructure: PlayerSalaryPair;
  private api: GridApi;
  private columnApi: ColumnApi;
  private userPic: string;
 
  constructor(private http: HttpClient) {
    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
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
  search() {
    this.http.get<Game[]>('http://localhost:8080/games/light?year='+this.year).subscribe(data => {
      this.games = data;
      this.yearIsSelected = true;
      }, err => {
      console.log("SHIT");
    });
  }
  searchGamePrice() {
    this.http.get<GamePriceStructure>('http://localhost:8080/getPriceOfGame?gameId='+this.gameId).subscribe(data => {
      console.log(data);
      this.gridOptionsHome.rowData = data.homeTeamPrice;
      this.gridOptionsAway.rowData = data.visitorTeamPrice;
      this.homeSturcture = data.teamPriceMap[0];
      this.awayStructure = data.teamPriceMap[1];
      this.priceIsSelected = true;
      }, err => {
      console.log("SHIT");
    });
  }
 
  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
 
  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.gameId = this.games.find(x => x.matchDescription === e.value).gameId;
  }

  gridOptionsHome = {
    defaultColDef: {
        resizable: true
    },
    columnDefs:[
      {headerName: 'Player Name', field: 'name', sortable: true, filter: true, resizable: true},
      {headerName: 'Salary', field: 'value', sortable: true, filter: true, resizable: true},
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
      {headerName: 'Salary', field: 'value', sortable: true, filter: true, resizable: true},
  ],
    rowData: null,
    onGridReady: function(event) { console.log('the grid is now ready'); },
  };
  
  private onReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
}
rowData: any = [];
}
