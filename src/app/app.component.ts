import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Tweet } from './tweet';
import { TweetsServiceService } from '../app/services/tweets-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TweetsServiceService]
})
export class AppComponent {
  title = 'app';
  tweets: Tweet[] = [];
  ids = [];

  constructor(private service: TweetsServiceService) {}

  // al presionar enter
  onKeydown(event, searchByWord) {
    this.getTweets(searchByWord);
  }

  // suscribo servicio
  public getTweets(searchByWord) {
    if (searchByWord.includes('#') === true || searchByWord.includes('@') === true) {
      console.log('caracter no permitido: @ y #');
    } else {
      this.tweets = [];
      this.service.getTweets(searchByWord).subscribe(tweet => {
        tweet['statuses'].forEach(element => {
          this.tweets.push(element);
        });
      });
    }
  }
}
