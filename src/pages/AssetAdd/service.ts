import request from '@/utils/request';
import { TmplSourceListParams, TmplSourceListItem } from './data';


export async function addRule(params: TmplSourceListItem) {
  return request('/api/asset', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function queryRule(targetid?: number) {
    // console.log(REACT_APP_ENV)
    // params.id = tmplid;
    // console.log(params)
  return request('/api/assetlistvpcbyprojectid', {
    params: Object.assign({id: targetid}),
    // params,
  });
}