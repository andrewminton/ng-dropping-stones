import { Tetris } from '../../model/tetris/tetris.model';
import * as clone from 'clone';
import { leftCollision } from '../../helpers/store-helpers';

export const leftMapper = (state: Tetris[], index: number): Tetris[] => {
  const newState = clone(state);
  const game = newState[index];
  game.current.offset.x -= 1;
  if (leftCollision(game.board, game.current)) {
    console.log('nope left');
    game.current.offset.x += 1;
  }
  return newState;
};
