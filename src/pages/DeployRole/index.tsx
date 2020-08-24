import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { DeployRoleListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';
import { history } from 'umi';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: DeployRoleListItem) => {
  const hide = message.loading('正在添加');
  try {
    if (typeof(fields.port) != "undefined"){
      fields.port = Number(fields.port)
    }
    if (typeof(fields.db_port) != "undefined"){
      fields.db_port = Number(fields.db_port)
    }
    if (typeof(fields.es_http_port) != "undefined"){
      fields.es_http_port = Number(fields.es_http_port)
    }
    if (typeof(fields.es_tcp_port) != "undefined"){
      fields.es_tcp_port = Number(fields.es_tcp_port)
    }
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      id: fields.id,
      name: fields.name,
      release: fields.release,
      port: fields.port,
      url: fields.url,
      db_host: fields.db_host,
      db_port: fields.db_port,
      db_name: fields.db_name,
      db_user: fields.db_user,
      db_passwd: fields.db_passwd,
      es_http_port: fields.es_http_port,
      es_tcp_port: fields.es_tcp_port,
      del: Number(fields.del),
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
const handleRemove = async (selectedRows: DeployRoleListItem) => {
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

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<DeployRoleListItem[]>([]);
  const columns: ProColumns<DeployRoleListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '名称为必填项',
        },
      ],
    },
    {
      title: '版本',
      dataIndex: 'release',
      // valueType: 'textarea',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '必填项',
        },
      ],
    },
    {
      title: '端口',
      dataIndex: 'port',
      rules: [
        {
          required: true,
          message: '必填项',
        },
      ],
    },
    {
      title: '文件路径',
      dataIndex: 'url',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'db_host',
      dataIndex: 'db_host',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'db_port',
      dataIndex: 'db_port',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'db_name',
      dataIndex: 'db_name',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'db_user',
      dataIndex: 'db_user',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'db_passwd',
      dataIndex: 'db_passwd',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'es_http_port',
      dataIndex: 'es_http_port',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'es_tcp_port',
      dataIndex: 'es_tcp_port',
      hideInSearch: true,
      hideInTable: true,
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
      title: '状态',
      dataIndex: 'del',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        0: { text: '启用', status: 'Processing' },
        1: { text: '禁用', status: 'Error' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
            <Button type="primary" shape="round"
              onClick={() => {
                handleUpdateModalVisible(true);
                setStepFormValues(record);
              }}
            >
              编辑
            </Button>
            {/* <Divider type="vertical" />
            <Button type="primary" shape="round"
              onClick={() => {
                history.push({
                  pathname: '/caigou/DeployRole_source/list/'+record.id
                });

              }}
            >
              配置
            </Button> */}
          <Divider type="vertical" />
          <Button danger
            onClick={async () => {
              await handleRemove(record);
              actionRef.current?.reloadAndRest();
            }}
          >
            禁用
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<DeployRoleListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        // request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        request={(params, sorter, filter) => queryRule({ ...params })}
        // request={(params, sorter, filter) => {
        //   console.log(props);
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
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          // extra={
          //   <div>
          //     已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
          //     <span>
          //       服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
          //     </span>
          //   </div>
          // }
        >
          {/* <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button> */}
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<DeployRoleListItem, DeployRoleListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
            console.log(stepFormValues)
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageContainer>
  );
};

export default TableList;
