import { Action } from '@ngrx/store';

export enum TetrisActionTypes {
  TICK = 'TICK',
  INIT = 'INIT',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  ROTATE_RIGHT = 'ROTATE_RIGHT',
  ROTATE_LEFT = 'ROTATE_LEFT',
  DROP = 'DROP'
}

export class Tick implements Action {
  readonly type = TetrisActionTypes.TICK;

  constructor(public payload: number) {
  }
}

export class Init implements Action {
  readonly type = TetrisActionTypes.INIT;

  constructor(public payload: number) {
  }
}

export class Left implements Action {
  readonly type = TetrisActionTypes.LEFT;

  constructor(public payload: number) {
  }
}

export class Right implements Action {
  readonly type = TetrisActionTypes.RIGHT;

  constructor(public payload: number) {
  }
}

export class RotateRight implements Action {
  readonly type = TetrisActionTypes.ROTATE_RIGHT;

  constructor(public payload: number) {
  }
}

export class RotateLeft implements Action {
  readonly type = TetrisActionTypes.ROTATE_LEFT;

  constructor(public payload: number) {
  }
}

export class Drop implements Action {
  readonly type = TetrisActionTypes.DROP;

  constructor(public payload: number) {
  }
}

export type TetrisAction
  = Tick
  | Init
  | Left
  | Right
  | RotateRight
  | RotateLeft
  | Drop;
