import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApplicationService } from "../../services/application.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {

  createNoteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createNoteForm = this.formBuilder.group({
      date: '',
      type: '',
      body: '',
    });
  }

  addNote(id, date, type, body) {
    this.applicationService.addNote(id, date, type, body)
      .subscribe( () => {
        this.router.navigate(['/applications/']);
      });
  }

}
