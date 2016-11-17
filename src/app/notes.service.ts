import { Injectable } from "@angular/core";
import { AudioService } from "./audio.service";
import { NOTES, Note } from "./notes.definition";


@Injectable()
export class NotesService {

  private sourceAudioNode: OscillatorNode;

  private isSoundPlaying = false;

  private stopTimeoutID;

  constructor(private audioService: AudioService) {
    
  }

  playNote(noteName: string, duration: number = 1000): void {
    if (this.isSoundPlaying) {
      this.sourceAudioNode.stop();
      clearTimeout(this.stopTimeoutID);
    }
    const context = this.audioService.context;
    const frequency = this.getFrequencyForNote(noteName);
    this.sourceAudioNode = context.createOscillator();
    this.sourceAudioNode.frequency.value = frequency;
    this.sourceAudioNode.connect(context.destination);
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