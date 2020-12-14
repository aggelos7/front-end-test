import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from 'src/app/services/app.service';
import { SnackBarService } from 'src/app/services/snackBarService';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {

  constructor(
    private snackBar: SnackBarService,
    private appService: AppService,
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
  }

  public deleteUser() {
    this.appService.deleteUser(this.data.user).subscribe(
      result => {
          this.snackBar.open('User deleted successfully!');
          this.dialogRef.close(this.data.user.id);
      },
      error => {
          this.snackBar.open('Something went wrong. Please try again!');
      });
  }

}
