export class ArticleNotFoundException extends Error {
    constructor(message?: string) {
        super(message || 'Article not found for the selected path');
        this.name = 'ArticleNotFoundException';

        // With captureStackTrace, the stack trace starts where the error actually happened
        const anyError = Error as any;
        if (anyError.captureStackTrace) {
            anyError.captureStackTrace(this, ArticleNotFoundException);
        }
    }
}