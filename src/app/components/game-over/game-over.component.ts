import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HighscoreService } from '../../services/highscore/highscore.service';
import { Score } from '../../models/highscore/highscore.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import {filter, first, map, takeUntil, tap, throttleTime} from 'rxjs/operators';
import { Tetris } from '../../models/tetris/tetris.model';
import { GamepadService } from '../../services/gamepad/gamepad.service';
import { GamepadActions } from '../../models/gamepad/gamepad.model';
import { Router } from '@angular/router';
import {componentDestroyed} from 'ng2-rx-componentdestroyed';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit, AfterViewInit, OnDestroy {

  playerScore: number;
  highscores: Score[];
  todaysHighscores: Score[];
  // navigationSubscription: Subscription;
  private forceReload: boolean;

  constructor(private scoreService: HighscoreService,
              private gamepad: GamepadService,
              private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit() {

    this.store.select((state: AppState) => state.settings.forceReload).subscribe(forceReload => {
      this.forceReload = forceReload;
    });

    this.gamepad.getActions(1).pipe(
      takeUntil(componentDestroyed(this)),
      throttleTime(300),
      filter(action => action === GamepadActions.BACK || action === GamepadActions.OK)
    ).subscribe(action => {
      this.backToMainScreen();
    });

    this.highscores = this.scoreService.getScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    this.todaysHighscores = this.scoreService.getTodaysScores()
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    this.store.pipe(
      select('game'),
      first(),
      map((game: Tetris[]) => game[0] ? game[0].score : 0)
    ).subscribe(score => this.playerScore = score);

    Observable.of(1).delay(10 * 1000)
      .first()
      .subscribe(
        () => this.backToMainScreen()
      );
  }

  ngAfterViewInit(): void {
    document.querySelector('a').focus();
  }

  ngOnDestroy(): void {
  }

  backToMainScreen() {
    if (this.forceReload) {
      window.location.href = '/';
    } else {
      this.router.navigate(['/']);
    }
  }

}
