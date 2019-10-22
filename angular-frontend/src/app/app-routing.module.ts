import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./authenticate/login/login.component";
import { RegisterComponent } from "./authenticate/register/register.component";
import { ApplicationListComponent } from "./application/application-list/application-list.component";
import { ApplicationCreateComponent } from "./application/application-create/application-create.component";
import { ApplicationUpdateComponent } from "./application/application-update/application-update.component";
import { AboutComponent } from "./authenticate/about/about.component";
import { AuthenticationGuard } from "./_helpers/authentication.guard";
import { UserListComponent } from "./user/user-list/user-list.component";
import { NoteCreateComponent } from "./application/note-create/note-create.component";

const routes: Routes = [
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthenticationGuard]},
  { path: 'applications', component: ApplicationListComponent, canActivate: [AuthenticationGuard] },
  { path: 'applications/create', component: ApplicationCreateComponent },
  { path: 'applications/update/:id', component: ApplicationUpdateComponent },
  { path: 'applications/note/:id', component: NoteCreateComponent },
  // otherwise redirect to default about
  { path: '**', redirectTo: '/about' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
