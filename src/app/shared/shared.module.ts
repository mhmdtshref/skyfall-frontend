import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from './input/input.component';


@NgModule({
  declarations: [ButtonComponent, InputComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [ButtonComponent],
})
export class SharedModule { }
