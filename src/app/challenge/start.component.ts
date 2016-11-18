import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaptureService } from '../capture.service';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-challenge-start',
  templateUrl: './start.component.html',
})
export class ChallengeStartComponent implements OnInit {
  public note: string;

  public pitch: number;

  private selectedNoteName: string = null;

  constructor(private capture: CaptureService, private notes: NotesService) {

  }

  ngOnInit() {
    this.capture.startCapture();
    this.capture.notes
      .filter(note => note !== null)
      .buffer(Observable.interval(250))
      .filter(notes => notes.length > 0)
      .map(getMostCommonValue)
      .subscribe(note => this.note = note);
    this.capture.pitches.subscribe(pitch => this.pitch = pitch);
  }

  get isNoteSelected(): boolean {
    return this.selectedNoteName !== null;
  }

  setSelectedNote(noteName: string): void {
    this.selectedNoteName = noteName;
  }

  playSelectedNote(): void {
    this.notes.playNote(this.selectedNoteName, 750);
  }

}


function getMostCommonValue(array: Array<any>) {
  const frequency = {};
  let maxFrequency = 0;
  let mostCommonValue;
  array.forEach(v => {
    frequency[v] = (frequency[v] || 0) + 1;
    if (frequency[v] > maxFrequency) {
      maxFrequency = frequency[v];
      mostCommonValue = v;
    }
  });
  return mostCommonValue;
}
