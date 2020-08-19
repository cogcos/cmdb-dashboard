import request from '@/utils/request';
import { TmplSourceListParams, TmplSourceListItem } from './data';

export async function queryRule(params?: TmplSourceListParams,tmplid?: number) {
    // console.log(REACT_APP_ENV)
    // params.id = tmplid;
    // console.log(params)
  return request('/api/tmplsourcelist', {
    params: Object.assign(params,{id: tmplid}),
    // params,
  });
}

export async function removeRule(params: { id: number }) {
  return request('/api/tmplsource', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}
