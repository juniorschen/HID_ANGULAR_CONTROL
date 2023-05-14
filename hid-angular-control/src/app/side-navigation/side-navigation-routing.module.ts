import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavigationComponent } from './side-navigation.component';

const routes: Routes = [
  {
    path: 'side-navigation',
    component: SideNavigationComponent,
    children: [
      {
        path: 'on-screen',
        loadChildren: () => import('../on-screen/on-screen.module').then((m) => m.OnScreenModule),
      },
      {
        path: 'control-settings',
        loadChildren: () => import('../control-settings/control-settings.module').then((m) => m.ControlSettingsModule),
      },
    ]
  },
  {
    path: '**', redirectTo: 'side-navigation'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideNavigationRoutingModule { }
