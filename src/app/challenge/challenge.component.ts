import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tune } from './models';


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
