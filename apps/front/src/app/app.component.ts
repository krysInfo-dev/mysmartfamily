import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { FilesUploaderComponent } from '@mysmartfamily/frontend-files-uploader';
import { EmailsComponent } from './emails/emails.component';

@Component({
  imports: [
    RouterModule,
    TestComponent,
    FilesUploaderComponent,
    EmailsComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
