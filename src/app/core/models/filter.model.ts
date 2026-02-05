import { ArticleFilter } from "./article.model";
import { NavigationPath } from "./navigation.model";

export class ArticleFilterBuilder {

    /**
     * Convert multiple navigation paths to article filter
     * Example:
     * - Vietnam → Livestock → Chicken Farming → 1945-1950
     * - America → Metallurgical → Steel Production → 1960-1970
     */
    static fromNavigationPaths(paths: NavigationPath[]): ArticleFilter {
        if (!paths || paths.length === 0) {
            return {};
        }

        return {
            paths: paths.map(path => ({
                countryId: path.country.id,
                industryId: path.industry.id,
                subIndustryId: path.subIndustry.id,
                timeRangeId: path.timeRange.id
            })),
            sortBy: 'date',
            sortOrder: 'desc',
            page: 1,
            pageSize: 20
        };
    }
}