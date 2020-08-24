import React, { useState } from 'react';
import { Form, Button, Input, Modal, InputNumber, Radio } from 'antd';

import { DeployRoleListItem } from '../data.d';

export interface FormValueType extends Partial<DeployRoleListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<DeployRoleListItem>;
}
const FormItem = Form.Item;
const { TextArea } = Input;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    name: props.values.name,
    release: props.values.release,
    port: props.values.port,
    url: props.values.url,
    db_host: props.values.db_host,
    db_port: props.values.db_port,
    db_name: props.values.db_name,
    db_user: props.values.db_user,
    db_passwd: props.values.db_passwd,
    es_http_port: props.values.es_http_port,
    es_tcp_port: props.values.es_tcp_port,
    del: props.values.del,
  });

  // const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  // const forward = () => setCurrentStep(currentStep + 1);

  // const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    // console.log(fieldsValue)
    // console.log(formVals)

    setFormVals({ ...formVals, ...fieldsValue });

    
    handleUpdate({ ...formVals, ...fieldsValue });
    
  };
  const renderContent = () => {
    return (
      <>
        <FormItem name="name" label="名称" rules={[{ required: true, message: '请输入！' }]} >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="release" label="版本" rules={[{ required: true, message: '请输入！' }]} >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="port" label="端口" rules={[{ required: true, message: '请输入!' }]} >
          <InputNumber min={1} max={65536} defaultValue={22}  />
        </FormItem>
        <FormItem name="文件路径" label="url" >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="db_host" label="db_host" >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="db_port" label="端口" >
          <InputNumber min={1} max={65536} defaultValue={22}  />
        </FormItem>
        <FormItem name="db_name" label="db_name" >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="db_user" label="db_user" >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="db_passwd" label="db_passwd" >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="es_http_port" label="端口" >
          <InputNumber min={1} max={65536} defaultValue={22}  />
        </FormItem>
        <FormItem name="es_tcp_port" label="端口" >
          <InputNumber min={1} max={65536} defaultValue={22}  />
        </FormItem>
        <Form.Item label="状态" name="del">
            <Radio.Group  buttonStyle="solid">
              <Radio.Button value="0">启用</Radio.Button>
              <Radio.Button value="1">禁用</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          提交
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: formVals.name,
          release: formVals.release,
          port: formVals.port,
          url: formVals.url,
          db_host: formVals.db_host,
          db_port: formVals.db_port,
          db_name: formVals.db_name,
          db_user: formVals.db_user,
          db_passwd: formVals.db_passwd,
          es_http_port: formVals.es_http_port,
          es_tcp_port: formVals.es_tcp_port,
          del: String(formVals.del),
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
