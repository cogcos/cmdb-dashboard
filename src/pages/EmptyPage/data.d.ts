export interface TmplListItem {
    id: number;
    name: string;
    sshKeyPath: string;
    updatedAt: Date;
    createdAt: Date;
  }
  
  export interface TmplListPagination {
    total: number;
  }
  
  export interface TmplListData {
    list: TmplListItem[];
    pagination: Partial<TmplListPagination>;
  }
  
  export interface TmplListParams {
    name?: string;
    id?: number;
    pageSize?: number;
    currentPage?: number;
  }
  