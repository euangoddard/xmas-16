import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeComponent } from './challenge.component';
import { ChallengeRoutingModule } from './challenge.routing.module';
import { ChallengeStartComponent } from './start.component';
import { SingingComponent } from './singing.component';
import { NoteSymbolPipe } from './note-symbol.pipe';


@NgModule({
  imports: [
    CommonModule,
    ChallengeRoutingModule,
  ],
  declarations: [
    ChallengeComponent,
    ChallengeStartComponent,
    SingingComponent,
    NoteSymbolPipe,
  ],
})
export class ChallengeModule {
}
