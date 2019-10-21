import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueUpdateComponent } from './issue-update/issue-update.component';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { IssueListComponent } from "./issue-list/issue-list.component";
import { AppMaterialModule } from "../app-material/app-material.module";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [IssueListComponent, IssueUpdateComponent, IssueCreateComponent],
  exports: [
    IssueListComponent,
    IssueUpdateComponent,
    IssueCreateComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class IssueModule { }
