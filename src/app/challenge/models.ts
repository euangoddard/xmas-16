import { Note } from '../notes/models';


export type TunePart = {
  syllable: string;
  semitoneDelta: number;
}


export type Tune = {
  name: string;
  parts: TunePart[];
  url: string;
}


export type TuneNote = {
  syllable: string;
  note: Note
}
