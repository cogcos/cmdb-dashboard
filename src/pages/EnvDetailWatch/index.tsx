import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Form,message,Radio,Input,InputNumber,Button,Modal,Switch } from 'antd';
import styles from './index.less';
import { AssetListItem } from './data';
import { queryVpcList,  updateRule ,queryInfo} from './service';
import { PageContainer } from '@ant-design/pro-layout';
// import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { history } from 'umi';

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: AssetListItem) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      ...fields
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

const RadioVpcList = (props:any) => {
    const [vpcIsLoad, setVpcIsLoad] = useState(false);
    const [loadVpcData, setLoadVpcData] = useState([]);
    
    useEffect(() => {
        queryVpcList(props.parentid).then((resp)=>{
          // console.log(resp)
          setLoadVpcData(resp)
          setVpcIsLoad(true)
        })
    },[])
    if (props.vpdListVisible==false){
        return (
            <></>
        )
    }else if (vpcIsLoad == false) {
        return <div>Loading</div>;
    }else{
      console.log(loadVpcData)
      console.log(props.vpcid)
        return (
          
            <Form.Item label="Vpc" name="vpc_id">
                <Radio.Group value={props.vpcid} buttonStyle="solid" defaultValue={props.vpcid} onChange={(e)=>{
                  props.vpcIdValue(e)
                }}>
                {loadVpcData.map((item) => (
                    <Radio.Button value={item.id} >{item.name} </Radio.Button>
                ))}
                </Radio.Group>
            </Form.Item>
        )
    }
}

const FormEdit = (props:any) => {
    const [vpcliststatus, setVpcliststatus] = useState(false);
    const [itemLoadStatus, setitemLoadStatus] = useState(false);
    const [itemData, setitemData] = useState({});
    const [vpcId, setVpcId] = useState(0);
    const [parentId, setParentId] = useState(0);
    // const actionRef = useRef<ActionType>();
    
    const handleClick = (roleName:string)=>{
        if (roleName == 'ec2'){
          setVpcliststatus(true)
        }else{
          setVpcliststatus(false)
          setVpcId(0)
        }
    }
    const targetid:string = props.match.params.targetid

    useEffect(() => {
      // console.log(tsid)
      queryInfo(targetid).then((resp)=>{
        console.log(resp)
        setitemData(resp)
        setitemLoadStatus(true)
        if (resp.role == "ec2"){
          setVpcliststatus(true)
        }
        setVpcId(resp.vpc_id)
        setParentId(resp.project_id)
      })
    },[])

    if (itemLoadStatus== false){
      return (
        <PageContainer>
          Loading...
        </PageContainer>
      )
    }else{

    
      return (
          <PageContainer>
          <Form 
              onFinish={async (value) => {
                // value.buy = Number(value.buy)
                // value.del = Number(value.del)
                // Object.assign(value,{
                //   project_id: parentId,
                //   vpc_id:vpcId,
                //   id:Number(targetid)
                // })
                // console.log(value)
                // if ((value.role =="ec2") && (value.vpc_id ==0)) {
                //   message.error('请填写所属vpc ！');
                //   return false;
                // }
                // let success = await handleUpdate(value);
                // // console.log(success)
                //   if (success) {

                //     // if (actionRef.current) {
                //     //     actionRef.current.reload();
                //     // }

                //     history.push({
                //       pathname: '/asset/edit/'+targetid
                //     });
                //   }
                console.log(value)
              }}

              initialValues={{
                name: itemData.name,
                role: itemData.role,
                remark: itemData.remark,
                logicalid: itemData.logicalid,
                type: itemData.type,
                arn: itemData.arn,
                ip_lan: itemData.ip_lan,
                dns: itemData.dns,
                endpoint: itemData.endpoint,
                tbd: itemData.tbd,
                ssh_user: itemData.ssh_user,
                ssh_port: itemData.ssh_port,
                buy: String(itemData.buy),
                del: String(itemData.del),

              }}
              >
                  <Form.Item label="Name" name="name">
                      <Input placeholder="name" allowClear />
                  </Form.Item>
                  <Form.Item label="Role" name="role">
                      <Radio.Group  buttonStyle="solid">
                          <Radio.Button value="vpc" onClick={()=>{handleClick('vpc')}}>vpc</Radio.Button>
                          <Radio.Button value="ec2" onClick={()=>{handleClick('ec2')}}>ec2</Radio.Button>
                          <Radio.Button value="elb" onClick={()=>{handleClick('elb')}}>elb</Radio.Button>
                          <Radio.Button value="rds" onClick={()=>{handleClick('rds')}}>rds</Radio.Button>
                          <Radio.Button value="cache" onClick={()=>{handleClick('cache')}}>cache</Radio.Button>
                          <Radio.Button value="s3" onClick={()=>{handleClick('s3')}}>s3</Radio.Button>
                          <Radio.Button value="msk" onClick={()=>{handleClick('msk')}}>msk</Radio.Button>
                      </Radio.Group>
                  </Form.Item>
                  <RadioVpcList parentid = {itemData.project_id} vpcid = {vpcId} vpdListVisible = {vpcliststatus} vpcIdValue = {(e)=>{
                    // console.log(e.target.value)
                    setVpcId(e.target.value)
                  }}/>       
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
                  <Form.Item label="采购状态" name="buy">
                    <Radio.Group  buttonStyle="solid">
                      <Radio.Button value="0">未采购</Radio.Button>
                      <Radio.Button value="1">已采购</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item label="状态" name="del">
                      <Radio.Group  buttonStyle="solid">
                        <Radio.Button value="0">启用</Radio.Button>
                        <Radio.Button value="1">禁用</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                  {/* <Button type="primary" htmlType="submit">submit</Button> */}
              </Form>
          </PageContainer>
      );
    }
};


export default FormEdit ;
