export interface QueryResults<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
    extra?: any;
}
export interface IQuery {
    pageSize?: number;
    pageNum?: number;
    fields?: string;
    is_delete?: boolean;
    ordering?: string;
}
