import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication.service";
import { UserService } from "../../services/user.service";
import { first } from "rxjs/operators";
import { NotificationService } from "../../services/notification.service";
import { Router } from "@angular/router";
import { MustMatch } from "./password-match.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
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
        this.router.navigate(['/applications']);
      }
    }
     */
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: '',
    },{
      validator: MustMatch('password','confirmPassword')
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.notificationService.showSuccess('Registration successful');
          this.router.navigate(['/login']);
        },
        error => {
          this.notificationService.showError(error);

          this.registerForm.controls.email.reset();
          this.registerForm.controls.username.reset();
        });
  }

}
