import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';

@Component({
  imports: [ RouterModule, TestComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
