import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { OnScreenComponent } from './on-screen.component';
import { OnScreenRoutingModule } from './on-screen-routing.module';

@NgModule({
  declarations: [
    OnScreenComponent
  ],
  imports: [
    CommonModule,
    OnScreenRoutingModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ]
})
export class OnScreenModule { }
