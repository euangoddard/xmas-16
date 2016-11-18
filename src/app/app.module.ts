import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { NotesService } from "./notes.service";
import { AudioService } from "./audio.service";
import { CaptureService } from "./capture.service";
import { ChallengeModule } from './challenge/challenge.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
  ],
  providers: [NotesService, AudioService, CaptureService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
