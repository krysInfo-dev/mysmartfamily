import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { TestService } from './test.service';
import { ITest } from '@mysmartfamily/shared-models';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { catchError, of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-test',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit {
  readonly testService = inject(TestService);

  displayedColumns: string[] = ['id', 'content', 'actions'];

  tests = signal<ITest[]>([]);
  totalTests = signal<number | undefined>(0);

  filter = '';
  pageNumber = 0;
  pageSize = 10;

  newTestForm = new FormGroup({
    content: new FormControl('', Validators.required),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private filterSubject = new Subject<string>();

  ngOnInit(): void {
    this.loadTests();
    this.filterSubject
      .pipe(debounceTime(300)) // Réduit la fréquence des appels à 300ms après l'arrêt de la saisie
      .subscribe((filterValue) => {
        this.filter = filterValue;
        this.loadTests();
      });
  }

  loadTests() {
    this.testService
      .readTests(this.filter, this.pageNumber, this.pageSize)
      .pipe(
        catchError((error) => {
          console.error('Error loading tests:', error);
          return of({ count: 0, tests: [] }); // Valeur par défaut en cas d'erreur
        })
      )
      .subscribe((data) => {
        console.dir(data);
        this.totalTests.set(data.count);
        this.tests.set(data.tests || []);
      });
  }

  onFilterChange($event: string) {
    const trimmedValue = $event.trim();
    if (trimmedValue.length >= 1) {
      // N’appliquez qu’une recherche si on a au moins un caractère
      this.filter = trimmedValue;
      this.filterSubject.next(trimmedValue);
    } else {
      console.info('Ignored empty input');
    }
  }

  onPageChange($event: PageEvent) {
    this.pageNumber = $event.pageIndex ? $event.pageIndex : 0;
    this.pageSize = $event.pageSize ? $event.pageSize : 10;
    this.loadTests();
  }

  createTest() {
    if (this.newTestForm.valid) {
      this.testService
        .createTest({ content: this.newTestForm.value.content! })
        .subscribe({
          next: () => {
            this.newTestForm.reset();
            this.loadTests();
          },
        });
    }
  }

  deleteTest(id: number) {
    this.testService.deleteTest(id).subscribe({
      next: () => this.loadTests(),
    });
  }

  clearFilter() {
    this.filter = '';
    this.loadTests();
  }
}
