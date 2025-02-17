export interface ServiceInterface<T> {
    fetchAll(): Promise <T[]>;
    fetchById(id: string): Promise<T | undefined>;
    create(item: T): Promise<T>;
    update(id: string, item: T): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}