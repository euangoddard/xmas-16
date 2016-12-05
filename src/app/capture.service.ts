import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HIGHEST_FREQUENCY, NOTES } from './notes/notes.definition';
import { Note } from './notes/models';
import { AudioService } from './audio.service';


@Injectable()
export class CaptureService {

  private isMicrophoneInUse = false;

  private frameId: number;

  private sourceAudioNode;

  private analyserAudioNode: AnalyserNode;

  private noteSubject: Subject<string> = new Subject();

  private pitchSubject: Subject<number> = new Subject();

  constructor(private audioService: AudioService) {
  }

  get pitches(): Observable<number> {
    return this.pitchSubject.asObservable()
      .map(pitch => Math.round(pitch))
      .distinctUntilChanged();
  }

  get notes(): Observable<string> {
    const notesObservable = this.noteSubject.asObservable();
    return notesObservable
      .filter(note => note !== null)
      .buffer(Observable.interval(100))
      .map(getMostCommonValue)
      .distinctUntilChanged();
  }

  stopCapture(): void {
    if (this.sourceAudioNode && this.sourceAudioNode.mediaStream && this.sourceAudioNode.mediaStream.stop) {
      this.sourceAudioNode.mediaStream.stop();
    }
    this.sourceAudioNode = null;
    this.updatePitch(null);
    this.updateNote(null);
    this.analyserAudioNode = null;
    window.cancelAnimationFrame(this.frameId);
    this.isMicrophoneInUse = false;
  };

  startCapture(): void {
    if (!this.isMicrophoneInUse) {
      if (this.audioService.isGetUserMediaSupported()) {
        const getUserMedia = navigator.mediaDevices && navigator.mediaDevices.getUserMedia ?
          navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices) :
          function (constraints) {
            return new Promise(function (resolve, reject) {
              navigator.getUserMedia(constraints, resolve, reject);
            });
          };

        getUserMedia({audio: true}).then((stream) => this.streamReceived(stream)).catch((err) => this.reportError(err));
        this.isMicrophoneInUse = true;
      } else {
        this.reportError('It looks like this browser does not support getUserMedia. ' +
          'Check <a href="http://caniuse.com/#feat=stream">http://caniuse.com/#feat=stream</a> for more info.');
      }
    }
  };

  private updatePitch(frequency: number): void {
    this.pitchSubject.next(frequency);
  }

  private updateNote(note: string): void {
    this.noteSubject.next(note);
  }

  private reportError(message: string): void {
    console.error(message);
  };

  private findFundamentalFreq(buffer: Uint8Array, sampleRate: number): number {
    // We use Autocorrelation to find the fundamental frequency.

    // In order to correlate the signal with itself (hence the name of the algorithm), we will check two points 'k' frames away.
    // The autocorrelation index will be the average of these products. At the same time, we normalize the values.
    // Source: http://www.phy.mty.edu/~suits/autocorrelation.html
    // Assuming the sample rate is 48000Hz, a 'k' equal to 1000 would correspond to a 48Hz signal (48000/1000 = 48),
    // while a 'k' equal to 8 would correspond to a 6000Hz one, which is enough to cover most (if not all)
    // the notes we have in the notes.json file.
    const n = 1024;
    let bestK = -1;
    let bestR = 0;
    for (let k = 8; k <= 1000; k++) {
      let sum = 0;

      for (let i = 0; i < n; i++) {
        sum += ((buffer[i] - 128) / 128) * ((buffer[i + k] - 128) / 128);
      }

      let r = sum / (n + k);

      if (r > bestR) {
        bestR = r;
        bestK = k;
      }

      if (r > 0.9) {
        // Let's assume that this is good enough and stop right here
        break;
      }
    }

    let fundamentalFreq: number;
    if (bestR > 0.0025) {
      // The period (in frames) of the fundamental frequency is 'bestK'. Getting the frequency from there is trivial.
      fundamentalFreq = sampleRate / bestK;
    } else {
      // We haven't found a good correlation
      fundamentalFreq = -1;
    }

    if (HIGHEST_FREQUENCY < fundamentalFreq) {
      fundamentalFreq = -1;
    }

    return fundamentalFreq;
  };

  private findClosestNote(freq: number, notes: Note[]): Note {
    // Use binary search to find the closest note
    let low = -1;
    let high = notes.length;
    while (high - low > 1) {
      const pivot = Math.round((low + high) / 2);
      if (notes[pivot].frequency <= freq) {
        low = pivot;
      } else {
        high = pivot;
      }
    }

    let foundNote: Note;
    if (Math.abs(notes[high].frequency - freq) <= Math.abs(notes[low].frequency - freq)) {
      // notes[high] is closer to the frequency we found
      foundNote = notes[high];
    } else {
      foundNote = notes[low];
    }
    return foundNote;
  };

  private detectPitch(): void {
    const buffer = new Uint8Array(this.analyserAudioNode.fftSize);
    this.analyserAudioNode.getByteTimeDomainData(buffer);

    const fundalmentalFreq = this.findFundamentalFreq(buffer, this.audioService.context.sampleRate);

    if (fundalmentalFreq !== -1) {
      const note = this.findClosestNote(fundalmentalFreq, NOTES);
      this.updateNote(note.name);
      this.updatePitch(fundalmentalFreq);
    } else {
      this.updateNote(null);
      this.updatePitch(null);
    }

    this.frameId = window.requestAnimationFrame(() => this.detectPitch());
  };

  private streamReceived(stream) {
    const micStream = stream;

    this.analyserAudioNode = this.audioService.context.createAnalyser();
    this.analyserAudioNode.fftSize = 2048;

    this.sourceAudioNode = this.audioService.context.createMediaStreamSource(micStream);
    this.sourceAudioNode.connect(this.analyserAudioNode);

    this.detectPitch();
  };

}


function getMostCommonValue(array: Array<any>) {
  const frequency = {};
  let maxFrequency = 0;
  let mostCommonValue = null;
  array.forEach(v => {
    frequency[v] = (frequency[v] || 0) + 1;
    if (frequency[v] > maxFrequency) {
      maxFrequency = frequency[v];
      mostCommonValue = v;
    }
  });
  return mostCommonValue;
}
