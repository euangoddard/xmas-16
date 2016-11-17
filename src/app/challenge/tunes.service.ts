import { Injectable } from '@angular/core';

@Injectable()
export class TunesService {

  constructor() { }

  getTuneForIndex(index: number): Tune {
    const indexZeroBased = index - 1;
    return TUNES[indexZeroBased] || null;
  }

}


export type TuneNote = {
  syllable: string;
  note: string;
}

export type Tune = {
  name: string;
  notes: TuneNote[];
}

const TUNES = [
  {
    name: 'Jingle bells',
    notes: [
      {
        syllable: 'Jin-',
        note: 'E'
      },
      {
        syllable: 'gle ',
        note: 'E'
      },
      {
        syllable: 'bells, ',
        note: 'E'
      },
      {
        syllable: 'jin-',
        note: 'E'
      },
      {
        syllable: 'gle ',
        note: 'E'
      },
      {
        syllable: 'bells ',
        note: 'E'
      },
      {
        syllable: 'jin-',
        note: 'E'
      },
      {
        syllable: 'gle ',
        note: 'G'
      },
      {
        syllable: 'all ',
        note: 'C'
      },
      {
        syllable: 'the ',
        note: 'D'
      },
      {
        syllable: 'way. ',
        note: 'E'
      },
      {
        syllable: 'Oh! ',
        note: 'F'
      },
      {
        syllable: 'What ',
        note: 'F'
      },
      {
        syllable: 'fun ',
        note: 'F'
      },
      {
        syllable: 'it ',
        note: 'F'
      },
      {
        syllable: 'is ',
        note: 'F'
      },
      {
        syllable: 'to ',
        note: 'E'
      },
      {
        syllable: 'ride ',
        note: 'E'
      },
      {
        syllable: 'in ',
        note: 'E'
      },
      {
        syllable: 'a ',
        note: 'E'
      },
      {
        syllable: 'one-',
        note: 'E'
      },
      {
        syllable: 'horse ',
        note: 'D'
      },
      {
        syllable: 'o-',
        note: 'E'
      },
      {
        syllable: 'pen ',
        note: 'D'
      },
      {
        syllable: 'sleigh ',
        note: 'D'
      },
      {
        syllable: 'Hey! ',
        note: 'G'
      },
      {
        syllable: 'Jin-',
        note: 'E'
      },
      {
        syllable: 'gle ',
        note: 'E'
      },
      {
        syllable: 'bells, ',
        note: 'E'
      },
      {
        syllable: 'jin-',
        note: 'E'
      },
      {
        syllable: 'gle ',
        note: 'E'
      },
      {
        syllable: 'bells ',
        note: 'E'
      },
      {
        syllable: 'jin-',
        note: 'E'
      },
      {
        syllable: 'gle ',
        note: 'G'
      },
      {
        syllable: 'all ',
        note: 'C'
      },
      {
        syllable: 'the ',
        note: 'D'
      },
      {
        syllable: 'way. ',
        note: 'E'
      },
      {
        syllable: 'Oh! ',
        note: 'F'
      },
      {
        syllable: 'What ',
        note: 'F'
      },
      {
        syllable: 'fun ',
        note: 'F'
      },
      {
        syllable: 'it ',
        note: 'F'
      },
      {
        syllable: 'is ',
        note: 'F'
      },
      {
        syllable: 'to ',
        note: 'E'
      },
      {
        syllable: 'ride ',
        note: 'E'
      },
      {
        syllable: 'in ',
        note: 'E'
      },
      {
        syllable: 'a ',
        note: 'E'
      },
      {
        syllable: 'one-',
        note: 'G'
      },
      {
        syllable: 'horse ',
        note: 'G'
      },
      {
        syllable: 'o-',
        note: 'F'
      },
      {
        syllable: 'pen ',
        note: 'D'
      },
      {
        syllable: 'sleigh ',
        note: 'C'
      },
    ]
  }
]