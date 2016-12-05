import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AudioService } from '../audio.service';


@Injectable()
export class ChallengeGuard implements CanActivate {

  constructor(private router: Router, private audioService: AudioService) {}

  canActivate(): boolean {
    if (this.audioService.isGetUserMediaSupported()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
