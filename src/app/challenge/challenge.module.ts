import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeComponent } from './challenge.component';
import { ChallengeRoutingModule } from './challenge.routing.module';
import { TunesService } from './tunes.service';
import { ChallengeStartComponent } from './start.component';


@NgModule({
  imports: [
    CommonModule,
    ChallengeRoutingModule,
  ],
  declarations: [
    ChallengeComponent,
    ChallengeStartComponent,
  ],
})
export class ChallengeModule { }
