import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stats } from "../stats";
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';;


@Component({
  selector: 'app-cumulativestats',
  templateUrl: './cumulativestats.component.html',
  styleUrls: ['./cumulativestats.component.css']
})
export class CumulativestatsComponent {
  stats:Stats = new Stats;
  firstName:string;
  lastName:string;
  constructor(private http: HttpClient) { }
  private api: GridApi;
  private columnApi: ColumnApi;

  gridOptions = {
    defaultColDef: {
        resizable: true
    },
    columnDefs:[
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
      {headerName: 'isOnCourt', field: 'isOnCourt', sortable: true, filter: true, resizable: true},
      {headerName: 'min', field: 'min', sortable: true, filter: true, resizable: true},
      {headerName: 'offReb', field: 'offReb', sortable: true, filter: true, resizable: true},
      {headerName: 'pFouls', field: 'pFouls', sortable: true, filter: true, resizable: true},
      {headerName: 'personId', field: 'personId', sortable: true, filter: true, resizable: true},
      {headerName: 'plusMinus', field: 'plusMinus', sortable: true, filter: true, resizable: true},
      {headerName: 'points', field: 'points', sortable: true, filter: true, resizable: true},
      {headerName: 'pos', field: 'pos', sortable: true, filter: true, resizable: true},
      {headerName: 'steals', field: 'steals', sortable: true, filter: true, resizable: true},
      {headerName: 'teamId', field: 'teamId', sortable: true, filter: true, resizable: true},
      {headerName: 'totReb', field: 'totReb', sortable: true, filter: true, resizable: true},
      {headerName: 'tpa', field: 'tpa', sortable: true, filter: true, resizable: true},
      {headerName: 'tpm', field: 'tpm', sortable: true, filter: true, resizable: true},
      {headerName: 'tpp', field: 'tpp', sortable: true, filter: true, resizable: true},
      {headerName: 'turnovers', field: 'turnovers', sortable: true, filter: true, resizable: true}
  ],
    rowData: null,
    onGridReady: function(event) { console.log('the grid is now ready'); },
  };
  
  private onReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
}
rowData: any = [];

search() {
  this.http.get<Stats>('http://localhost:8080/player/timeline?end=2019-08-04&name='+this.firstName+'&start=2012-08-04&surname='+this.lastName+'').subscribe(data => {
  console.log("ENTER");
  this.gridOptions.rowData = data.stats;
  this.columnApi.autoSizeAllColumns();
  console.log(this.gridOptions.rowData);
  }, err => {
  console.log("SHIT");
});
}

}
