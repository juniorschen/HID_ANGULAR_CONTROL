import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlSettingsComponent } from './control-settings.component';

const routes: Routes = [
  {
    path: 'control-settings',
    component: ControlSettingsComponent
  },
  {
    path: '**', redirectTo: 'control-settings'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlSettingsRoutingModule { }
