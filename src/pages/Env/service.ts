import request from '@/utils/request';
import { ProjectListParams, ProjectListItem } from './data';

export async function queryRule(params?: ProjectListParams) {
    // console.log(REACT_APP_ENV)
  return request('/api/envlist', {
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

export async function addRule(params: ProjectListItem) {
  return request('/api/project', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: ProjectListParams) {
  return request('/api/project', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function queryTmplList() {
  // console.log(REACT_APP_ENV)
  return request('/api/tmpllist', {
    params: Object.assign({current: 1,pageSize: 1000}),
  });
}
