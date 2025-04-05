import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { FilesUploaderComponent } from '@mysmartfamily/frontend-files-uploader';

@Component({
  imports: [RouterModule, TestComponent, FilesUploaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
