import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../services/app.service';
import { User } from '../models/user';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialog } from '@angular/material';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { Helpers } from '../utilities/helper';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'username', 'website', 'buttons'];
  dataSource: MatTableDataSource<User>;
  public newUser: User;
  public modifiedUser: User;
  public deletedUser: number;

  @BlockUI('homePageContainer') homePageContainerBlock: NgBlockUI;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: AppService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.fetchUsersData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public createUserDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newUser = result;
        this.fetchUsersData();
      }
    });
  }

  // use of Material Dialog for Create/Edit/View/Delete User
  public editUserDialog(user: User) {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '500px',
      data: {
        user: user
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.modifiedUser = result;
        this.fetchUsersData();
      }
    });
  }

  public viewUserDialog(user: User) {
    this.dialog.open(CreateUserDialogComponent, {
      width: '500px',
      data: {
        user: user,
        viewUser: true
      }
    });
  }

  public deleteUserDialog(user: User) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '500px',
      data: {
        user: user
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletedUser = result;
        this.fetchUsersData();
      }
    });
  }

  private fetchUsersData(): void {
    this.homePageContainerBlock.start('Loaging...');
    this.service.getHomeData().subscribe((result: any) => {
      // after creating new user object, we push it in list of data for presentation purposes
      if (Helpers.isNotNullOrUndefined(this.newUser)) {
        result.push(this.newUser);
      }
      // after modifying a user object, we replace it in list of data for presentation purposes
      if (Helpers.isNotNullOrUndefined(this.modifiedUser)) {
        const foundIndex = result.findIndex(x => x.id == this.modifiedUser.id);
        result[foundIndex] = this.modifiedUser;
      }
      // after deleting a user object, we remove it from list of data for presentation purposes
      if (Helpers.isNotNullOrUndefined(this.deletedUser)) {
        result.splice(result.findIndex(({ id }) => id === this.deletedUser), 1);
      }
      this.dataSource.data = result;
      this.homePageContainerBlock.stop();
    });
  }
}

