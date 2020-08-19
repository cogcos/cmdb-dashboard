export interface ProjectListItem {
    id: number;
    name: string;
    env: string;
    tmpl_id:number;
    tmpl_name:string;
    ssh_key_path: string;
    deploy:number;
    deploy_time:Date;
    buy:number;
    buy_time:Date;
    del:number;
    update_time: Date;
    create_time: Date;
  }
  
  export interface ProjectListPagination {
    total: number;
    pageSize: number;
    current: number;
  }
  
  export interface ProjectListData {
    list: TmplListItem[];
    pagination: Partial<TmplListPagination>;
  }
  
  export interface ProjectListParams {
    name?: string;
    id?: number;
    pageSize?: number;
    currentPage?: number;
  }
  