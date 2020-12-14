import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BlockUIModule } from 'ng-block-ui';
import { FormsModule } from '@angular/forms';
import {
  MatSidenavModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateUserDialogComponent } from './homepage/create-user-dialog/create-user-dialog.component';
import { DeleteUserDialogComponent } from './homepage/delete-user-dialog/delete-user-dialog.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InternalDataService } from './internal-data/internalDataService';
import { AppLoadingGifComponent } from './shared/app-loading-gif/app-loading-gif.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    ContactMeComponent,
    LoginComponent,
    CreateUserDialogComponent,
    DeleteUserDialogComponent,
    AppLoadingGifComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    BlockUIModule.forRoot(),
    InMemoryWebApiModule.forRoot(InternalDataService, {
      delay: 0,
      passThruUnknownUrl: true
  }),
  ],
  entryComponents: [
    CreateUserDialogComponent,
    DeleteUserDialogComponent
  ],
  exports: [MatSnackBarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
