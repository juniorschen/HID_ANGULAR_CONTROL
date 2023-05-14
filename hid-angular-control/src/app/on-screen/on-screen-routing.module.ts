import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnScreenComponent } from './on-screen.component';

const routes: Routes = [
  {
    path: 'on-screen',
    component: OnScreenComponent
  },
  {
    path: '**', redirectTo: 'on-screen'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnScreenRoutingModule { }
