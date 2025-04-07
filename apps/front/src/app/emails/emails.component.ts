import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { EmailsService } from './emails.service';

@Component({
  selector: 'app-emails',
  imports: [ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule],
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.css',
})
export class EmailsComponent {

  emailForm: FormGroup;
  attachments: File[] = [];
  useTemplate = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private emailsService: EmailsService
  ) {
    this.emailForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      senderName: [''],
      senderEmail: [''],
      htmlContent: [''],
      templateId: [''],
      params: this.fb.array([]),
    });
  }

  get params(): FormArray {
    return this.emailForm.get('params') as FormArray;
  }

  addParam() {
    this.params.push(this.fb.group({ key: [''], value: [''] }));
  }

  removeParam(index: number) {
    this.params.removeAt(index);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.attachments = Array.from(input.files);
    }
  }

  toggleTemplateUse() {
    this.useTemplate.set(!this.useTemplate());
    if (this.useTemplate()) {
      this.emailForm.get('htmlContent')?.disable();
      this.emailForm.get('templateId')?.enable();
    } else {
      this.emailForm.get('htmlContent')?.enable();
      this.emailForm.get('templateId')?.disable();
    }
  }

  sendEmail() {
    const formData = new FormData();
    Object.entries(this.emailForm.getRawValue()).forEach(([key, value]) => {
      if (key === 'params') {
        const paramsObj: Record<string, any> = {};
        for (const p of value as any[]) {
          if (p.key) {
            paramsObj[p.key] = p.value;
          }
        }
        formData.append('params', JSON.stringify(paramsObj));
      } else {
        formData.append(key, value as string);
      }
    });

    for (const file of this.attachments) {
      formData.append('attachments', file);
    }

    this.emailsService.sendTransactionalEmail(formData).subscribe({
      next: () => alert('Email envoyé avec succès !'),
      error: err => alert('Erreur à l’envoi : ' + err.message)
    });
  }

}
