import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssueModule } from "./issue/issue.module";
import { AuthenticateModule } from "./authenticate/authenticate.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from "./app-material/app-material.module";
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { JwtInterceptor } from "./_helpers/jwt.Interceptor";
import { ReactiveFormsModule } from "@angular/forms";
import { UserModule } from "./user/user.module";
import { ErrorInterceptor } from "./_helpers/error.interceptor";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IssueModule,
    AuthenticateModule,
    UserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
