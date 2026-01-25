import { Component, model, signal, Output, EventEmitter, OnInit, inject, output, input } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { MessageService, TreeNode } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { PopoverModule } from 'primeng/popover';
import { TooltipModule } from 'primeng/tooltip';
import {
  Country,
  Industry,
  SubIndustry,
  TimeRange,
  NavigationPath,
  NavigationSelection,
  NavigationTree
} from '../../core/models/navigation.model';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { transformNames$ } from '@app/core/utils/transform.utils';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    DrawerModule,
    ButtonModule,
    RippleModule,
    StyleClassModule,
    CommonModule,
    TreeModule,
    BadgeModule,
    ChipModule,
    ToastModule,
    PopoverModule,
    TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.loadNavigationData();
  }
  // visible = model<boolean>(false);
  visible = input<boolean>(false);
  visibleChange = output<boolean>();

  // Selected navigation paths (multi-selection)
  selectedPaths = signal<NavigationPath[]>([]);

  // Output event when selection changes
  // @Output() selectionChanged = new EventEmitter<NavigationSelection>();
  selectionChanged = output<NavigationSelection>();

  countries = signal<Country[]>([]);
  expandedCountries = signal<Set<string>>(new Set());
  expandedIndustries = signal<Set<string>>(new Set());
  expandedSubIndustries = signal<Set<string>>(new Set());

  private loadNavigationData(): void {
    this.http.get<NavigationTree>('assets/navigation-mock.json')
      .pipe(
        switchMap(navTree => {
          // Transform country names
          return transformNames$(navTree.countries).pipe(
            switchMap(transformedCountries => {
              // Extract only country-level data
              const countriesOnly: Country[] = transformedCountries.map(country => ({
                id: country.id,
                name: country.name,
                code: country.code,
                slug: country.slug,
                icon: country.icon,
                articleCount: country.articleCount,
                industries: [], // Empty initially
                isLoaded: false,
                isLoading: false
              }));

              return transformNames$(countriesOnly);
            })
          );
        })
      )
      .subscribe({
        next: (countries) => {
          this.countries.set(countries);
          console.log('Navigation data loaded and transformed:', countries);
        },
        error: (error) => {
          console.error('Error loading navigation data:', error);
          // Fallback to empty array on error
          this.countries.set([]);
        }
      });
  }

  private transformSingleName(name: string): string {
    const upperName = name.toUpperCase();
    return upperName.includes('123')
      ? upperName.replaceAll('123', '456')
      : upperName + '123';
  }

  /**
   * Toggle selection of a complete path
   */
  togglePathSelection(country: Country, industry: Industry, subIndustry: SubIndustry, timeRange: TimeRange): void {
    const path: NavigationPath = {
      country: {
        id: country.id,
        name: country.name,
        slug: country.slug
      },
      industry: {
        id: industry.id,
        name: industry.name,
        slug: industry.slug
      },
      subIndustry: {
        id: subIndustry.id,
        name: subIndustry.name,
        slug: subIndustry.slug
      },
      timeRange: {
        id: timeRange.id,
        label: timeRange.label,
        startYear: timeRange.startYear,
        endYear: timeRange.endYear
      }
    };

    const currentPaths = this.selectedPaths();
    const existingIndex = currentPaths.findIndex(p =>
      p.country.id === path.country.id &&
      p.industry.id === path.industry.id &&
      p.subIndustry.id === path.subIndustry.id &&
      p.timeRange.id === path.timeRange.id
    );

    if (existingIndex >= 0) {
      // Remove if already selected
      currentPaths.splice(existingIndex, 1);
    } else {
      // Check if we've reached the maximum of 3 paths
      if (currentPaths.length >= 3) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Selection Limit Reached',
          detail: 'You can only select up to 3 filters at a time. Please remove one to add another.',
          life: 2000
        });
        return;
      }
      // Add new selection
      currentPaths.push(path);
    }

    this.selectedPaths.set([...currentPaths]);
  }

  /**
   * Check if a path is selected
   */
  isPathSelected(country: Country, industry: Industry, subIndustry: SubIndustry, timeRange: TimeRange): boolean {
    return this.selectedPaths().some(p =>
      p.country.id === country.id &&
      p.industry.id === industry.id &&
      p.subIndustry.id === subIndustry.id &&
      p.timeRange.id === timeRange.id
    );
  }

  /**
   * Remove a selected path by index
   */
  removeSelectedPath(index: number): void {
    const currentPaths = this.selectedPaths();
    currentPaths.splice(index, 1);
    this.selectedPaths.set([...currentPaths]);
    this.emitSelectionChange();
  }

  /**
   * Clear all selections
   */
  clearAllSelections(): void {
    this.selectedPaths.set([]);
    this.emitSelectionChange();
  }

  /**
   * Emit selection change event
   */
  public emitSelectionChange(): void {
    this.selectionChanged.emit({
      selectedPaths: this.selectedPaths()
    });
  }

  applyFilters(): void {
    this.emitSelectionChange();
    // this.visible.set(false);
    this.visibleChange.emit(false);
  }

  /**
   * Get display text for a selected path
   */
  getPathDisplayText(path: NavigationPath): string {
    return `${path.country.name} → ${path.industry.name} → ${path.subIndustry.name} (${path.timeRange.label})`;
  }

  loadIndustries(country: Country): void {
    // Skip if already loaded or loading
    if (country.isLoaded || country.isLoading) {
      return;
    }

    // Set loading state
    country.isLoading = true;
    this.countries.set([...this.countries()]);

    // Simulate API call - replace with your actual API endpoint
    // Example: this.http.get<Industry[]>(`/api/countries/${country.id}/industries`)
    this.http.get<NavigationTree>('assets/navigation-mock.json')
      .subscribe({
        next: (navTree) => {
          const fullCountry = navTree.countries.find(c => c.id === country.id);
          if (fullCountry) {
            // Extract industries without nested data
            country.industries = fullCountry.industries.map(industry => ({
              id: industry.id,
              name: this.transformSingleName(industry.name),
              slug: industry.slug,
              icon: industry.icon,
              articleCount: industry.articleCount,
              subIndustries: [], // Empty initially
              isLoaded: false,
              isLoading: false
            }));
            country.isLoaded = true;
          }
          country.isLoading = false;
          this.countries.set([...this.countries()]);
        },
        error: (error) => {
          console.error('Error loading industries:', error);
          country.isLoading = false;
          this.countries.set([...this.countries()]);
        }
      });
  }

  /**
   * Load sub-industries for a specific industry
   */
  loadSubIndustries(country: Country, industry: Industry): void {
    // Skip if already loaded or loading
    if (industry.isLoaded || industry.isLoading) {
      return;
    }

    // Set loading state
    industry.isLoading = true;
    this.countries.set([...this.countries()]);

    // Simulate API call - replace with your actual API endpoint
    // Example: this.http.get<SubIndustry[]>(`/api/countries/${country.id}/industries/${industry.id}/sub-industries`)
    this.http.get<NavigationTree>('assets/navigation-mock.json')
      .subscribe({
        next: (navTree) => {
          const fullCountry = navTree.countries.find(c => c.id === country.id);
          const fullIndustry = fullCountry?.industries.find(i => i.id === industry.id);

          if (fullIndustry) {
            // Extract sub-industries without time ranges
            industry.subIndustries = fullIndustry.subIndustries.map(subIndustry => ({
              id: subIndustry.id,
              name: this.transformSingleName(subIndustry.name),
              slug: subIndustry.slug,
              icon: subIndustry.icon,
              articleCount: subIndustry.articleCount,
              timeRanges: [], // Empty initially
              isLoaded: false,
              isLoading: false
            }));
            industry.isLoaded = true;
          }
          industry.isLoading = false;
          this.countries.set([...this.countries()]);
        },
        error: (error) => {
          console.error('Error loading sub-industries:', error);
          industry.isLoading = false;
          this.countries.set([...this.countries()]);
        }
      });
  }

  /**
   * Load time ranges for a specific sub-industry
   */
  loadTimeRanges(country: Country, industry: Industry, subIndustry: SubIndustry): void {
    // Skip if already loaded or loading
    if (subIndustry.isLoaded || subIndustry.isLoading) {
      return;
    }

    // Set loading state
    subIndustry.isLoading = true;
    this.countries.set([...this.countries()]);

    // Simulate API call - replace with your actual API endpoint
    // Example: this.http.get<TimeRange[]>(`/api/countries/${country.id}/industries/${industry.id}/sub-industries/${subIndustry.id}/time-ranges`)
    this.http.get<NavigationTree>('assets/navigation-mock.json')
      .subscribe({
        next: (navTree) => {
          const fullCountry = navTree.countries.find(c => c.id === country.id);
          const fullIndustry = fullCountry?.industries.find(i => i.id === industry.id);
          const fullSubIndustry = fullIndustry?.subIndustries.find(si => si.id === subIndustry.id);

          if (fullSubIndustry) {
            subIndustry.timeRanges = fullSubIndustry.timeRanges;
            subIndustry.isLoaded = true;
          }
          subIndustry.isLoading = false;
          this.countries.set([...this.countries()]);
        },
        error: (error) => {
          console.error('Error loading time ranges:', error);
          subIndustry.isLoading = false;
          this.countries.set([...this.countries()]);
        }
      });
  }

  /**
   * Toggle country expansion and load industries
   */
  isShowPopover: boolean = false;
  togglePopover(): void {
    this.isShowPopover = !this.isShowPopover;
  }
  toggleCountry(country: Country): void {
    const expanded = this.expandedCountries();
    if (expanded.has(country.id)) {
      expanded.delete(country.id);
    } else {
      expanded.add(country.id);
      // Load industries when expanding
      if (!country.isLoaded && !country.isLoading) {
        this.loadIndustries(country);
      }
    }
    this.expandedCountries.set(new Set(expanded));
  }

  /**
   * Toggle industry expansion and load sub-industries
   */
  toggleIndustry(country: Country, industry: Industry): void {
    const expanded = this.expandedIndustries();
    const key = `${country.id}-${industry.id}`;
    if (expanded.has(key)) {
      expanded.delete(key);
    } else {
      expanded.add(key);
      // Load sub-industries when expanding
      if (!industry.isLoaded && !industry.isLoading) {
        this.loadSubIndustries(country, industry);
      }
    }
    this.expandedIndustries.set(new Set(expanded));
  }

  /**
   * Toggle sub-industry expansion and load time ranges
   */
  toggleSubIndustry(country: Country, industry: Industry, subIndustry: SubIndustry): void {
    const expanded = this.expandedSubIndustries();
    const key = `${country.id}-${industry.id}-${subIndustry.id}`;
    if (expanded.has(key)) {
      expanded.delete(key);
    } else {
      expanded.add(key);
      // Load time ranges when expanding
      if (!subIndustry.isLoaded && !subIndustry.isLoading) {
        this.loadTimeRanges(country, industry, subIndustry);
      }
    }
    this.expandedSubIndustries.set(new Set(expanded));
  }

  /**
   * Check if country is expanded
   */
  isCountryExpanded(countryId: string): boolean {
    return this.expandedCountries().has(countryId);
  }

  /**
   * Check if industry is expanded
   */
  isIndustryExpanded(countryId: string, industryId: string): boolean {
    return this.expandedIndustries().has(`${countryId}-${industryId}`);
  }

  /**
   * Check if sub-industry is expanded
   */
  isSubIndustryExpanded(countryId: string, industryId: string, subIndustryId: string): boolean {
    return this.expandedSubIndustries().has(`${countryId}-${industryId}-${subIndustryId}`);
  }
}