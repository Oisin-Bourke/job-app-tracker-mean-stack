import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Issue } from "../models/issue.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }

  getIssuesByUser() {
    return this.http.get<Issue[]>(`${environment.localApiUrl}/issues`);
  }

  addIssue(responsible, url, severity, description) {
    const issue = {
      responsible: responsible,
      url: url,
      severity: severity,
      description: description
    };
    return this.http.post(`${environment.localApiUrl}/issues/create`, issue);
  }


}
