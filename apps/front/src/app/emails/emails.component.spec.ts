import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailsComponent } from './emails.component';
import { provideHttpClient } from '@angular/common/http';

describe('EmailsComponent', () => {
  let component: EmailsComponent;
  let fixture: ComponentFixture<EmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailsComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
