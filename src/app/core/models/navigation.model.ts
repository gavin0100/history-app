/**
* Hierarchical navigation structure:
* Country → Industry → Sub-Industry → Time Range → Articles
*/

/**
* Time range for articles
*/
export interface TimeRange {
    id: string;
    label: string;           // e.g., "1945-1950"
    startYear: number;
    endYear: number;
    articleCount?: number;   // Number of articles in this range
}

/**
* Sub-Industry (e.g., Chicken Farming, Steel Production)
*/
export interface SubIndustry {
    id: string;
    name: string;
    slug: string;            // e.g., "chicken-farming"
    icon?: string;
    timeRanges: TimeRange[];
    articleCount?: number;   // Total articles across all time ranges
    // Add these properties:
    isLoaded?: boolean;
    isLoading?: boolean;
}

/**
* Industry (e.g., Livestock Industry, Metallurgical Industry)
*/
export interface Industry {
    id: string;
    name: string;
    slug: string;            // e.g., "livestock-industry"
    icon?: string;
    subIndustries: SubIndustry[];
    articleCount?: number;   // Total articles across all sub-industries
    isLoaded?: boolean;
    isLoading?: boolean;
}

/**
* Country (e.g., Vietnam, America)
*/
export interface Country {
    id: string;
    name: string;
    code: string;            // e.g., "VN", "US"
    slug: string;            // e.g., "viet-nam", "america"
    icon?: string;
    industries: Industry[];
    articleCount?: number;   // Total articles for this country
    isLoaded?: boolean;
    isLoading?: boolean;
}

/**
* Complete navigation tree structure
*/
export interface NavigationTree {
    version: string;
    lastUpdated: string;
    countries: Country[];
}

/**
* Single selected path in navigation
* Represents: Country → Industry → Sub-Industry → Time Range
*/
export interface NavigationPath {
    country: {
        id: string;
        name: string;
        slug: string;
    };
    industry: {
        id: string;
        name: string;
        slug: string;
    };
    subIndustry: {
        id: string;
        name: string;
        slug: string;
    };
    timeRange: {
        id: string;
        label: string;
        startYear: number;
        endYear: number;
    };
}

/**
* Multiple selected paths for filtering
* User can select multiple combinations like:
* - Vietnam → Livestock → Chicken Farming → 1945-1950
* - America → Metallurgical → Steel Production → 1960-1970
*/
export interface NavigationSelection {
    selectedPaths: NavigationPath[];
}

/**
* Breadcrumb item for showing navigation path
*/
export interface BreadcrumbItem {
    label: string;
    level: 'country' | 'industry' | 'sub-industry' | 'time-range';
    route?: string;
}

/**
* Expanded state for navigation tree UI
*/
export interface NavigationState {
    expandedCountries: Set<string>;      // Country IDs
    expandedIndustries: Set<string>;     // Industry IDs
    expandedSubIndustries: Set<string>;  // Sub-Industry IDs
    selectedPaths: NavigationPath[];     // Currently selected paths
}