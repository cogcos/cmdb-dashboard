import request from '@/utils/request';
import { TmplListParams, TmplListItem } from './data';

export async function queryRule(params?: TmplListParams) {
    // console.log(REACT_APP_ENV)
  return request('/api/projectlist', {
    params,
  });
}

export async function removeRule(params: { id: number }) {
  return request('/api/project', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addRule(params: TmplListItem) {
  return request('/api/project', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: TmplListParams) {
  return request('/api/project', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
