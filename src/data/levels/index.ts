import cross from './cross';
import solitaire from './solitaire';
import diamond from './diamond';
import pyramid from './pyramid';
import arrow from './arrow';
import plus from './plus';
import fireplace from './fireplace';

export const levels: readonly Readonly<Level>[] = Object.freeze([
  cross,
  solitaire,
  diamond,
  pyramid,
  arrow,
  plus,
  fireplace,
]);
