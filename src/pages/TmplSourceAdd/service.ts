import request from '@/utils/request';
import { TmplSourceListParams, TmplSourceListItem } from './data';


export async function addRule(params: TmplSourceListItem) {
  return request('/api/tmpl', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function queryRule(tmplid?: number) {
    // console.log(REACT_APP_ENV)
    // params.id = tmplid;
    // console.log(params)
  return request('/api/tmplsourcelistvpcbytmplid', {
    params: Object.assign({id: tmplid}),
    // params,
  });
}