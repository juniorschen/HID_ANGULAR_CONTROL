import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ControlSettingsComponent } from './control-settings.component';
import { ControlSettingsRoutingModule } from './control-settings-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ControlSettingsComponent
  ],
  imports: [
    CommonModule,
    ControlSettingsRoutingModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ControlSettingsModule { }
