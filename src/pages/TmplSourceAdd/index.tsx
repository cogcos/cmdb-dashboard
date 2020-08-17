import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Form,message,Radio,Input,InputNumber,Button,Modal } from 'antd';
import styles from './index.less';
import { TmplSourceListItem } from './data';
import { queryRule, updateRule, addRule, removeRule } from './service';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TmplSourceListItem) => {
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

const FormAdd = () => {
    const [componentRole, setComponentRole] = useState('vpc');
    const [vpcipliststatus, setVpcipliststatus] = useState(false);
    const handleClick = (roleName:string)=>{
        setComponentRole(roleName)
    }
    return (
        <>
        <Form>
            <Form.Item label="Name" name="name">
                <Input placeholder="name" allowClear />
            </Form.Item>
            <Form.Item label="Role" name="role">
                <Radio.Group defaultValue="vpc" buttonStyle="solid">
                    <Radio.Button value="vpc" onClick={()=>{handleClick('vpc')}}>vpc</Radio.Button>
                    <Radio.Button value="ec2" onClick={()=>{handleClick('ec2')}}>ec2</Radio.Button>
                    <Radio.Button value="elb" onClick={()=>{handleClick('elb')}}>elb</Radio.Button>
                    <Radio.Button value="rds" onClick={()=>{handleClick('rds')}}>rds</Radio.Button>
                    <Radio.Button value="cache" onClick={()=>{handleClick('cache')}}>cache</Radio.Button>
                    <Radio.Button value="s3" onClick={()=>{handleClick('s3')}}>s3</Radio.Button>
                    <Radio.Button value="msk" onClick={()=>{handleClick('msk')}}>msk</Radio.Button>
                </Radio.Group>
            </Form.Item>
            
            <Form.Item label="remark" name="remark">
                <Input placeholder="remark" allowClear />
            </Form.Item>
            <Form.Item label="logicalid" name="logicalid">
                <Input placeholder="logicalid" allowClear />
            </Form.Item>
            <Form.Item label="type" name="type">
                <Input placeholder="type" allowClear />
            </Form.Item>
            <Form.Item label="ssh_user" name="ssh_user">
                <Input placeholder="ssh_user" allowClear />
            </Form.Item>
            <Form.Item label="ssh_port" name="ssh_port">
                <InputNumber min={1} max={65536} defaultValue={22}  />
            </Form.Item>
            <Form.Item label="" name="submit">
                <Button type="primary">submit</Button>
            </Form.Item>
        </Form>
        </>
  );
};


export default () => {

  return (
    <PageContainer>
        <FormAdd />
    </PageContainer>
  );
};
