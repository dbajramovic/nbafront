import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stats } from "../stats";
import {  GridApi, ColumnApi } from 'ag-grid-community';
import { Cumulativestat } from '../cumulativestatadjusted';
import { PlayerLight } from '../PlayerLight';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-cumulativestats',
  templateUrl: './cumulativestats.component.html',
  styleUrls: ['./cumulativestats.component.css']
})
export class CumulativestatsComponent {
  players:PlayerLight[] = [];
  stats:Stats = new Stats;
  cumulativeStat:Cumulativestat = new Cumulativestat;
  firstName:string;
  lastName:string;
  private api: GridApi;
  private columnApi: ColumnApi;
  userPic: string;
  dataSource: Observable<any>;
  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  fullName:string = "";
  foundPlayer : PlayerLight;

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
      this.players.filter((state: PlayerLight) => {
        return query.test(state.fullName.concat(" ").concat(state.fullName));
      })
    );
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
 
  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.foundPlayer = this.players.find(x => x.fullName === e.value);
    this.spinner.show();
    this.http.get<Stats>('http://localhost:8080/player/timeline?end=2019-08-04&name='+this.foundPlayer.firstName+'&start=2012-08-04&surname='+this.foundPlayer.lastName+'').subscribe(data => {
      console.log(data);
      this.gridOptions.rowData = data.stats;
      this.cumulativeStat = data.cumulativeStats;
      this.columnApi.autoSizeAllColumns();
    this.userPic = 'https://nba-players.herokuapp.com/players/'+this.foundPlayer.lastName+'/'+this.foundPlayer.firstName;
    this.toastr.success("Player stats loaded");
    this.spinner.hide();
      }, err => {
      this.toastr.error("SHIT");
    });
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }


  gridOptions = {
    defaultColDef: {
        resizable: true
    },
    columnDefs:[
      {headerName: 'Match', field: 'matchDescription', sortable: true, filter: true, resizable: true},
      {headerName: 'Assists', field: 'assists', sortable: true, filter: true, resizable: true},
      {headerName: 'blocks', field: 'blocks', sortable: true, filter: true, resizable: true},
      {headerName: 'defReb', field: 'defReb', sortable: true, filter: true, resizable: true},
      {headerName: 'dnp', field: 'dnp', sortable: true, filter: true, resizable: true},
      {headerName: 'blocks', field: 'blocks', sortable: true, filter: true, resizable: true},
      {headerName: 'defReb', field: 'defReb', sortable: true, filter: true, resizable: true},
      {headerName: 'fga', field: 'fga', sortable: true, filter: true, resizable: true},
      {headerName: 'fgm', field: 'fgm', sortable: true, filter: true, resizable: true},
      {headerName: 'fgp', field: 'fgp', sortable: true, filter: true, resizable: true},
      {headerName: 'fta', field: 'fta', sortable: true, filter: true, resizable: true},
      {headerName: 'ftm', field: 'ftm', sortable: true, filter: true, resizable: true},
      {headerName: 'ftp', field: 'ftp', sortable: true, filter: true, resizable: true},
      {headerName: 'min', field: 'min', sortable: true, filter: true, resizable: true},
      {headerName: 'offReb', field: 'offReb', sortable: true, filter: true, resizable: true},
      {headerName: 'pFouls', field: 'pFouls', sortable: true, filter: true, resizable: true},
      {headerName: 'plusMinus', field: 'plusMinus', sortable: true, filter: true, resizable: true},
      {headerName: 'points', field: 'points', sortable: true, filter: true, resizable: true},
      {headerName: 'pos', field: 'pos', sortable: true, filter: true, resizable: true},
      {headerName: 'steals', field: 'steals', sortable: true, filter: true, resizable: true},
      {headerName: 'totReb', field: 'totReb', sortable: true, filter: true, resizable: true},
      {headerName: 'tpa', field: 'tpa', sortable: true, filter: true, resizable: true},
      {headerName: 'tpm', field: 'tpm', sortable: true, filter: true, resizable: true},
      {headerName: 'tpp', field: 'tpp', sortable: true, filter: true, resizable: true},
      {headerName: 'turnovers', field: 'turnovers', sortable: true, filter: true, resizable: true}
  ],
    rowData: null,
    onGridReady: function(event) { console.log('the grid is now ready'); },
  };
  
   onReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
}
rowData: any = [];

ngOnInit() {
  this.http.get<PlayerLight[]>('http://localhost:8080/player/light').subscribe(data => {
    this.players = data;
    }, err => {
      this.toastr.error("SHIT");
  });
}

}
