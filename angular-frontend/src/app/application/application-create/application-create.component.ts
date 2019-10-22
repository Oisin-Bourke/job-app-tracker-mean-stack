import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApplicationService} from "../../services/application.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-issue-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit {

  createApplicationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private issueService: ApplicationService,
    private router: Router){}

  ngOnInit() {
    this.createApplicationForm = this.formBuilder.group({
      responsible: ['', Validators.required],
      url: ['', Validators.required],
      severity: '',
      description: ['', Validators.required],
    });
  }

  addIssue(responsible, url, severity, description ) {
    this.issueService.addIssue(responsible, url, severity, description)
      .subscribe( () => {
        this.router.navigate(['/applications/']);
      });
  }

}
