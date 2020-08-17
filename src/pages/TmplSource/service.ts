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
  return request('/api/tmpl', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addRule(params: TmplSourceListItem) {
  return request('/api/tmpl', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: TmplSourceListParams) {
  return request('/api/tmpl', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
