import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input,Select ,Form} from 'antd';
const { Option } = Select;
import React, { useState, useRef,useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { ProjectListItem } from './data';
import { queryRule, updateRule, addRule, removeRule,queryTmplList } from './service';
import { history } from 'umi';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: ProjectListItem) => {
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
      env: fields.env,
      ssh_key_path: fields.ssh_key_path,
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
const handleRemove = async (selectedRows: ProjectListItem) => {
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

const TmplList = (props:any) => {
  const [isLoad, setIsLoad] = useState(false);
  const [loadData, setLoadData] = useState([]);
  
  useEffect(() => {
      queryTmplList().then((resp)=>{
          console.log(resp.data)
          setLoadData(resp.data)
          setIsLoad(true)
      })
  },[])
  if (props.vpdListVisible==false){
      return (
          <></>
      )
  }else if (isLoad == false) {
      return (
        <Select defaultValue="loading" style={{ width: 120 }} loading>
          <Option value="loading">Loading</Option>
        </Select>
      );
  }else{
      return (
          <Form.Item label="模板" name="tmpl_id">
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
  const { onSubmit } = props;

  return (
          <Form onFinish={(value) => onSubmit(value)}>
              <Form.Item label="Name" name="name">
                  <Input placeholder="name" allowClear />
              </Form.Item>
              <Form.Item label="env" name="env">
                  <Input placeholder="env" allowClear />
              </Form.Item>
              
              <TmplList />       
              
              <Button type="primary" htmlType="submit">submit</Button>
          </Form>
);
};


const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<ProjectListItem[]>([]);
  const columns: ProColumns<ProjectListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '名称为必填项',
        },
      ],
    },
    {
      title: 'env',
      dataIndex: 'env',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '必填项',
        },
      ],
    },
    {
      title: '模板名称',
      dataIndex: 'tmpl_name',
      hideInSearch: true,
    },
    {
      title: 'sshKeyPath',
      dataIndex: 'ssh_key_path',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '采购状态',
      dataIndex: 'buy',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        0: { text: '未采购', status: 'Default' },
        1: { text: '开始采购', status: 'Processing' },
        2: { text: '采购失败', status: 'Error' },
        3: { text: '采购完成', status: 'Success' },
      },
    },
    {
      title: '采购时间',
      dataIndex: 'buy_time',
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
            <Button type="default" shape="round"
              onClick={() => {
                handleUpdateModalVisible(true);
                setStepFormValues(record);
              }}
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Button type="primary" shape="round"
              onClick={() => {
                history.push({
                  pathname: '/caigou/asset/list/'+record.id
                });

              }}
            >
              配置
            </Button>
            <Divider type="vertical" />
            <Button type="default" 
              onClick={() => {
                console.log("触发采购")
              }}
            >
              采购
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

  return (
    <PageContainer>
      <ProTable<ProjectListItem>
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
        {/* <ProTable<ProjectListItem, ProjectListItem>
          onSubmit={async (value) => {
            console.log(value)
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
        /> */}
        <FormAdd 
          onSubmit={async (value) => {
            console.log(value)
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
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
