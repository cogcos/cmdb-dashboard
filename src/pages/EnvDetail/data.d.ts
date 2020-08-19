import { string } from "prop-types";

export interface AssetListItem {
    id: number;
    name: string;
    project_id: number;
    role: string;
    vpc_id: number;
    remark: string;
    logicalid: string;
    type: string;
    arn: string;
    ip_lan: string;
    dns: string;
    endpoint: string;
    tbd: string;
    buy: number;
    buy_time: Date;
    ssh_port: number;
    ssh_user: string;
    update_time: Date;
    create_time: Date;
    del: number;
  }
  
  export interface AssetListPagination {
    total: number;
    pageSize: number;
    current: number;
  }
  
  export interface AssetListData {
    list: AssetListItem[];
    pagination: Partial<AssetListPagination>;
  }
  
  export interface AssetListParams {
    name?: string;
    id?: number;
    pageSize?: number;
    currentPage?: number;
  }
  