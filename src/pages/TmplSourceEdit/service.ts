import request from '@/utils/request';
import { TmplSourceListParams, TmplSourceListItem } from './data';


export async function addRule(params: TmplSourceListItem) {
  return request('/api/tmplsource', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function queryVpcList(tmplid?: number) {
    // console.log(REACT_APP_ENV)
    // params.id = tmplid;
    // console.log(params)
  return request('/api/tmplsourcelistvpcbytmplid', {
    params: Object.assign({id: tmplid}),
    // params,
  });
}
export async function queryTsInfo(tsid?: string) {
    // console.log(REACT_APP_ENV)
    // params.id = tmplid;
    // console.log(params)
  return request('/api/tmplsource', {
    params: Object.assign({id: tsid}),
    // params,
  });
}
export async function updateRule(params: TmplSourceListItem) {
    return request('/api/tmplsource', {
      method: 'PUT',
      data: {
        ...params,
      },
    });
}