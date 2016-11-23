import { TunesService } from './tunes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tune } from './models';


@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
})
export class ChallengeComponent implements OnInit {

  public tune: Tune;

  public previousTuneIndex: number;

  public nextTuneIndex: number;

  constructor(
    private route: ActivatedRoute,
    private tunes: TunesService,
  ) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.tune = data['tune'];
    });

    this.route.params
      .map(params => +params['id'])
      .subscribe(tuneIndex => this.setupNavigation(tuneIndex));
  }

  private setupNavigation(currentTuneIndex: number): void {
    const previousTuneIndex = currentTuneIndex - 1;
    if (this.tunes.getTuneForIndex(previousTuneIndex)) {
      this.previousTuneIndex = previousTuneIndex;
    } else {
      this.previousTuneIndex = null;
    }

    const nextTuneIndex = currentTuneIndex + 1;
    if (this.tunes.getTuneForIndex(nextTuneIndex)) {
      this.nextTuneIndex = nextTuneIndex;
    } else {
      this.nextTuneIndex = null;
    }
  }
}
