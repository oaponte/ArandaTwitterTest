import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders  } from '@angular/common/http';

export interface TwitterResponse {
  data: any;
  resp: any;
}

@Injectable()
export class TweetsServiceService {

  constructor(private http: HttpClient) { }

  // consulto los tweets
  getTweets(searchByWord) {
    // return this.http.get('http://localhost:3000/api/test');
    return this.http.get<TwitterResponse>('http://localhost:3000/api/home/' + searchByWord);
  }

}
