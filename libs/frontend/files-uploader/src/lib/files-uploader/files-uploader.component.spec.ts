import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilesUploaderComponent } from './files-uploader.component';
import { provideHttpClient } from '@angular/common/http';

describe('FilesUploaderComponent', () => {
  let component: FilesUploaderComponent;
  let fixture: ComponentFixture<FilesUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesUploaderComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilesUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
