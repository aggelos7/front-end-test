import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackBarService } from 'src/app/services/snackBarService';
import { User } from 'src/app/models/user';
import { AppService } from 'src/app/services/app.service';
import { Helpers } from 'src/app/utilities/helper';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent implements OnInit {
  public selectedUser: User;
  public isNewUser = true;
  public isViewUser = false;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private snackBar: SnackBarService,
      public dialogRef: MatDialogRef<CreateUserDialogComponent>,
      private appService: AppService,
  ) { }

  ngOnInit() {
      if (Helpers.isNotNullOrUndefined(this.data)) {
          this.isNewUser = false;
          this.selectedUser = this.data.user;
          this.isViewUser = (this.data.viewUser) ? true : false;
      } else {
          this.selectedUser = new User();
      }
  }

  public save() {
      if (Helpers.isNullOrEmpty(this.selectedUser.name) ||
      Helpers.isNullOrEmpty(this.selectedUser.email) ||
      Helpers.isNullOrEmpty(this.selectedUser.phone) ||
      Helpers.isNullOrEmpty(this.selectedUser.username) ||
      Helpers.isNullOrEmpty(this.selectedUser.website)) {
          this.snackBar.open('Please fill all required fields');
      } else {
          if (this.isNewUser) {
              this.appService.createUser(this.selectedUser).subscribe(
                  result => {
                      this.snackBar.open('User created successfully!');

                      this.dialogRef.close(result);
                  },
                  error => {
                      this.snackBar.open('Something went wrong. Please try again!');
                  });
          } else {
              this.appService.editUser(this.selectedUser).subscribe(
                  result => {
                      this.snackBar.open('User modified successfully!');

                      this.dialogRef.close(result);
                  },
                  error => {
                      this.snackBar.open('Something went wrong. Please try again!');
                  });
          }
      }
  }
}
