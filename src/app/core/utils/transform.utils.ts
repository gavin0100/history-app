import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

type HasName = { name: string };

export function transformName<T extends HasName>(item: T): T {
    const upperName = item.name.toUpperCase();
    return {
        ...item,
        name: upperName.includes('123')
            ? upperName.replaceAll('123', '456')  // replaces ALL occurrences
            : upperName + '123'
    };
}

export function transformNames$<T extends HasName>(items: T[]): Observable<T[]> {
    return of(items).pipe(
        map(itemList => itemList.map(item => transformName(item)))
    );
}

export function transformName$<T extends HasName>(item: T): Observable<T> {
    return of(item).pipe(
        map(i => transformName(i))
    );
}
