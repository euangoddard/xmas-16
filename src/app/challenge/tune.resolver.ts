import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Tune, TunesService } from './tunes.service';


@Injectable()
export class TuneResolver implements Resolve<Tune> {

  constructor(private router: Router, private tunes: TunesService) {}

  resolve(route: ActivatedRouteSnapshot): Tune | boolean {
    const tune = this.tunes.getTuneForIndex(route.params['id']);
    if (tune === null) {
      this.router.navigate(['/']);
      return false;
    }
    return tune;
  }

}