import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApplicationService} from "../../services/application.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-issue-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit {

  createApplicationForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router,
    private location: Location
  ){}

  ngOnInit() {
    this.createApplicationForm = this.formBuilder.group({
      appDate: new FormControl(new Date()),
      jobTitle: '',
      company: '',
      location: '',
      email: ['', [Validators.email]],
      telephone: ''
    });
  }

  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.createApplicationForm.invalid) {
      return;
    }

    this.loading = true;

    this.applicationService.addApplication(this.createApplicationForm.value)
      .subscribe(() => {
        this.router.navigate(['/applications/']);
      });
  }

  navigateBack(){
    this.location.back();
  }


}
