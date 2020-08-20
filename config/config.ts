// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  define: {
    API_SERVER: '127.0.0.1:8080',
  },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      // component: '../layouts/SecurityLayout',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
              hideInMenu:true,
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              // authority: ['admin'],
              hideInMenu:true,
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                  hideInMenu:true,
                },
              ],
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
              hideInMenu:true,
            },
            {
              path: '/caigou',
              name: '采购',
              icon: 'crown',
              // component: './Admin',
              // authority: ['admin'],
              routes: [
                {
                  name: '模板',
                  icon: 'smile',
                  path: '/caigou/tmpl',
                  component: './Tmpl',
                },
                {
                  name: '模板资源',
                  icon: 'smile',
                  path: '/caigou/tmpl_source/list/:tmplid',
                  component: './TmplSource',
                  hideInMenu:true,
                },
                {
                  name: '新增模板资源',
                  icon: 'smile',
                  path: '/caigou/tmpl_source/add/:tmplid',
                  component: './TmplSourceAdd',
                  hideInMenu:true,
                },
                {
                  name: '编辑模板资源',
                  icon: 'smile',
                  path: '/caigou/tmpl_source/edit/:tsid',
                  component: './TmplSourceEdit',
                  hideInMenu:true,
                },
                {
                  name: '实例',
                  icon: 'smile',
                  path: '/caigou/project',
                  component: './Project',
                },
                {
                  name: '实例资源',
                  icon: 'smile',
                  path: '/caigou/asset/list/:targetid',
                  component: './Asset',
                  hideInMenu:true,
                },
                {
                  name: '新增实例资源',
                  icon: 'smile',
                  path: '/caigou/asset/add/:targetid',
                  component: './AssetAdd',
                  hideInMenu:true,
                },
                {
                  name: '编辑实例资源',
                  icon: 'smile',
                  path: '/caigou/asset/edit/:targetid',
                  component: './AssetEdit',
                  hideInMenu:true,
                },
              ],
            },
            {
              path: '/env',
              name: '环境',
              icon: 'crown',
              // component: './Admin',
              // authority: ['admin'],
              routes: [
                {
                  name: '环境信息',
                  icon: 'smile',
                  path: '/env/list',
                  component: './Env',
                },
                {
                  name: '环境详情',
                  icon: 'smile',
                  path: '/env/asset/list/:targetid',
                  component: './EnvDetail',
                  hideInMenu:true,
                },
                {
                  name: '环境详情',
                  icon: 'smile',
                  path: '/env/asset/edit/:targetid',
                  component: './EnvDetailWatch',
                  hideInMenu:true,
                },
              ],
            },
            {
              name: '空白页面',
              icon: 'smile',
              path: '/emptypage',
              component: './EmptyPage',
              hideInMenu:true,
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
