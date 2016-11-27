import { HomeRoutingModule } from './home.routing.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
