import { useEffect, useRef } from 'react';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { App, Form, Input  } from 'antd';
import { useForm } from 'react-hook-form';
import { setLoading } from '@/redux/Slice/AuthSlice';
import { IUserRegister } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/special';
import StyleProvider from './cssFormRegister';

import { ButtonActiveHover } from '@/components/MiniComponent';
import { getTheme } from '@/util/theme';
import { useCreateUserForAdmin } from '@/hooks/mutation';

const FormRegister= () => {
  useAppSelector(state => state.theme.changed);
  const { themeColorSet } = getTheme();

  const { mutateCreateUserForAdmin } = useCreateUserForAdmin();

  const { loading, errorRegister, countErrorRegister } = useAppSelector(
    state => state.auth
  );

  const countRef = useRef(countErrorRegister);

  const dispatch = useAppDispatch();
  const { notification } = App.useApp();

  const onSubmit = (values: IUserRegister) => {
    dispatch(setLoading(true));
    mutateCreateUserForAdmin(values);
  };

  useEffect(() => {
    if (errorRegister && countRef.current < countErrorRegister) {
      notification.error({
        message: 'Register failed!',
        description: errorRegister
      });
      countRef.current = countErrorRegister;
    }
  }, [countErrorRegister]);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: ''
    }
  });

  console.log(form.getValues());

  return (
    <StyleProvider theme={themeColorSet}>
      <div className=''>
        <Form
          name='newAccount'
          className='mt-5 formAccount'
          onFinish={form.handleSubmit(onSubmit)}
          autoComplete='off'>
          <Form.Item
            name='firstname'
            rules={[
              {
                required: true,
                message: 'Please input your firstname!'
              }
            ]}>
            <Input
              placeholder='Full name'
              allowClear
              prefix={<UserOutlined />}
              onChange={e => {
                form.setValue('name', e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your E-mail!'
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              }
            ]}>
            <Input
              placeholder='Email'
              allowClear
              prefix={<MailOutlined />}
              onChange={e => {
                form.setValue('email', e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
            hasFeedback>
            <Input.Password
              placeholder='Password'
              onChange={e => {
                form.setValue('password', e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name='confirm'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                }
              })
            ]}>
            <Input.Password
              placeholder='Confirm Password'
              onChange={e => {
                form.setValue('confirm', e.target.value);
              }}
            />
          </Form.Item>
          <ButtonActiveHover
            loading={loading}
            type='primary'
            className='buttonCreate mt-3'>
            Create account
          </ButtonActiveHover>
        </Form>
      </div>
    </StyleProvider>
  );
};

export default FormRegister;
