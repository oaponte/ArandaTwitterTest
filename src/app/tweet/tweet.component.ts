import { Component, EventEmitter, Output, Input, ViewChild, ElementRef, HostListener} from '@angular/core';
import { Tweet } from '../tweet';
import { AppComponent } from '../app.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})

export class TweetComponent {
  @Input() tweet: Tweet;
  @Input() retweet: Tweet;
  @Output() action = new EventEmitter<{property: string, tweet: Tweet}>();
  @Input('searchByWord') searchByWord;

  constructor(private appC: AppComponent ) { }

  // infinite scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = 100;
    if ($(window).scrollTop() + $(window).height() > $(document).height() - offset) {
      this.appC.getTweets(this.searchByWord.value);
    }
  }

  showMore(idTweet) {
    const divShowMore = $('#showMore' + idTweet);
    if( divShowMore.is(':visible') === true) {
      divShowMore.hide('fold');
    }
    else {
      divShowMore.show('fold');
    }
  }

  hasPhoto(tweet: Tweet) {
    if (tweet.entities.media
        && tweet.entities.media.length
        && tweet.entities.media[0].type === 'photo') {
      return true;
    }
    return false;
  }

  toggleAction(property: 'favorite'|'retweet') {
    this.action.emit({property, tweet: this.tweet});
  }
}
