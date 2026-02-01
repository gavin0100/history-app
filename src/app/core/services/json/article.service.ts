import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ArticleNotFoundException } from "@app/core/exceptions/article.exception";
import { Article } from "@app/core/models/article.model";
import { NavigationPath } from "@app/core/models/navigation.model";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private http = inject(HttpClient);
    getArticles(): Observable<Article[]> {
        return this.http.get<Article[]>('assets/article-mock.json');
    }

    getArticlesBySelectedPath(selectedPath: NavigationPath): Observable<Article>{
        return this.getArticles().pipe(
            map(articles => {
                const article = articles.find(article => this.isSelectedArticle(article, selectedPath));
                if (!article) {
                    throw new ArticleNotFoundException("Article not found for the selected path");
                }
                return article;
            })
        );
    }

    getArticlesBySelectedPaths(selectedPaths: NavigationPath[]): Observable<Article[]>{
        return this.getArticles().pipe(
            map(articles => articles.filter(
                article => selectedPaths.some(path => this.isSelectedArticle(article, path))
            ))
        );
    }

    private isSelectedArticle(article: Article, selectedPath: NavigationPath): boolean {
        return selectedPath.country.id === article.classification.country.id &&
            selectedPath.industry.id === article.classification.industry.id &&
            selectedPath.subIndustry.id === article.classification.subIndustry.id &&
            selectedPath.timeRange.id === article.classification.timeRange.id;
    }
}