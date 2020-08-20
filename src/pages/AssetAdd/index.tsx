import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Form,message,Radio,Input,InputNumber,Button,Modal,Switch } from 'antd';
import styles from './index.less';
import { AssetListItem } from './data';
import { queryRule,  addRule } from './service';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AssetListItem) => {
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

const RadioVpcList = (props:any) => {
    const [isLoad, setIsLoad] = useState(false);
    const [loadData, setLoadData] = useState([]);
    
    useEffect(() => {
        queryRule(props.targetid).then((resp)=>{
            // console.log(resp)
            setLoadData(resp)
            setIsLoad(true)
        })
    },[])
    if (props.vpdListVisible==false){
        return (
            <></>
        )
    }else if (isLoad == false) {
        return <div>Loading</div>;
    }else{
        return (
            <Form.Item label="Vpc" name="vpc_id">
                <Radio.Group  buttonStyle="solid">
                {loadData.map((item) => (
                    <Radio.Button value={item.id} >{item.name}</Radio.Button>
                ))}
                </Radio.Group>
            </Form.Item>
        )
    }
}

const FormAdd = (props:any) => {
    const [vpcipliststatus, setVpcipliststatus] = useState(false);
    
    const handleClick = (roleName:string)=>{
        if (roleName == 'ec2'){
            setVpcipliststatus(true)
        }else{
            setVpcipliststatus(false)
        }
    }
    return (
        <PageContainer>
            <Form onFinish={async (value) => {
                    let items:AssetListItem = Object.assign(value,{project_id: Number(props.match.params.targetid)})
                    let success = await handleAdd(items);
                    console.log(value)
                    // if (success) {
                        
                    // if (actionRef.current) {
                    //     actionRef.current.reload();
                    // }

                    history.push({
                        pathname: '/caigou/asset/list/'+props.match.params.targetid
                    });
                }
            }>
                <Form.Item label="Name" name="name">
                    <Input placeholder="name" allowClear />
                </Form.Item>
                <Form.Item label="Role" name="role">
                    <Radio.Group  buttonStyle="solid">
                        <Radio.Button value="vpc" onClick={()=>{handleClick('vpc')}} checked >vpc</Radio.Button>
                        <Radio.Button value="ec2" onClick={()=>{handleClick('ec2')}}>ec2</Radio.Button>
                        <Radio.Button value="elb" onClick={()=>{handleClick('elb')}}>elb</Radio.Button>
                        <Radio.Button value="rds" onClick={()=>{handleClick('rds')}}>rds</Radio.Button>
                        <Radio.Button value="cache" onClick={()=>{handleClick('cache')}}>cache</Radio.Button>
                        <Radio.Button value="s3" onClick={()=>{handleClick('s3')}}>s3</Radio.Button>
                        <Radio.Button value="msk" onClick={()=>{handleClick('msk')}}>msk</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <RadioVpcList targetid = {props.match.params.targetid} vpdListVisible = {vpcipliststatus} />       
                <Form.Item label="remark" name="remark">
                    <Input placeholder="remark" allowClear />
                </Form.Item>
                <Form.Item label="logicalid" name="logicalid">
                    <Input placeholder="logicalid" allowClear />
                </Form.Item>
                <Form.Item label="type" name="type">
                    <Input placeholder="type" allowClear />
                </Form.Item>
                <Form.Item label="arn" name="arn">
                    <Input placeholder="arn" allowClear />
                </Form.Item>
                <Form.Item label="ip_lan" name="ip_lan">
                    <Input placeholder="ip_lan" allowClear />
                </Form.Item>
                <Form.Item label="dns" name="dns">
                    <Input placeholder="dns" allowClear />
                </Form.Item>
                <Form.Item label="endpoint" name="endpoint">
                    <Input placeholder="endpoint" allowClear />
                </Form.Item>
                <Form.Item label="tbd" name="tbd">
                    <Input placeholder="tbd" allowClear />
                </Form.Item>
                <Form.Item label="ssh_user" name="ssh_user">
                    <Input placeholder="ssh_user" allowClear />
                </Form.Item>
                <Form.Item label="ssh_port" name="ssh_port">
                    <InputNumber min={1} max={65536} defaultValue={22}  />
                </Form.Item>
                <Button type="primary" htmlType="submit">submit</Button>
            </Form>
        </PageContainer>
  );
};


export default FormAdd ;
