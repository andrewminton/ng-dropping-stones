import {Component, OnInit, OnDestroy} from '@angular/core';
import {GameService} from "../../service/game.service";
import {Subscription, Observable} from "rxjs";
import {TretrominoPosition} from "../../service/model/tretromino-position.model";

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.less']
})
export class GameBoardComponent implements OnInit, OnDestroy {

  private landedGrid: Array<Array<number>>;
  private landedGridSubscription: Subscription;


  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.landedGridSubscription = this.gameService.getLandedGameGrid().subscribe(landedGrid => this.landedGrid = landedGrid);
  }

  ngOnDestroy() {
    this.landedGridSubscription.unsubscribe();
  }

  isFilled(cell: number) {
    return cell == 1 ? true: false;
  }

  getMovingPieceShape(): Observable<Array<Array<number>>> {
    return this.gameService.getMovingTretrominoShape();
  }

  getMovingPiecePosition(): Observable<TretrominoPosition> {
    return this.gameService.getMovingTretrominoPosition();
  }
}
