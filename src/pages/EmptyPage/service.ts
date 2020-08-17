import request from '@/utils/request';
import { TmplListParams, TmplListItem } from './data.d';

export async function queryRule(params?: TmplListParams) {
    // console.log(REACT_APP_ENV)
  return request('/api/tmpllist', {
    params,
  });
}