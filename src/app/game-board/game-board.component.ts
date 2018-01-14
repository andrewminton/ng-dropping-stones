import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Tetris } from '../game-logic/tetris/tetris.model';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { TetrominoType } from '../game-logic/tetromino/tetromino.model';
import * as clone from 'clone';
import { defaultState } from '../game-logic/tetris/settings';
import { TICK, INIT } from '../store/actions/actions';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  $game = new BehaviorSubject<Tetris>(null);
  display: TetrominoType[][] | null[][];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {

    this.store.dispatch({ type: INIT });

    this.store.pipe(
      map(state => state.game)
    ).subscribe(game => {
      this.$game.next(game);
      this.display = this.render(game);
    });

    interval(200).subscribe(() => {
      if (this.$game.getValue().status === 'PLAYING') {
        this.store.dispatch({ type: TICK });
      } else {
        this.store.dispatch({ type: INIT });
      }
    });

  }

  render(game: Tetris) {
    const display = clone(game.board);
    if (game.current === null) {
      return;
    }
    const { offset } = game.current;
    game.current.coordinates.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          // check if block reached the top
          if (display[y + game.current.offset.y] !== undefined) {
            display[y + offset.y][x + offset.x] = game.current.type;
          }
        }
      });
    });
    return display;
  }

}