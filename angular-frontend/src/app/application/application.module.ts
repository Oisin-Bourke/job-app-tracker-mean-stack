import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationUpdateComponent } from './application-update/application-update.component';
import { ApplicationCreateComponent } from './application-create/application-create.component';
import { ApplicationListComponent } from "./application-list/application-list.component";
import { AppMaterialModule } from "../app-material/app-material.module";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [ApplicationListComponent, ApplicationUpdateComponent, ApplicationCreateComponent],
  exports: [
    ApplicationListComponent,
    ApplicationUpdateComponent,
    ApplicationCreateComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class ApplicationModule { }
