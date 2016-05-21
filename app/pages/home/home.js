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
    this.left_col = [];
    this.right_col = [];

    this.selection = [];

    this.enabled = true;

  }

  onCardClicked(card_model, index) {
    console.log('Card is clicked : ', card_model, index);

    if (card_model.is_selected !== undefined) {
      card_model.is_selected = !card_model.is_selected;
      // switch off the previous card
      if (this.selection.length > 0) {
        let prev_card = this.selection.pop();
        prev_card[0].is_selected = false;
      }
      if (card_model.is_selected) {
        this.selection.push([card_model, index]);
      }
    }
  }

  onDrop(index) {
    console.log('Drop here: index=', index);

    if (this.selection.length == 0) {
      console.console.error("Selection is empty");
      return;
    }

    let selected_card = this.selection.pop();
    this.right_col.splice(selected_card[1], 1);
    this.left_col.splice(index, 0, selected_card[0]);
  }

  onPageLoaded() {

    this.static_cards.load()
      .subscribe(
        (cards) => {
          // Create a presenter from data:
          this.left_col = [cards[0], cards[1]];
        }
      );

    this.static_cards.load()
      .subscribe(
        (cards) => {
          // Create a presenter from data:
          this.right_col = cards;
          this.right_col.forEach(
            (item) => {
              item['is_selected'] = false;
            }
          );
        }
      );
  }

}
