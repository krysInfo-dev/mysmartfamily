import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesUploaderService } from './files-uploader.service';
import { HttpEventType } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'lib-files-uploader',
  imports: [CommonModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './files-uploader.component.html',
  styleUrl: './files-uploader.component.css',
})
export class FilesUploaderComponent {
  readonly filesUploaderService = inject(FilesUploaderService);

  allowedTypes = ['image/png', 'image/jpeg', 'application/pdf']; // À adapter
  maxSizeMB = 5;
  selectedFiles: File[] = [];
  uploadProgress = 0;
  uploadMessage = '';

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      const files = input.files;
      console.log(files);
      this.filesSelected(files);
    }
  }

  filesSelected(files: FileList | null): void {
    this.reset();
    if (!files) return;

    const validFiles = Array.from(files).filter(file => {
      return this.allowedTypes.includes(file.type) && file.size <= this.maxSizeMB * 1024 * 1024;
    });

    if (validFiles.length < files.length) {
      this.uploadMessage = 'Certains fichiers ont été ignorés (type ou taille invalide)';
    }

    this.selectedFiles = validFiles;
  }

  upload(): void {
    if (!this.selectedFiles.length) return;

    const uploadObservables = this.selectedFiles.map((file) =>
      this.filesUploaderService.uploadFile(file)
    );

    this.uploadMessage = '';
    this.uploadProgress = 0;

    // Pour chaque fichier on lance l’upload
    uploadObservables.forEach((obs) => {
      obs.subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round(
              (event.loaded / event.total) * 100
            );
          } else if (event.type === HttpEventType.Response) {
            this.uploadMessage = 'Upload terminé !';
            this.selectedFiles = [];
            this.uploadProgress = 0;
          }
        },
        error: () => {
          this.uploadMessage = "Erreur lors de l'upload.";
        },
      });
    });
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    this.filesSelected(files || null);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private reset() {
    this.uploadMessage = '';
    this.uploadProgress = 0;
  }

}
