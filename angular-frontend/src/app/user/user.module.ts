import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { AppMaterialModule } from "../app-material/app-material.module";



@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    UserListComponent
  ]
})
export class UserModule { }
