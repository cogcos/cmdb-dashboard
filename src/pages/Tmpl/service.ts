import request from '@/utils/request';
import { TmplListParams, TmplListItem } from './data.d';

export async function queryRule(params?: TmplListParams) {
    // console.log(REACT_APP_ENV)
  return request('/api/tmpllist', {
    params,
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

export async function addRule(params: TmplListItem) {
  return request('/api/tmpl', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: TmplListParams) {
  return request('/api/tmpl', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
