import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountryService } from '../../../../core/services/country.service';
import { Country, CountrySearchResult } from '../../../../core/models/country.model';
import { debounceTime, delay, exhaustMap, map, mergeMap, of, Subject, switchMap, takeUntil, tap, toArray } from 'rxjs';
import { transformName$, transformNames$ } from '@app/core/utils/transform.utils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'test-and-learn-page',
  imports: [FormsModule],
  templateUrl: './test-and-learn.component.html',
  styleUrl: './test-and-learn.component.scss'
})
export class ArticleListPageComponent implements OnInit, OnDestroy {
  countries: Country[] = [];
  loading: boolean = false;
  error: string = '';

  // Updated type for search results
  searchResults: CountrySearchResult[] = [];
  searchLoading: boolean = false;
  searchError: string = '';
  searchQuery: string = '';

  // third panel
  thirdCountryNames: string[] = [];
  thirdCountries: Country[] = [];
  thirdLoading: boolean = false;
  thirdError: string = '';

  // Fourth panel - debounceTime demo
  fourthSearchInput$ = new Subject<string>();
  fourthSearchQuery: string = '';
  fourthResults: CountrySearchResult[] = [];
  fourthLoading: boolean = false;
  fourthError: string = '';
  apiCallCount: number = 0;
  private destroy$ = new Subject<void>();

  constructor(private countryService: CountryService) { }
  ngOnInit(): void {
    console.log('ArticleListPageComponent initialized');
    this.loadCountries();
    this.setupDebounceSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

          this.updateThirdCountries(this.countries);

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

  triggerUpdate(): void {
    console.log('🔵 Button clicked - Starting update...');
    this.thirdLoading = true;
    this.updateThirdCountries(this.countries);
  }

  updateThirdCountries(countries: Country[]): void {
    of(countries).pipe(
      map(countries => countries.slice(0, 10)),
      map(countries => countries.map(country => ({
        ...country,
        name: country.name.toUpperCase()
      }))),
      tap(countries => console.log("countries length: ", countries.length)),
      switchMap(countries => transformNames$(countries)),
      tap(countries => console.log("countries length: ", countries.length, " | countries: ", countries)),
      mergeMap(countries => countries),
      mergeMap(country => of(country).pipe(
        switchMap(country => transformName$(country)),
        map(country => ({
          ...country,
          code: Math.random().toString(36).substring(0, 5)
        })),
      )),
      toArray(),
    ).subscribe({
      next: (countries) => {
        this.thirdCountries = countries;
        this.thirdLoading = false;
        this.thirdError = '';
      }
    });
  }

  setupDebounceSearch(): void {
    this.fourthSearchInput$.pipe(
      tap(value => console.log(`Typed: "${value}"`)),
      debounceTime(500),
      tap(value => {
        this.apiCallCount++;
        console.log(`API Call #${this.apiCallCount}: "${value}"`);
      }),
      switchMap(searchValue => {
        if (searchValue.trim()) {
          this.fourthLoading = true;
          return this.countryService.searchCountries(searchValue);
        }
        return of({ results: [] });
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.fourthResults = response.results;
        this.fourthLoading = false;
      },
      error: (err) => {
        this.fourthError = 'Failed to search';
        this.fourthLoading = false;
      }
    });
  }

  onFourthSearchInput(value: string): void {
    this.fourthSearchQuery = value;
    this.fourthSearchInput$.next(value);
  }
}
