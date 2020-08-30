import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ButtonComponent, InputComponent, ListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    ClipboardModule,
    MatTooltipModule,
    MatTableModule,
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    ListComponent,
  ],
})
export class SharedModule { }
