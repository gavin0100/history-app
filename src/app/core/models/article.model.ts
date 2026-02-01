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
