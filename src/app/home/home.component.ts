import { TUNES } from './../challenge/tunes.definition';
import { Tune } from './../challenge/models';
import { Component } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  selector: 'app-home',
})
export class HomeComponent {

  get tunes(): Tune[] {
    return TUNES;
  }
}
