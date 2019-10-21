import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public snackbar: MatSnackBar,
    private zone: NgZone
  ) { }

  showSuccess( message: string): void {
    this.zone.run(() => {
      this.snackbar.open(message,'',
        {
          duration:2000,
          verticalPosition: 'top'
        });
    })
  }

  showError(message: string): void {
    this.snackbar.open(message, 'X',
      {
        duration:2000,
        verticalPosition: 'top'
      });
  }
}
