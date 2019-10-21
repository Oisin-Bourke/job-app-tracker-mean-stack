import { Component, OnInit } from '@angular/core';
import { Application} from "../../models/application.model";
import { ApplicationService } from "../../services/application.service";
import { Router } from "@angular/router";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-issue-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ApplicationListComponent implements OnInit {
  applications: Application [];
  displayedColumns = ['index','responsible', 'threat', 'severity', 'status'];
  expandedElement: Application | null;

  constructor(
    private issueService:ApplicationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchIssuesByUser();
  }

  fetchIssuesByUser() {
    this.issueService.getIssuesByUser().subscribe(
      (data: Application[]) => {
        this.applications = data;
      }
    )
  }

  navigateCreate(){
    this.router.navigate(['/applications/create']);
  }

}
