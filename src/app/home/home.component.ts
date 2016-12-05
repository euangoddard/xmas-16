import { TUNES } from './../challenge/tunes.definition';
import { Tune } from './../challenge/models';
import { Component, OnInit } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  templateUrl: './home.component.html',
  selector: 'app-home',
})
export class HomeComponent implements OnInit {

  isCaptureSupported: boolean;

  constructor(private audioService: AudioService) {
  }

  ngOnInit(): void {
    this.isCaptureSupported = this.audioService.isGetUserMediaSupported();
  }

  get tunes(): Tune[] {
    return TUNES;
  }
}
