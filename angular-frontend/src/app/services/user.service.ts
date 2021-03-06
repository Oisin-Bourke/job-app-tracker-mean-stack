import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User){
    return this.http.post(`${environment.herokuServer}/users/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.herokuServer}/users`);
  }

}
