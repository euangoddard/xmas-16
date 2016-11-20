import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeComponent } from './challenge.component';
import { ChallengeStartComponent } from './start.component';
import { SingingComponent } from './singing.component';
import { TuneResolver } from './tune.resolver';
import { TunesService } from './tunes.service';

const routes: Routes = [
  {
    path: ':id',
    resolve: {
      tune: TuneResolver,
    },
    component: ChallengeComponent,
    children: [
      {path: '', component: ChallengeStartComponent},
      {path: 'sing/:noteName', component: SingingComponent},
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [TuneResolver, TunesService],
  exports: [RouterModule]
})
export class ChallengeRoutingModule {
}
