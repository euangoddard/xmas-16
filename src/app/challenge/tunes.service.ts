import { Injectable } from '@angular/core';
import { NOTES } from '../notes/notes.definition';
import { TUNES } from './tunes.definition';
import { Tune, TuneNote } from './models';


@Injectable()
export class TunesService {

  constructor() {
  }

  getTuneForIndex(index: number): Tune {
    const indexZeroBased = index - 1;
    return TUNES[indexZeroBased] || null;
  }

  getTuneTransposed(tune: Tune, noteName: string): TuneNote[] {
    let noteIndex = this.getIndexForNoteName(noteName);
    const tuneNotes = tune.parts.map((part): TuneNote => {
      noteIndex += part.semitoneDelta;
      const note = NOTES[noteIndex];
      if (!note) {
        throw new RangeError('Cannot transpose tune. Note out of range');
      }

      return {
        syllable: part.syllable,
        note: note
      };
    });
    return tuneNotes;
  }

  private getIndexForNoteName(noteName: string): number {
    let noteIndex: number = null;
    NOTES.forEach((note, index) => {
      if (noteName === note.name) {
        noteIndex = index;
      }
    });
    if (noteIndex === null) {
      throw new Error(`Could not find named "${noteName}"`);
    }
    return noteIndex;
  }

}
