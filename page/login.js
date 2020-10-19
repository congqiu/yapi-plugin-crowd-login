import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Icon, message } from 'antd';
import axios from 'axios';
const FormItem = Form.Item;

const formItemStyle = {
  marginBottom: '.16rem'
};

const changeHeight = {
  height: '.42rem'
};

class Login extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    form: PropTypes.object
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = this.props.form;
    form.validateFields(async (err, values) => {
      if (!err) {
        let result = await axios.post('/api/user/login_by_token', values);
        if (result.request.responseURL.indexOf("/group") !== -1) {
          message.success('登录成功! ');
          window.location.reload();
        } else {
          message.error('登录失败，请确认用户名密码是否正确！');
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        {/* 用户名  */}
        <FormItem style={formItemStyle}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }]              
          })(
            <Input
              style={changeHeight}
              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
              placeholder="用户名"
            />
          )}
        </FormItem>

        {/* 密码 */}
        <FormItem style={formItemStyle}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }]
          })(
            <Input
              style={changeHeight}
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </FormItem>

        {/* 登录按钮 */}
        <FormItem style={formItemStyle}>
          <Button
            style={changeHeight}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}
const LoginForm = Form.create()(Login);

export default LoginForm;