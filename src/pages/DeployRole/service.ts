import request from '@/utils/request';
import { DeployRoleListParams, DeployRoleListItem } from './data.d';

export async function queryRule(params?: DeployRoleListParams) {
    // console.log(REACT_APP_ENV)
  return request('/api/deployrolelist', {
    params,
  });
}

export async function removeRule(params: { id: number }) {
  return request('/api/deployrole', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addRule(params: DeployRoleListItem) {
  return request('/api/deployrole', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: DeployRoleListParams) {
  return request('/api/deployrole', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
