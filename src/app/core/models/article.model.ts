import { NavigationPath } from "./navigation.model";

/**
 * Article classification - represents the full path
 * Country → Industry → Sub-Industry → Time Range
 */
export interface ArticleClassification {
    country: {
        id: string;
        name: string;
        code: string;
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
        label: string;        // e.g., "1945-1950"
        startYear: number;
        endYear: number;
    };
}

/**
 * Article author information
 */
export interface ArticleAuthor {
    id: string;
    name: string;
    avatar?: string;
    role?: string;
}

/**
 * Article statistics
 */
export interface ArticleStats {
    likes: number;
    comments: number;
    views?: number;
    shares?: number;
}

/**
 * Article status
 */
export enum ArticleStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    ARCHIVED = 'archived'
}

/**
 * Main article interface
 */
export interface Article {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content?: string;                    // Full content (only in detail view)
    imageUrl: string;
    thumbnailUrl?: string;
    author: ArticleAuthor;
    stats: ArticleStats;
    classification: ArticleClassification;  // Full path in hierarchy
    publishedDate: string;                  // ISO date string
    createdDate: string;
    updatedDate?: string;
    status: ArticleStatus;
    tags?: string[];                        // Additional tags
}

/**
 * Article list item (lighter version for list views)
 */
export interface ArticleListItem {
    id: string;
    title: string;
    slug: string;
    summary: string;
    imageUrl: string;
    thumbnailUrl?: string;
    author: ArticleAuthor;
    stats: ArticleStats;
    classification: ArticleClassification;
    publishedDate: string;
}

/**
 * Article filter parameters
 * Can filter by multiple selected paths
 */
export interface ArticleFilter {
    // Multiple path selections
    paths?: Array<{
        countryId?: string;
        industryId?: string;
        subIndustryId?: string;
        timeRangeId?: string;
    }>;

    // Alternative: individual filters
    countryIds?: string[];
    industryIds?: string[];
    subIndustryIds?: string[];
    timeRangeIds?: string[];

    // Date filtering
    startDate?: string;          // ISO date string
    endDate?: string;            // ISO date string

    // Additional filters
    authorId?: string;
    tags?: string[];
    status?: ArticleStatus;
    searchQuery?: string;

    // Sorting and pagination
    sortBy?: 'date' | 'likes' | 'comments' | 'views' | 'title';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
}

/**
 * Article list response with pagination
 */
export interface ArticleListResponse {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    articles: ArticleListItem[];
    appliedFilters?: ArticleFilter;
    selectedPaths?: NavigationPath[];  // Paths used for this query
}

/**
 * Comment on an article
 */
export interface ArticleComment {
    id: string;
    articleId: string;
    author: ArticleAuthor;
    content: string;
    createdDate: string;
    updatedDate?: string;
    likes?: number;
    replies?: ArticleComment[];
}

/**
 * Comment list response
 */
export interface CommentListResponse {
    total: number;
    articleId: string;
    comments: ArticleComment[];
}

/**
 * Article detail response (includes full content and comments)
 */
export interface ArticleDetailResponse {
    article: Article;
    relatedArticles?: ArticleListItem[];  // Related articles in same category
    comments?: ArticleComment[];
}