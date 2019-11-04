import { Component, OnInit } from '@angular/core';
import { Application} from "../../models/application.model";
import { ApplicationService } from "../../services/application.service";
import { Router } from "@angular/router";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { saveAs } from 'file-saver';


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

  deleteApplication(id){
    this.applicationService.deleteApplication(id).subscribe(() => {
      this.fetchApplications();
    })
  }

  deleteNote(id){
    this.applicationService.deleteNote(id)
      .subscribe( () => {
        this.fetchApplications();
    });
  }

  csvExport(){
    const replacer = (key, value) => value === null ? '' : value;
    const header = ['appDate', 'jobTitle', 'company', 'location', 'email', 'telephone', 'status'];//add notes array
    let csv = this.applications.map(row => header.map(fieldName => (fieldName==='notes') ? JSON.stringify(this.stringifyArray(row[fieldName]), replacer): JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    const blob = new Blob([csvArray], {type: 'text/csv'});
    saveAs(blob, "Job_Applications.csv");
  }

  stringifyArray(array :[]){
    let text = '';
    array.forEach(function (element) {
      text += " * Date: "+ element['date'] +" * Type: " + element['type'] + " * Note: " + element['body'];
    });
    return text;
  }

  navigateCreate(){
    this.router.navigate(['/applications/create']);
  }

  navigateUpdate(id){
    this.router.navigate([`applications/update/${id}`])
  }

  navigateAddNote(id){
    this.router.navigate([`/applications/note/${id}`]);
  }

}
