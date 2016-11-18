import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //   { path: '',  component: DashboardComponent },
  {
    path: 'challenges',
    loadChildren: './challenge/challenge.module#ChallengeModule',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
