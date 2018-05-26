interface Array<T> {

    add(item: T): void

    addRange(...item: T[]): void

    all(predicate: (item: T) => boolean): boolean

    any(predicate: (item: T) => boolean): boolean

    count(predicate: (item: T) => boolean)

    distinct(): Array<T>

    distinctRecursive(): Array<T>

    first(predicate?: (item: T) => boolean): T

    firstOrDefault(predicate?: (item: T) => boolean): T

    groupBy(predicate: (item: T) => boolean): Array<any>

    last(predicate?: (item: T) => boolean): T

    lastOrDefault(predicate?: (item: T) => boolean): T

    max(predicate?: (item: T) => boolean): T

    min(predicate?: (item: T) => boolean): T

    order(): Array<T>

    orderBy(predicate: (item: T) => boolean): Array<T>

    orderByDesc(predicate: (item: T) => boolean): Array<T>

    orderDesc(): Array<T>

    remove(predicate: T | ((item: T) => boolean))

    removeAt(index: number)

    select(predicate: (item: T) => boolean): Array<any>

    selectMany(predicate: (item: T) => boolean): Array<any>

    skip(length: number): Array<T>

    sum(predicate: (item: number) => boolean): number

    take(length: number): Array<T>

    thenBy(predicate: (item: T) => boolean): Array<any>

    thenByDesc(predicate: (item: T) => boolean): Array<any>

    where(predicate: (item: T) => boolean): Array<T>
}
