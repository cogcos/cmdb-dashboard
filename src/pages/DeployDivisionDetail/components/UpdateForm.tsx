import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Modal, Select, Radio } from 'antd';
const { Option } = Select;

import { DivisionListItem } from '../data';
import { RoleList, Ec2List } from '../index';

export interface FormValueType extends Partial<DivisionListItem> {
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
  values: Partial<DivisionListItem>;
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
  const { targetid } = props;
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    name: props.values.name,
    remark: props.values.remark,
    role_id: props.values.role_id,
    ec2_id: props.values.ec2_id,
    project_id: props.values.project_id,
    deploy: String(props.values.deploy),
    del: String(props.values.del),
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
        <FormItem
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="remark"
          label="备注"
          rules={[{ required: true, message: '请输入名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <RoleList />
        <Ec2List targetid={formVals.project_id}/>
        <Form.Item label="部署状态" name="deploy">
          <Radio.Group  buttonStyle="solid">
            <Radio.Button value="0">未部署</Radio.Button>
            <Radio.Button value="1">成功</Radio.Button>
            <Radio.Button value="2">失败</Radio.Button>
          </Radio.Group>
        </Form.Item>
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
          remark: formVals.remark,
          role_id: formVals.role_id,
          ec2_id: formVals.ec2_id,
          deploy: formVals.deploy,
          del: formVals.del,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
