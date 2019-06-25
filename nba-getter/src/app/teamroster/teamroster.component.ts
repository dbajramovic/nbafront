import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamRoster } from '../teamroster';
import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { mergeMap } from 'rxjs/operators';
import { Team } from '../team';

@Component({
  selector: 'app-teamroster',
  templateUrl: './teamroster.component.html',
  styleUrls: ['./teamroster.component.css']
})
export class TeamrosterComponent implements OnInit {
  [x: string]: any;
  teams:Team[] = [];

  year:string;
  nickname:string = "";
  roster:TeamRoster;
  dataSource: Observable<any>;
  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  teamPic:string = "https://theundefeated.com/wp-content/uploads/2017/06/nba-logo-game-lede.jpg?w=1500";

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
      this.teams.filter((state: Team) => {
        return query.test(state.city.concat(" ").concat(state.nickname));
      })
    );
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
 
  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log(this.nickname);
    console.log(this.teams);
    console.log(e.value);
    this.nickname = this.teams.find(x => x.nickname === e.value).nickname;
  }


  gridOptions = {
    defaultColDef: {
        resizable: true
    },
    columnDefs:[
      {headerName: 'firstName', field: 'firstName', sortable: true, filter: true, resizable: true},
      {headerName: 'lastName', field: 'lastName', sortable: true, filter: true, resizable: true},
      {headerName: 'jersey', field: 'jersey', sortable: true, filter: true, resizable: true},
      {headerName: 'isActive', field: 'isActive', sortable: true, filter: true, resizable: true},
      {headerName: 'pos', field: 'pos', sortable: true, filter: true, resizable: true},
      {headerName: 'heightFeet', field: 'heightFeet', sortable: true, filter: true, resizable: true},
      {headerName: 'heightInches', field: 'heightInches', sortable: true, filter: true, resizable: true},
      {headerName: 'heightMeters', field: 'heightMeters', sortable: true, filter: true, resizable: true},
      {headerName: 'weightPounds', field: 'weightPounds', sortable: true, filter: true, resizable: true},
      {headerName: 'weightKilograms', field: 'weightKilograms', sortable: true, filter: true, resizable: true},
      {headerName: 'dateOfBirthUTC', field: 'dateOfBirthUTC', sortable: true, filter: true, resizable: true},
      {headerName: 'nbaDebutYear', field: 'nbaDebutYear', sortable: true, filter: true, resizable: true},
      {headerName: 'yearsPro', field: 'yearsPro', sortable: true, filter: true, resizable: true},
      {headerName: 'collegeName', field: 'collegeName', sortable: true, filter: true, resizable: true},
      {headerName: 'lastAffliation', field: 'lastAffliation', sortable: true, filter: true, resizable: true},
      {headerName: 'country', field: 'country', sortable: true, filter: true, resizable: true},
      {headerName: 'year', field: 'year', sortable: true, filter: true, resizable: true},
      {headerName: 'salary', field: 'salary', sortable: true, filter: true, resizable: true}
  ],
    rowData: null,
    onGridReady: function(event) { console.log('the grid is now ready'); },
  };

  ngOnInit() {
    this.http.get<Team[]>('http://localhost:8080/teams').subscribe(data => {
      this.teams = data;
      }, err => {
      console.log("SHIT");
    });
  }

  search() {
    this.http.get<TeamRoster>('http://localhost:8080/team/roster?year='+this.year+'&team='+this.nickname+'').subscribe(data => {
    console.log(data);
    this.roster = data;
    this.gridOptions.rowData = this.roster.players;
    this.teamPic = this.roster.logo;
    }, err => {
    console.log("SHIT");
  });
  }

}
