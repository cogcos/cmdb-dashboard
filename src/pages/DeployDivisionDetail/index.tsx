import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Form, Select, Radio } from 'antd';
const { Option } = Select;
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { DivisionListItem } from './data';
import { queryDivisionByProjectId, addRule, removeRule, updateRule, queryEc2List, queryRole } from './service';
import { history } from 'umi';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: DivisionListItem) => {
  const hide = message.loading('正在添加');
  try {
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
      remark: fields.remark,
      role_id: fields.role_id,
      ec2_id: fields.ec2_id,
      deploy: Number(fields.deploy),
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
const handleRemove = async (selectedRows: DivisionListItem) => {
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

const RoleList = (props:any) => {
  const [isLoad, setIsLoad] = useState(false);
  const [loadData, setLoadData] = useState([]);
  
  useEffect(() => {
    queryRole().then((resp)=>{
          // console.log(resp.data)
          setLoadData(resp.data)
          setIsLoad(true)
      })
  },[])
  if (isLoad == false) {
      return (
        <div>Loading...</div>
      );
  }else{
      return (
          <Form.Item label="角色" name="role_id">
            <Select style={{ width: 120 }}>
              {loadData.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
      )
  }
}

const Ec2List = (props:any) => {
  const { targetid } = props;
  const [isLoad, setIsLoad] = useState(false);
  const [loadData, setLoadData] = useState([]);
  
  useEffect(() => {
    queryEc2List(targetid).then((resp)=>{
          // console.log(resp)
          setLoadData(resp)
          setIsLoad(true)
      })
  },[])
  
  if (isLoad == false) {
      return (
        <div>Loading...</div>
      );
  }else{
      return (
        <Form.Item label="EC2" name="ec2_id">
          <Select style={{ width: 120 }}>
            {loadData.map((item) => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
      )
  }
}

const FormAdd = (props:any) => {
  const { onSubmit, targetid } = props;
  const [targetEc2Keys, setTargetEc2Keys] = useState([]);


  return (
          <Form onFinish={(value) => onSubmit(value,targetEc2Keys)}>
              <Form.Item label="Name" name="name">
                <Input placeholder="name" allowClear />
              </Form.Item>
              <Form.Item label="Remark" name="remark">
                <Input placeholder="remark" allowClear />
              </Form.Item>
              <RoleList />
              <Ec2List targetid={targetid}/>
                    
              
              <Button type="primary" htmlType="submit">submit</Button>
          </Form>
  );
};

const TableList: React.FC<{}> = (props) => {
  const { targetid } = props.match.params;
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<DivisionListItem[]>([]);
  const columns: ProColumns<DivisionListItem>[] = [
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
      title: '备注',
      dataIndex: 'remark',
      // valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: 'role_id',
      dataIndex: 'role_id',
      // valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'role_name',
      dataIndex: 'role_name',
      // valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: 'ec2_id',
      dataIndex: 'ec2_id',
      // valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'ec2_name',
      dataIndex: 'ec2_name',
      // valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '部署状态',
      dataIndex: 'deploy',
      hideInForm: false,
      hideInSearch: true,
      valueEnum: {
        0: { text: '未部署', status: 'Processing' },
        1: { text: '成功', status: 'Success' },
        2: { text: '失败', status: 'Error' },
      },
    },
    {
      title: 'deploy_time',
      dataIndex: 'deploy_time',
      sorter: false,
      valueType: 'dateTime',
      hideInForm: true,
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
      title: '启用状态',
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
          <Button type="default" shape="round"
              onClick={() => {
                handleUpdateModalVisible(true);
                setStepFormValues(record);
                // console.log(record)
              }}
            >
              编辑
            </Button>
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
  // console.log(props.match.params.tmplid)
  return (
    <PageContainer>
      <ProTable<DivisionListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        // request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        request={(params, sorter, filter) => queryDivisionByProjectId({ ...params },targetid)}
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
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <FormAdd 
          onSubmit={async (value) => {
            // console.log(value)
            const success = await handleAdd(Object.assign(value,{project_id:Number(targetid)}));
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          targetid = {targetid}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
      <UpdateForm
        onSubmit={async (value) => {
          // console.log(value)
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
export { RoleList, Ec2List };
