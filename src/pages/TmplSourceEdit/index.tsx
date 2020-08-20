import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Radio } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { TmplSourceListItem } from './data';
import { queryTsInfo, queryVpcList, updateRule } from './service';

const handleUpdate = async (fields: TmplSourceListItem) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      ...fields,
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

const RadioVpcList = (props: any) => {
  const [vpcIsLoad, setVpcIsLoad] = useState(false);
  const [loadVpcData, setLoadVpcData] = useState([]);
  useEffect(() => {
    if (props.reload) {
      queryVpcList(props.tmplid)
        .then((resp) => {
          setLoadVpcData(resp);
          setVpcIsLoad(true);
        })
        .finally(props.onReloaded);
    }
  }, [props.reload]);
  if (!props.vpdListVisible) {
    return null;
  }
  if (!vpcIsLoad) {
    return <div>Loading</div>;
  }
  return (
    <Form.Item label="Vpc" name="vpc_id">
      <Radio.Group
        value={props.vpcid}
        buttonStyle="solid"
        defaultValue={props.vpcid}
        onChange={(e) => {
          props.vpcIdValue(e);
        }}
      >
        {loadVpcData.map((item: any) => (
          <Radio.Button value={item.id} key={item.id}>
            {item.name}{' '}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

const FormEdit = (props: any) => {
  const [vpcliststatus, setVpcliststatus] = useState(false);
  const [itemLoadStatus, setitemLoadStatus] = useState(false);
  const [itemData, setitemData] = useState<any>({});
  const [vpcId, setVpcId] = useState(0);
  const [tmplId, setTmplId] = useState(0);
  const [reload, setReload] = useState<Boolean>(true);

  const handleClick = (roleName: string) => {
    if (roleName === 'ec2') {
      setVpcliststatus(true);
    } else {
      setVpcliststatus(false);
      setVpcId(0);
    }
  };
  const { tsid } = props.match.params;

  useEffect(() => {
    queryTsInfo(tsid).then((resp) => {
      setitemData(resp);
      setitemLoadStatus(true);
      if (resp.role === 'ec2') {
        setVpcliststatus(true);
      }
      setVpcId(resp.vpc_id);
      setTmplId(resp.tmpl_id);
    });
  }, []);

  if (!itemLoadStatus) {
    return <PageContainer>Loading...</PageContainer>;
  }

  return (
    <PageContainer>
      <Form
        onFinish={async (value: any) => {
          Object.assign(value, {
            tmpl_id: tmplId,
            vpc_id: vpcId,
            id: Number(tsid),
          });
          if (value.role === 'ec2' && value.vpc_id === 0) {
            message.error('请填写所属vpc ！');
            return false;
          }
          const success = await handleUpdate(value);
          if (success) {
            setReload(true);
            return true;
          }
          return false;
        }}
        initialValues={{
          name: itemData.name,
          role: itemData.role,
          remark: itemData.remark,
          logicalid: itemData.logicalid,
          type: itemData.type,
          ssh_user: itemData.ssh_user,
          ssh_port: itemData.ssh_port,
        }}
      >
        <Form.Item label="Name" name="name">
          <Input placeholder="name" allowClear />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Radio.Group buttonStyle="solid">
            <Radio.Button
              value="vpc"
              onClick={() => {
                handleClick('vpc');
              }}
            >
              vpc
            </Radio.Button>
            <Radio.Button
              value="ec2"
              onClick={() => {
                handleClick('ec2');
              }}
            >
              ec2
            </Radio.Button>
            <Radio.Button
              value="elb"
              onClick={() => {
                handleClick('elb');
              }}
            >
              elb
            </Radio.Button>
            <Radio.Button
              value="rds"
              onClick={() => {
                handleClick('rds');
              }}
            >
              rds
            </Radio.Button>
            <Radio.Button
              value="cache"
              onClick={() => {
                handleClick('cache');
              }}
            >
              cache
            </Radio.Button>
            <Radio.Button
              value="s3"
              onClick={() => {
                handleClick('s3');
              }}
            >
              s3
            </Radio.Button>
            <Radio.Button
              value="msk"
              onClick={() => {
                handleClick('msk');
              }}
            >
              msk
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <RadioVpcList
          tmplid={itemData.tmpl_id}
          vpcid={vpcId}
          reload={reload}
          onReloaded={() => {
            setReload(false);
          }}
          vpdListVisible={vpcliststatus}
          vpcIdValue={(e) => {
            setVpcId(e.target.value);
          }}
        />
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
          <InputNumber min={1} max={65536} defaultValue={22} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          submit
        </Button>
      </Form>
    </PageContainer>
  );
};

export default FormEdit;
