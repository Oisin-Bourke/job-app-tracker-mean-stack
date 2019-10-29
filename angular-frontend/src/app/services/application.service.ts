import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Application } from "../models/application.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getApplicationsByUser() {
    return this.http.get<Application[]>(`${environment.herokuServer}/applications`);
  }

  getApplication(id) {
    return this.http.get<Application>(`${environment.herokuServer}/applications/${id}`);
  }

  addApplication(application: Application) {
    return this.http.post(`${environment.herokuServer}/applications/create`, application);
  }

  updateApplication(id,application: Application){
    return this.http.put(`${environment.herokuServer}/applications/update/${id}`, application);

  }

  deleteApplication(id){
    return this.http.delete(`${environment.herokuServer}/applications/delete/${id}`);
  }

  addNote(id : number, date, type, body){
    const note = {
      date: date,
      type: type,
      body: body
    };
    return this.http.put(`${environment.herokuServer}/applications/note/${id}`, note );
  }

  deleteNote(id: number){
    return this.http.put(`${environment.herokuServer}/applications/delete/note`,{ _id: id } );
  }

}
