import { NotesService } from './../notes/notes.service';
import { CaptureService } from './../capture.service';
import { TunesService } from './tunes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuneNote } from './models';


@Component({
  selector: 'app-singing',
  templateUrl: './singing.component.html',
})
export class SingingComponent implements OnInit, OnDestroy {

  tune: TuneNote[];

  currentIndex = 0;

  note: string;

  private canAdvance = true;

  constructor(
    private route: ActivatedRoute,
    private capture: CaptureService,
    private notes: NotesService,
    private tunes: TunesService,
  ) { }

  ngOnInit() {
    const currentTune = this.route.parent.snapshot.data['tune'];
    this.route.params.subscribe(params => {
      this.tune = this.tunes.getTuneTransposed(currentTune, params['noteName']);
    });

    this.capture.startCapture();
    this.capture.notes.subscribe(note => {
      this.note = note;
      if (this.canAdvance && note === this.tune[this.currentIndex].note.name) {
        this.currentIndex += 1;
        this.canAdvance = false;
      }

      if (!this.canAdvance && note === null) {
        this.canAdvance = true;
      }
    });
  }

  ngOnDestroy() {
    this.capture.stopCapture();
  }

  get noteDifference(): number {
    let semitoneDelta: number = null;
    if (this.note) {
      const targetNote = this.tune[this.currentIndex].note;
      semitoneDelta = this.notes.getSemitoneDifference(targetNote, this.note);
    }
    return semitoneDelta;
  }

  cheat() {
    this.notes.playNote(this.tune[this.currentIndex].note.name, 500);
  }

}
