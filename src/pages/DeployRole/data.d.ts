export interface DeployRoleListItem {
    id: number;
    name: string;
    release: string;
    port: number;
    url?: string;
    del?: number;
    db_host?: string;
    db_port?: number;
    db_name?: string;
    db_user?: string;
    db_passwd?: string;
    es_http_port?: number;
    es_tcp_port?: number;
    update_time?: Date;
    create_time?: Date;
  }
  
  export interface DeployRoleListPagination {
    total: number;
    pageSize: number;
    current: number;
  }
  
  export interface DeployRoleListData {
    list: DeployRoleListItem[];
    pagination: Partial<DeployRoleListPagination>;
  }
  
  export interface DeployRoleListParams {
    name?: string;
    id?: number;
    pageSize?: number;
    currentPage?: number;
  }
  