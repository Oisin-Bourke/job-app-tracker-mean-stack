import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./authenticate/login/login.component";
import { RegisterComponent } from "./authenticate/register/register.component";
import { IssueListComponent } from "./issue/issue-list/issue-list.component";
import { IssueCreateComponent } from "./issue/issue-create/issue-create.component";
import { IssueUpdateComponent } from "./issue/issue-update/issue-update.component";
import { AboutComponent } from "./authenticate/about/about.component";
import {AuthenticationGuard} from "./_helpers/authentication.guard";
import {UserListComponent} from "./user/user-list/user-list.component";

const routes: Routes = [
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthenticationGuard]},
  { path: 'issues', component: IssueListComponent, canActivate: [AuthenticationGuard] },
  { path: 'issues/create', component: IssueCreateComponent },
  { path: 'issues/update/:id', component: IssueUpdateComponent },
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
