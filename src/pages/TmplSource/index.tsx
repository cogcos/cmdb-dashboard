import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TmplSourceListItem } from './data';
import { queryRule, addRule, removeRule } from './service';
import { history } from 'umi';

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      id: fields.id,

    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TmplSourceListItem) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      id: selectedRows.id,
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = (props) => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<TmplSourceListItem[]>([]);
  const columns: ProColumns<TmplSourceListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '名称为必填项',
        },
      ],
      hideInSearch: true,
    },
    {
      title: 'role',
      dataIndex: 'role',
      rules: [
        {
          required: true,
          message: 'role为必填项',
        },
      ],
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: 'logicalid',
      dataIndex: 'logicalid',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: 'aws-type',
      dataIndex: 'type',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: 'ssh_user',
      dataIndex: 'ssh_user',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: 'ssh_port',
      dataIndex: 'ssh_port',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      sorter: false,
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '修改时间',
      dataIndex: 'update_time',
      sorter: false,
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button type="primary" shape="round"
            onClick={() => {
              history.push({
                pathname: '/caigou/tmpl_source/edit/'+record.id
              });
            }}
          >
            配置
          </Button>
          <Divider type="vertical" />
          <Button danger
            onClick={async () => {
              await handleRemove(record);
              actionRef.current?.reloadAndRest();
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];
  // console.log(props.match.params.tmplid)
  return (
    <PageContainer>
      <ProTable<TmplSourceListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => {
            history.push({
              pathname: '/caigou/tmpl_source/add/'+props.match.params.tmplid
            });
          }}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        // request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        request={(params, sorter, filter) => queryRule({ ...params },props.match.params.tmplid)}
        // request={(params, sorter, filter) => {
        //   return new Promise((reslove,reject)=>{
        //     queryRule({ ...params }).then(resp=>{
        //       console.log(resp,params)
        //       reslove({data: resp.items})
        //     }).catch(errResp=>{
        //       reject(errResp)
        //     })            
        //   })
        // }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {/* {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )} */}
    </PageContainer>
  );
};

export default TableList;
