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
  displayedColumns = ['appDate','jobTitle', 'company','expand'];
  expandedElement: Application | null;

  constructor(
    private applicationService:ApplicationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchApplications();
  }

  fetchApplications() {
    this.applicationService.getApplicationsByUser().subscribe(
      (data: Application[]) => {
        this.applications = data;
      });
  }

  deleteNote(id){
    this.applicationService.deleteNote(id)
      .subscribe( () => {
        this.fetchApplications();
    });
  }

  navigateCreate(){
    this.router.navigate(['/applications/create']);
  }

  navigateAddNote(id){
    this.router.navigate([`/applications/note/${id}`]);
  }

}
