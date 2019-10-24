import { Component, OnInit } from '@angular/core';
import { ApplicationService } from "../../services/application.service";
import { ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { Application } from "../../models/application.model";

@Component({
  selector: 'app-issue-update',
  templateUrl: './application-update.component.html',
  styleUrls: ['./application-update.component.css']
})
export class ApplicationUpdateComponent implements OnInit {
  updateApplicationForm : FormGroup;
  id : any;
  application : Application;
  submitted = false;

  constructor(
    private applicationService : ApplicationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location : Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.generateForm();
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchFormValues(this.id);
  }

  generateForm(){
    this.updateApplicationForm = this.formBuilder.group({
      appDate: new FormControl(new Date()),
      jobTitle: '',
      company: '',
      location: '',
      email: ['', [Validators.email]],
      telephone: '',
      status: ''
    })
  }

  fetchFormValues(id){
    this.applicationService.getApplication(id).subscribe( res => {
      this.application = res;
      this.updateApplicationForm.get('appDate').setValue(this.application.appDate);
      this.updateApplicationForm.get('jobTitle').setValue(this.application.jobTitle);
      this.updateApplicationForm.get('company').setValue(this.application.company);
      this.updateApplicationForm.get('location').setValue(this.application.location);
      this.updateApplicationForm.get('email').setValue(this.application.email);
      this.updateApplicationForm.get('telephone').setValue(this.application.telephone);
      this.updateApplicationForm.get('status').setValue(this.application.status);
    });
  }

  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.updateApplicationForm.invalid) {
      return;
    }

    this.applicationService.updateApplication(this.id,this.updateApplicationForm.value)
      .subscribe(() => {
      this.router.navigate(['/applications/']);
    });
  }

  navigateBack(){
    this.location.back();
  }

}
