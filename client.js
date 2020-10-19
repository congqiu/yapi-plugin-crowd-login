import React, {Component} from 'react';
import {Button, Modal} from 'antd';
import Login from "./page/login";

module.exports = function (options) {
  class CrowdLogin extends Component {

    state = {
      visible: false,
      confirmLoading: false
    };

    showModal = () => {
      this.setState({
        visible: true
      });
    };
  
    handleCancel = () => {
      this.setState({
        visible: false
      });
    };
  
    render() {
      const { visible, confirmLoading } = this.state;
      options = options || {};
      return (
        <span>
          <Button type="primary" onClick={this.showModal} className="btn-home">
            {options.loginBtnText || "Crowd登录"}
          </Button>
          <Modal
            title="Atlassian Crowd认证登录"
            maskClosable={false}
            centered={true}
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            footer={null}
          >
            <Login />
          </Modal>
        </span>
      );
    }
  }

  this.bindHook('third_login', CrowdLogin);
};
