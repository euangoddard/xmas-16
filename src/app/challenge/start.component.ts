import { Tune } from './models';
import { ActivatedRoute } from '@angular/router';
import { TunesService } from './tunes.service';
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

  public currentTune: Tune;

  constructor(
    private route: ActivatedRoute,
    private capture: CaptureService,
    private notes: NotesService,
    private tunes: TunesService,
    ) {
  }

  ngOnInit() {
    this.capture.startCapture();
    this.capture.notes.filter(note => !!note).subscribe(note => this.note = note);
    this.capture.pitches.subscribe(pitch => this.pitch = pitch);
    this.currentTune = this.route.parent.snapshot.data['tune'];
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

  get canTransposeTune(): boolean {
    let canTranspose: boolean;
    if (this.isNoteSelected) {
      try {
        this.tunes.getTuneTransposed(this.currentTune, this.selectedNoteName);
        canTranspose = true;
      } catch (e) {
        if (e instanceof RangeError) {
          canTranspose = false;
        } else {
          throw e;
        }
      }
    } else {
      canTranspose = false;
    }
    return canTranspose;
  }

}
