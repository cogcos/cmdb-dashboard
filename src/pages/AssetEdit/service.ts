import request from '@/utils/request';
import { AssetListParams, AssetListItem } from './data';


// export async function addRule(params: AssetListItem) {
//   return request('/api/Asset', {
//     method: 'POST',
//     data: {
//       ...params,
//     },
//   });
// }
export async function queryVpcList(targetid?: number) {
    // console.log(REACT_APP_ENV)
    // params.id = tmplid;
    // console.log(params)
  return request('/api/assetlistvpcbyprojectid', {
    params: Object.assign({id: targetid}),
    // params,
  });
}
export async function queryInfo(targetid?: string) {
    // console.log(REACT_APP_ENV)
    // params.id = tmplid;
    // console.log(params)
  return request('/api/asset', {
    params: Object.assign({id: targetid}),
    // params,
  });
}
export async function updateRule(params: AssetListItem) {
    return request('/api/asset', {
      method: 'PUT',
      data: {
        ...params,
      },
    });
}