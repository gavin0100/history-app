export interface Coordinates {
    north: number;
    south: number;
    east: number;
    west: number;
}

export interface Country {
    code: string;
    name: string;
    capitalCity: string;
    continent: string;
    currencyCode: string;
    currencyName: string;
    population: number;
    surfaceArea: number;
    populationDensity: number;
    callingCode: string;
    domainTld: string;
    lifeExpectancy: number;
    governmentType: string;
    independenceDate: string;
    regionInWorld: string;
    religion: string;
    averageTemperature: number;
    landlocked: boolean;
    drivingSide: string;
    coastline: number;
    elevation: number;
    isoNumeric: string;
    avgMaleHeight: number;
    barcodePrefix: string;
    alphabetLetters: number;
    nationalDish: string;
    nationalSymbol: string;
    languages: string[];
    coordinates: Coordinates;
}

export interface CountrySearchResult extends Country {
    matchScore: number;
}

export interface CountryListResponse {
    total: number;
    limit: number;
    offset: number;
    countries: Country[];
}

export interface CountrySearchResponse {
    query: string;
    total: number;
    results: CountrySearchResult[];
}