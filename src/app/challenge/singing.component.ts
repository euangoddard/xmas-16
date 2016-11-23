import { NotesService } from './../notes/notes.service';
import { CaptureService } from './../capture.service';
import { TunesService } from './tunes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuneNote } from './models';
import { Note } from '../notes/models';


@Component({
  selector: 'app-singing',
  templateUrl: './singing.component.html',
})
export class SingingComponent implements OnInit, OnDestroy {

  tune: TuneNote[];

  currentIndex = 0;

  note: string;

  isComplete = false;

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
      this.currentIndex = 0;
      this.capture.startCapture();
    });

    this.capture.notes.subscribe(noteName => {
      this.note = noteName;
      if (!this.isComplete && noteName === this.currentNote.name) {
        if (this.currentIndex === (this.tune.length - 1)) {
          this.isComplete = true;
          this.capture.stopCapture();
        }
        this.currentIndex += 1;
      }
    });
  }

  ngOnDestroy() {
    this.capture.stopCapture();
  }

  get noteDifference(): number {
    let semitoneDelta: number = null;
    if (this.note) {
      semitoneDelta = this.notes.getSemitoneDifference(this.currentNote, this.note);
    }
    return semitoneDelta;
  }

  cheat() {
    this.notes.playNote(this.currentNote.name, 500);
  }

  private get currentNote(): Note {
    return this.tune[this.currentIndex].note;
  }

}
