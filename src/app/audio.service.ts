import { Injectable } from '@angular/core';


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

  isGetUserMediaSupported(): boolean {
    navigator.getUserMedia = navigator.getUserMedia || navigator['webkitGetUserMedia'] || navigator['mozGetUserMedia'];
    let isSupported: boolean;
    if ((navigator.mediaDevices && navigator.mediaDevices.getUserMedia) || navigator.getUserMedia) {
      isSupported = true;
    } else {
      isSupported = false;
    }
    return isSupported;
  };

  private getAudioContext() {
    let context;
    context = window['AudioContext'] || window['webkitAudioContext'] || null;
    return context;
  }
}
