export type PaginatedData<T> = {
  data: T;
  meta: {
    totalCount: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
  };
};