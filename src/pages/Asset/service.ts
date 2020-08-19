import request from '@/utils/request';
import { TmplSourceListParams, TmplSourceListItem } from './data';

export async function queryRule(params?: TmplSourceListParams,tmplid?: number) {
    // console.log(REACT_APP_ENV)
    // params.id = tmplid;
    // console.log(params)
  return request('/api/assetlistbyprojectid', {
    params: Object.assign(params,{id: tmplid}),
    // params,
  });
}

export async function removeRule(params: { id: number }) {
  return request('/api/asset', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}
