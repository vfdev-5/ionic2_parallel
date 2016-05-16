// Angular
import {Page} from 'ionic-angular';

// Project
import {RssFeeder} from '../../providers/rss_feeder';
import {StaticCards} from '../../providers/static_cards';
// import {HighlightDirective} from './highlight.directive'

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [RssFeeder, StaticCards],
  // directives: [HighlightDirective]
})
export class HomePage {

  static get parameters() {
    return [[RssFeeder], [StaticCards]]
  }

  constructor(rss_feeder, static_cards) {
    this.rss_feeder = rss_feeder;
    this.static_cards = static_cards;
    this.left_news = [];
    this.right_news = [];

    this.selection = [];

    this.enabled = true;

  }

  onCardClicked(card_model) {
    console.log('Card is clicked : ' + card_model);
    // for (let p in card_model) {
    //   console.log("p=" + p + ", card_model[p]="+ card_model[p]);
    // }

    if (card_model.is_selected !== undefined) {
      card_model.is_selected = !card_model.is_selected;

      // switch off the previous card
      if (this.selection.length > 0) {
        let prev_card = this.selection.pop();
        prev_card.is_selected = false;
      }
      if (card_model.is_selected) {
        this.selection.push(card_model);
      }
    }
  }

  onPageLoaded() {
    this.rss_feeder.load()
      .subscribe(
        (feed) => {
          this.left_news = feed;
        }
      );

    this.static_cards.load()
      .subscribe(
        (cards) => {
          // Create a presenter from data:
          this.right_news = cards;
          this.right_news.forEach(
            (item) => {
              item['is_selected'] = false;
            }
          );
        }
      );
  }

}
