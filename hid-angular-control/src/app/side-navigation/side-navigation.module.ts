import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SideNavigationComponent } from './side-navigation.component';
import { SideNavigationRoutingModule } from './side-navigation-routing.module';

@NgModule({
  declarations: [
    SideNavigationComponent
  ],
  imports: [
    CommonModule,
    SideNavigationRoutingModule,
    MatSidenavModule,
    FlexLayoutModule
  ]
})
export class SideNavigationModule { }
