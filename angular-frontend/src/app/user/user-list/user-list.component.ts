import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users = [];
  displayedColumns = ['createdDate','username','firstName', 'lastName', 'email'];

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
    this.fetchUsers();
  }

  private fetchUsers(){
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

}
