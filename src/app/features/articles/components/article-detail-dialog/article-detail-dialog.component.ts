import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { Article } from '@app/core/models/article.model';

@Component({
  selector: 'app-article-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    TagModule,
    AvatarModule
  ],
  templateUrl: './article-detail-dialog.component.html',
  styleUrl: './article-detail-dialog.component.scss'
})
export class ArticleDetailDialogComponent {
  visible = input.required<boolean>();
  article = input<Article | null>(null);
  
  visibleChange = output<boolean>();

  isMaximized = signal(true);

  onHide() {
    this.visibleChange.emit(false);
  }

  toggleMaximize() {
    this.isMaximized.set(!this.isMaximized());
  }

  getDialogStyle() {
    if (this.isMaximized()) {
      return { width: '100vw', minHeight: '100vh' };
    }
    return { 
      width: 'clamp(300px, 90vw, 1400px)', minHeight: 'auto'
    };
  }
}