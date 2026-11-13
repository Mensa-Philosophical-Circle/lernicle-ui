export interface PagerProps {
  page: number;
  pageSize: number;
  /** Rows matching across all pages. */
  total: number;
  totalPages: number;
  setPage: (page: number) => void;
  /** Offer a rows-per-page choice. Most lists stay at 20 and leave it out. */
  pageSizes?: number[];
  setPageSize?: (size: number) => void;
}
