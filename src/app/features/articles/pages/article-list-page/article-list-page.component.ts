import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../../../core/services/country.service';

@Component({
  selector: 'app-article-list-page',
  imports: [CommonModule],
  templateUrl: './article-list-page.component.html',
  styleUrl: './article-list-page.component.scss'
})
export class ArticleListPageComponent implements OnInit{
  countries: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private countryService: CountryService) { }
  ngOnInit(): void {
    console.log('ArticleListPageComponent initialized');
    this.loadCountries();
  }

  loadCountries(): void {
    this.loading = true;
    this.countryService.getListCountries().subscribe({
      next: (response) => {
        this.countries = response.countries;
        this.loading = false;
        console.log('Countries loaded:', response);
      },
      error: (err) => {
        this.error = 'Failed to load countries';
        this.loading = false;
        console.error('Error loading countries:', err);
      }
    });
  }
}
