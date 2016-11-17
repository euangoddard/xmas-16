import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CaptureService } from "../capture.service";
import { NotesService } from "../notes.service";

@Component({
  selector: 'app-challenge-start',
  templateUrl: './start.component.html',
})
export class ChallengeStartComponent implements OnInit {
  public note: string;

  public pitch: number;

  constructor(private capture: CaptureService, private notes: NotesService) {

  }

  ngOnInit() {
    this.capture.startCapture();
    this.capture.notes
      .filter(note => note !== null)
      .buffer(Observable.interval(500))
      .filter(notes => notes.length > 0)
      .map(getMostCommonValue)
      .subscribe(note => this.note = note);
    this.capture.pitches.subscribe(pitch => this.pitch = pitch);

    //this.notes.playNote('A4');
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