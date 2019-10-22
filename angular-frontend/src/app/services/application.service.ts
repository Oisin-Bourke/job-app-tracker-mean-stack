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
    return this.http.get<Application[]>(`${environment.localApiUrl}/applications`);
  }

  addIssue(responsible, url, severity, description) {
    const issue = {
      responsible: responsible,
      url: url,
      severity: severity,
      description: description
    };
    return this.http.post(`${environment.localApiUrl}/applications/create`, issue);
  }

  addNote(id : number, date, type, body){

    const note = {
      date: date,
      type: type,
      body: body
    };

    return this.http.put(`${environment.localApiUrl}/applications/note/${id}`, note );
  }


}
