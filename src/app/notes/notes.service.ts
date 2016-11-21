import { Injectable } from '@angular/core';
import { AudioService } from '../audio.service';
import { NOTES } from './notes.definition';
import { Note } from './models';


@Injectable()
export class NotesService {

  private sourceAudioNode: OscillatorNode;

  private gainNode: GainNode;

  private isSoundPlaying = false;

  private stopTimeoutID;

  constructor(private audioService: AudioService) {
    const context = audioService.context;
    this.gainNode = context.createGain();
    this.gainNode.gain.value = 0.3;
    this.gainNode.connect(context.destination);
  }

  playNote(noteName: string, duration = 1000): void {
    if (this.isSoundPlaying) {
      this.sourceAudioNode.stop();
      clearTimeout(this.stopTimeoutID);
    }
    const frequency = this.getFrequencyForNote(noteName);
    this.sourceAudioNode = this.audioService.context.createOscillator();
    this.sourceAudioNode.frequency.value = frequency;
    this.sourceAudioNode.connect(this.gainNode);
    this.sourceAudioNode.start();
    this.stopTimeoutID = setTimeout(() => {
      this.sourceAudioNode.stop();
      this.stopTimeoutID = null;
      this.isSoundPlaying = false;
    }, duration);

    this.isSoundPlaying = true;
  }

  getSemitoneDifference(targetNote: Note, sourceNoteName: string): number {
    const noteNames = NOTES.map(note => note.name);
    const sourceNoteIndex = noteNames.indexOf(sourceNoteName);
    const targetNoteIndex = noteNames.indexOf(targetNote.name);
    return sourceNoteIndex - targetNoteIndex;
  }

  private getNoteForName(noteName: string): Note {
    const applicableNotes = NOTES.filter((note: Note) => {
      return note.name === noteName;
    });
    if (!applicableNotes.length) {
      throw new Error(`Cannot find note "${noteName}"`);
    }
    return applicableNotes[0];
  }

  private getFrequencyForNote(noteName: string): number {
    const note = this.getNoteForName(noteName);
    return note.frequency;
  }

}
