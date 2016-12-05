import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeComponent } from './challenge.component';
import { ChallengeStartComponent } from './start.component';
import { SingingComponent } from './singing.component';
import { TuneResolver } from './tune.resolver';
import { TunesService } from './tunes.service';
import { ChallengeGuard } from './challenge.guard.service';

const routes: Routes = [
  {
    path: ':id',
    resolve: {
      tune: TuneResolver,
    },
    canActivate: [ChallengeGuard],
    component: ChallengeComponent,
    children: [
      {path: '', component: ChallengeStartComponent},
      {path: 'sing/:noteName', component: SingingComponent},
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [TuneResolver, TunesService, ChallengeGuard],
  exports: [RouterModule]
})
export class ChallengeRoutingModule {
}
