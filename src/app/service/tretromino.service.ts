import { Injectable } from '@angular/core';
import {Subject, ReplaySubject, Observable} from "rxjs";
import {Tretromino} from "./model/tretrominos/tetromino.model";
import {TretrominoPosition} from "./model/tretromino-position.model";
import {LTretromino} from "./model/tretrominos/l-tetromino.model";
import {OTretromino} from "./model/tretrominos/o-tetromino.model";
import {TTretromino} from "./model/tretrominos/t-tretomino.model";
import {ITretromino} from "./model/tretrominos/i-tetromino.model";
import {JTretromino} from "./model/tretrominos/j-tetromino.model";
import {STretromino} from "./model/tretrominos/s-tetromino.model";
import {ZTretromino} from "./model/tretrominos/z-tetromino.model";

@Injectable()
export class TretrominoService {

  private nextRandomTretromino: Tretromino;
  private nextRandomTretrominoShapeSubject: Subject<Array<Array<number>>>;
  private nextRandomTretrominoPositionSubject: Subject<TretrominoPosition>;

  constructor() {
    this.nextRandomTretrominoShapeSubject = new ReplaySubject<Array<Array<number>>>();
    this.nextRandomTretrominoPositionSubject = new ReplaySubject<TretrominoPosition>();

    this.generateNewRandomPiece();
  }

  getNextTretrominoShape(): Observable<Array<Array<number>>> {
    return this.nextRandomTretrominoShapeSubject.asObservable();
  }

  getNextTretrominoPosition(): Observable<TretrominoPosition> {
    return this.nextRandomTretrominoPositionSubject.asObservable();
  }

  getNewTretromino(): Tretromino {
    let newMovingPiece: Tretromino = this.nextRandomTretromino;
    this.generateNewRandomPiece();
    newMovingPiece.col = 4;
    return newMovingPiece;
  }

  private generateNewRandomPiece() {
    let randomNumber = this.getRandomNumber(0, 7);

    switch (randomNumber) {
      case 0:
        this.nextRandomTretromino = new LTretromino();
        break;
      case 1:
        this.nextRandomTretromino = new OTretromino();
        break;
      case 2:
        this.nextRandomTretromino = new JTretromino();
        break;
      case 3:
        this.nextRandomTretromino = new ITretromino();
        break;
      case 4:
        this.nextRandomTretromino = new TTretromino();
        break;
      case 5:
        this.nextRandomTretromino = new STretromino();
        break;
      case 6:
        this.nextRandomTretromino = new ZTretromino();
        break;
    }

    this.nextRandomTretrominoShapeSubject.next(this.nextRandomTretromino.shape);
    this.nextRandomTretrominoPositionSubject.next(this.nextRandomTretromino.calculateStyle());
  }

  // min inclusive, max exclusive
  private getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
