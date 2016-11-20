import { Injectable } from '@angular/core';
import { AudioService } from './audio.service';
import { NOTES, Note } from './notes.definition';


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

  playNote(noteName: string, duration: number = 1000): void {
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

  private getFrequencyForNote(noteName: string): number {
    const notesForFrequency = NOTES.filter((note: Note) => {
      return note.name === noteName;
    });
    if (!notesForFrequency.length) {
      throw new Error(`Cannot find note "${noteName}"`);
    }
    return notesForFrequency[0].frequency;
  }
}
