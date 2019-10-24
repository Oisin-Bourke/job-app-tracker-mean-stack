import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ApplicationService } from "../../services/application.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {
  addNoteForm: FormGroup;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.addNoteForm = this.formBuilder.group({
      date: new FormControl(new Date()),
      type: '',
      body: '',
    });

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

    onSubmit() {
      this.applicationService.addNote(this.id, this.addNoteForm.value.date, this.addNoteForm.value.type, this.addNoteForm.value.body)
        .subscribe(() => {
          this.router.navigate(['/applications/']);
        });
    }

    navigateBack(){
      this.location.back();
    }

}
