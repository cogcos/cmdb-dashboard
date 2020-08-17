export interface TmplListItem {
    id: number;
    name: string;
    ssh_key_path: string;
    update_time: Date;
    create_time: Date;
  }
  
  export interface TmplListPagination {
    total: number;
    pageSize: number;
    current: number;
  }
  
  export interface TmplListData {
    list: TmplListItem[];
    pagination: Partial<TmplListPagination>;
  }
  
  export interface TmplListParams {
    name?: string;
    id?: number;
    ssh_key_path: string;
    pageSize?: number;
    currentPage?: number;
  }
  