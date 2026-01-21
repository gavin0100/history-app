import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../../../core/services/country.service';
import { Country, CountrySearchResult } from '../../../../core/models/country.model';

@Component({
  selector: 'app-article-list-page',
  imports: [],
  templateUrl: './article-list-page.component.html',
  styleUrl: './article-list-page.component.scss'
})
export class ArticleListPageComponent implements OnInit {
  countries: Country[] = [];
  loading: boolean = false;
  error: string = '';

  // Updated type for search results
  searchResults: CountrySearchResult[] = [];
  searchLoading: boolean = false;
  searchError: string = '';
  searchQuery: string = '';

  constructor(private countryService: CountryService) { }
  ngOnInit(): void {
    console.log('ArticleListPageComponent initialized');
    this.loadCountries();
  }

  loadCountries(): void {
    this.loading = true;
    this.countryService.getListCountries().subscribe({
      next: (response) => {
        setTimeout(() => {
          this.countries = response.countries;
          this.loading = false;
          console.log('Countries loaded:', response);

          // Check for countries starting with "vi"
          this.checkAndSearchAnCountries();
        }, 3000);
      },
      error: (err) => {
        this.error = 'Failed to load countries';
        this.loading = false;
        console.error('Error loading countries:', err);
      }
    });
  }

  checkAndSearchAnCountries(): void {
    // Find countries whose name starts with "vi" (case-insensitive)
    const anCountry = this.countries.find(country => 
      country.name.toLowerCase().startsWith("an")
    );

    if (anCountry) {
      console.log('Found country starting with "vi":', anCountry.name);
      this.searchCountry(anCountry.name);
    } else {
      console.log('No country found starting with "vi"');
    }
  }

  searchCountry(countryName: string): void {
    this.searchLoading = true;
    this.searchError = '';
    this.searchQuery = countryName;
    
    this.countryService.searchCountries(countryName).subscribe({
      next: (response) => {
        this.searchResults = response.results;
        this.searchLoading = false;
        console.log('Search results for', countryName, ':', response);
      },
      error: (err) => {
        this.searchError = 'Failed to search countries';
        this.searchLoading = false;
        console.error('Error searching countries:', err);
      }
    });
  }
}
