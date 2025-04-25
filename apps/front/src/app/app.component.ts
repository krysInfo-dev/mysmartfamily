import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { FilesUploaderComponent, FilesUploaderConfig } from '@mysmartfamily/frontend-files-uploader';
import { EmailsComponent } from './emails/emails.component';
import { environment } from '../environments/environment';

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
export class AppComponent {
  uploaderConfig: FilesUploaderConfig = {
    allowedTypes: ['image/png', 'image/jpeg', 'application/pdf'],
    maxSizeMB: 5,
    isProduction: environment.production,
    prodBaseUrl: environment.dufsBaseUrl,
  };
}
