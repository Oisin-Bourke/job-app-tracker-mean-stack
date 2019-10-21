import { Component, OnInit } from '@angular/core';
import { Issue } from "../../models/issue.model";
import { IssueService } from "../../services/issue.service";
import { Router } from "@angular/router";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IssueListComponent implements OnInit {
  issues: Issue[];
  displayedColumns = ['index','responsible', 'threat', 'severity', 'status'];
  expandedElement: Issue | null;

  constructor(
    private issueService:IssueService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchIssuesByUser();
  }

  fetchIssuesByUser() {
    this.issueService.getIssuesByUser().subscribe(
      (data: Issue[]) => {
        this.issues = data;
      }
    )
  }

  navigateCreate(){
    this.router.navigate(['/issues/create']);
  }

}
