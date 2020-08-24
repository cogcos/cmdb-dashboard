import request from '@/utils/request';
import { DivisionListParams, DivisionListItem } from './data';

// export async function queryProjectRole(params?: DivisionListParams,targetid?: number) {
//     // console.log(REACT_APP_ENV)
//   return request('/api/projectrolelist', {
//     params: Object.assign(params,{id: targetid}),
//   });
// }

export async function queryDivisionByProjectId(params?: DivisionListParams,targetid?: number) {
  // console.log(REACT_APP_ENV)
return request('/api/divisionlist', {
  params: Object.assign(params,{id: targetid}),
});
}

export async function removeRule(params: { id: number }) {
  return request('/api/division', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addRule(params: DivisionListItem) {
  return request('/api/division', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: DivisionListParams) {
  return request('/api/division', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function queryEc2List(targetid?: number) {
  // console.log(REACT_APP_ENV)
  return request('/api/assetlistec2byprojectid', {
    params: Object.assign({id:targetid,current: 1,pageSize: 1000}),
  });
}

export async function queryRole() {
  // console.log(REACT_APP_ENV)
return request('/api/deployrolelist',{
  params: Object.assign({current: 1,pageSize: 1000}),
});
}