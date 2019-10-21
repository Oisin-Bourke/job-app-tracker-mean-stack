import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    /*
    // If user already logged in
    if(this.authenticationService.currentUserValue){
      const user = this.authenticationService.currentUserValue;
      // Go to Admin page if admin user is 'true'
      if(user.admin===true){
        this.router.navigate(['/users']);
      }
      if(user.admin===false){
        this.router.navigate(['/issues']);
      }
    }
     */
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(username, password) {
    this.authenticationService.login( username, password)
      .pipe(first())
      .subscribe(
        data => {
          /* Go to Admin page if admin user is 'true'*/
          if(data.admin===true){
            this.router.navigate(['/users']);
          }
          if(data.admin==false) {
            this.router.navigate(['/issues']);
          }
        },
        error => {
          this.notificationService.showError(error);
          this.loginForm.reset();
        });
  }

}
