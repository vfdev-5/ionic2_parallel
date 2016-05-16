// Angular
import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class RssFeeder {
  static get parameters(){
    return [[Http]];
  }

  constructor(http) {
    // inject the Http provider and set to this instance
    this.http = http;
    this.url = '/ajax/services/feed/load';
    this.feed = 'http://www.lefigaro.fr/rss/figaro_hightech.xml';
  }

  load() {
    console.log("Load rss feeds");
    return this.http.get(this.url, {
        search: 'v=1.0&q='+this.feed
      })
      .map((res) => {
        let data = res.json().responseData;
        if (data == null) {
          console.error("Response data is null");
          return null;
        }
        return data.feed.entries;
      });
  }
}
