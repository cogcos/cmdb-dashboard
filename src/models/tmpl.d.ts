export interface TmplListItem {
    id: number;
    name: string;
    sshKeyPath: string;
    updatedAt: Date;
    createdAt: Date;
  }
  
  export interface TableListPagination {
    total: number;
    pageSize: number;
    current: number;
  }
  
  export interface TableListData {
    list: TableListItem[];
    pagination: Partial<TableListPagination>;
  }
  
  export interface TableListParams {
    name?: string;
    id?: number;
  }
  