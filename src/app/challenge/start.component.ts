import { Component, OnInit, OnDestroy } from '@angular/core';
import { CaptureService } from '../capture.service';
import { NotesService } from '../notes/notes.service';

@Component({
  selector: 'app-challenge-start',
  templateUrl: './start.component.html',
})
export class ChallengeStartComponent implements OnInit, OnDestroy {

  public note: string;

  public pitch: number;

  public selectedNoteName: string = null;

  constructor(
    private capture: CaptureService,
    private notes: NotesService,
    ) {
  }

  ngOnInit() {
    this.capture.startCapture();
    this.capture.notes.filter(note => !!note).subscribe(note => this.note = note);
    this.capture.pitches.subscribe(pitch => this.pitch = pitch);
  }

  ngOnDestroy() {
    this.capture.stopCapture();
  }

  get isNoteSelected(): boolean {
    return this.selectedNoteName !== null;
  }

  setSelectedNote(note: string) {
    this.selectedNoteName = note;
  }

  playSelectedNote(): void {
    this.notes.playNote(this.selectedNoteName, 750);
  }

}
