import { Injectable } from "@angular/core";

@Injectable()
export class AudioService {

  private audioContext: AudioContext;

  constructor() {
    const context = this.getAudioContext();
    if (context) {
      this.audioContext = new context();
    }
    else {
      throw new Error('AudioContext is not supported in this browser');
    }
  }

  get context() {
    return this.audioContext;
  }

  private getAudioContext() {
    let context;
    context = AudioContext || window['webkitAudioContext'] || null;
    return context;
  }
}
