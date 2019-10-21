import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { AppMaterialModule } from "../app-material/app-material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [LoginComponent, RegisterComponent, AboutComponent],
  exports: [
    AboutComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthenticateModule { }
