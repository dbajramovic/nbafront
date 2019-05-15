import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players:Player[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
	    this.players = [];
	   this.http.get<Player[]>('http://localhost:8080/player').subscribe(data => {
      console.log(data);
	  this.players = data;
	  console.log(this.players);
    }, err => {
		console.log("SHIT");
	});
  }

}
