import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IssueService} from "../../services/issue.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent implements OnInit {

  createIssueForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private router: Router){}

  ngOnInit() {
    this.createIssueForm = this.formBuilder.group({
      responsible: ['', Validators.required],
      url: ['', Validators.required],
      severity: '',
      description: ['', Validators.required],
    });
  }

  addIssue(responsible, url, severity, description ) {
    this.issueService.addIssue(responsible, url, severity, description)
      .subscribe( () => {
        this.router.navigate(['/issues/']);
      });
  }

}
