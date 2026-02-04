import { Component, effect, inject, input, signal } from '@angular/core';
import { Article } from '@app/core/models/article.model';
import { NavigationPath, NavigationSelection } from '@app/core/models/navigation.model';
import { ArticleService } from '@app/core/services/json/article.service';
import { ArticleDetailDialogComponent } from '../../components/article-detail-dialog/article-detail-dialog.component';

@Component({
  selector: 'app-article-list-page',
  imports: [ArticleDetailDialogComponent],
  templateUrl: './article-list-page.component.html',
  styleUrl: './article-list-page.component.scss'
})
export class ArticleListPageComponent {
  articleService = inject(ArticleService);

  selectedPaths = input<NavigationSelection>({ selectedPaths: [] });

  articles = signal<Article[]>([]);
  isLoading = signal<boolean>(false);

  showDialog = signal<boolean>(false);
  selectedArticle = signal<Article | null>(null);

  constructor() {
    // Automatically call getArticles when selectedPaths changes
    effect(() => {
      this.selectedPaths();
      this.getArticles();
    });
  }

  getArticles() {
    this.isLoading.set(true);
    this.articleService.getArticlesBySelectedPaths(this.selectedPaths().selectedPaths).subscribe({
      next: (articles) => {
        this.articles.set(articles);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error("ArticleListPageComponent | getArticles | error: ", error);
        this.isLoading.set(false);
      }
    });
  }

  // Add method to open dialog
  openArticleDetail(article: Article) {
    this.selectedArticle.set(article);
    this.showDialog.set(true);
  }

  // Add method to close dialog
  onDialogHide() {
    this.showDialog.set(false);
    // Optional: clear selected article after animation completes
    setTimeout(() => {
      if (!this.showDialog()) {
        this.selectedArticle.set(null);
      }
    }, 300);
  }
}
