import { string } from "prop-types";

export interface DivisionListItem {
    id: number;
    name: string;
    remark: string;
    role_id: number;
    role_name: string;
    ec2_id: number;
    ec2_name: number;
    project_id: number;
    deploy: number;
    deplpy_time: Date;
    update_time: Date;
    create_time: Date;
    del: number;
  }
  
  export interface DivisionListPagination {
    total: number;
    pageSize: number;
    current: number;
  }
  
  export interface DivisionListData {
    list: DivisionListItem[];
    pagination: Partial<DivisionListPagination>;
  }
  
  export interface DivisionListParams {
    name?: string;
    id?: number;
    pageSize?: number;
    currentPage?: number;
  }
  