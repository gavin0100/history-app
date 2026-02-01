import { Component, effect, inject, input, signal } from '@angular/core';
import { Article } from '@app/core/models/article.model';
import { NavigationPath, NavigationSelection } from '@app/core/models/navigation.model';
import { ArticleService } from '@app/core/services/json/article.service';

@Component({
  selector: 'app-article-list-page',
  imports: [],
  templateUrl: './article-list-page.component.html',
  styleUrl: './article-list-page.component.scss'
})
export class ArticleListPageComponent {
  articleService = inject(ArticleService);

  selectedPaths = input<NavigationSelection>({ selectedPaths: [] });

  articles = signal<Article[]>([]);
  isLoading = signal<boolean>(false);

  constructor() {
    // Automatically call getArticles when selectedPaths changes
    effect(() => {
      this.selectedPaths();
      this.getArticles();
    });
  }

  getArticles() {
    console.log("ArticleListPageComponent | getArticles | selectedPaths: ", this.selectedPaths());
    this.isLoading.set(true);
    this.articleService.getArticlesBySelectedPaths(this.selectedPaths().selectedPaths).subscribe({
      next: (articles) => {
        console.log("ArticleListPageComponent | getArticles | articles: ", articles);
        this.articles.set(articles);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error("ArticleListPageComponent | getArticles | error: ", error);
        this.isLoading.set(false);
      }
    });
  }
}
