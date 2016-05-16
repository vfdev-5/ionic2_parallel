// Angular
import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class StaticCards {
  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;
    this.url = 'data/static_cards.json';
  }

  load() {
    console.log("Load cards");
    return this.http.get(this.url).map(
      (res) => {
        return res.json().cards;
      }
    );
  }


}
