import { string } from "prop-types";

export interface TmplSourceListItem {
    id: number;
    name: string;
    role: string;
    tmpl_id: number;
    vpc_id: number;
    remark: string;
    logicalid: string;
    type: string;
    ssh_port: number;
    ssh_user: string;
    update_time: Date;
    create_time: Date;
  }
  
  export interface TmplSourceListPagination {
    total: number;
    pageSize: number;
    current: number;
  }
  
  export interface TmplSourceListData {
    list: TmplSourceListItem[];
    pagination: Partial<TmplSourceListPagination>;
  }
  
  export interface TmplSourceListParams {
    name?: string;
    id?: number;
    pageSize?: number;
    currentPage?: number;
  }
  