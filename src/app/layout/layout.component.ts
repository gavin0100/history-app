import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ArticleListPageComponent } from "@app/features/articles/pages/article-list-page/article-list-page.component";
import { NavigationSelection } from '../core/models/navigation.model';
import { ArticleFilterBuilder } from '../core/models/filter.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, ArticleListPageComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  sidebarVisible = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  onFilterChange(selection: NavigationSelection) {
    const filter = ArticleFilterBuilder.fromNavigationPaths(selection.selectedPaths);
    // Use filter to fetch articles
    // this.articleService.getArticles(filter).subscribe(/* ... */);
    console.log("LayoutComponent | onFilterChange | result: ", filter);
  }
}
