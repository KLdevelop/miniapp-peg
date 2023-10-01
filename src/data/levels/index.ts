import cross from './cross';
import solitaire from './solitaire';
import diamond from './diamond';
import pyramid from './pyramid';
import arrow from './arrow';
import plus from './plus';
import fireplace from './fireplace';

export const levels = [cross, solitaire, diamond, pyramid, arrow, plus, fireplace] as const;
