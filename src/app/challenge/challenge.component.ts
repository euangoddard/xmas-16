import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Tune } from './tunes.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
})
export class ChallengeComponent implements OnInit {

  public tune: Tune;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.tune = this.route.snapshot.data['tune'];
  }
}
