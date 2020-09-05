import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
// import { ButtonComponent } from '../shared/button/button.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from '../shared/popup/popup.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MatDialogModule,
  ],
  entryComponents: [PopupComponent],
})
export class PagesModule { }
