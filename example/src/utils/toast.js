/**
 * @component Toast.js
 * @description toast 弹层工具
 * @time 2018/5/11
 * @author JUSTIN XU
 */
import React from 'react';
import styled from 'styled-components';
import { ActivityIndicator } from 'react-native';
import RootToast from 'js-root-toast';

// static source
import succeedIcon from '../images/succeed.png';
import warningIcon from '../images/warning.png';
import errorIcon from '../images/error.png';

const ContainerView = styled.View`
  width: 181px;
  min-height: 105px;
  justify-content: center;
  align-items: center;
`;

const ImageIcon = styled.Image`
  width: 39px;
  height: 39px;
`;

const MessageText = styled.Text`
  color: #fff;
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
  line-height: 15px;
`;

const SuccessText = styled.Text`
  color: #000000;
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
  line-height: 15px;
`;

const Toast = {
  toast: null,
  hide(callback) {
    if (!this.toast) return;
    RootToast.hide(this.toast);
    this.toast = null;
    typeof callback === 'function' ? callback && callback() : null;
  },
  clearTime() {
    if (!this.timer) return;
    clearTimeout(this.timer);
    this.timer = null;
  },
  /** 基础Toast配置
   * @param content 内容
   * @param options 配置
   * @param callback 回调函数
  * */
  basicToast(content, { position = 0, duration = 2000, ...restProps } = {}, callback) {
    // only show one
    if (this.toast) {
      this.hide();
    }
    this.toast = RootToast.show(content, {
      position,
      duration,
      onHidden: () => {
        this.hide(callback);
        this.clearTime();
      },
      ...restProps,
    });
    // not auto hide
    if (duration === 0) return;
    this.timer = setTimeout(() => {
      this.hide(callback);
    }, duration);
  },
  showText(msg, options, callback) {
    if (!(typeof msg === 'number' || typeof msg === 'string')) {
      throw new TypeError('type only support number or string');
    }
    msg = msg.toString();
    if (!msg) {
      throw new Error('params cannot include any spaces');
    }
    this.basicToast(msg, {
      opacity: 1,
      ...options,
    }, callback);
  },
  showLoading(node, options, callback) {
    if (!React.isValidElement(node)) {
      node = (
        <ContainerView>
          <ActivityIndicator
            size="large"
            color="#ffffff"
          />
          {
            node ? (
              <MessageText>{node}</MessageText>
            ) : null
          }
        </ContainerView>
      );
    }
    this.basicToast(node, {
      position: RootToast.positions.CENTER,
      backgroundColor: 'rgba(0, 0, 0, .6)',
      hideOnPress: false,
      opacity: 1,
      duration: 0,
      ...options,
    }, callback);
  },
  showSuccess(node, options, callback) {
    if (!node && node !== 0) {
      throw new Error('params cannot include any spaces');
    }
    if (!React.isValidElement(node)) {
      node = (
        <ContainerView>
          <ImageIcon source={succeedIcon} />
          <SuccessText>{node}</SuccessText>
        </ContainerView>
      );
    }
    this.basicToast(node, {
      position: RootToast.positions.CENTER,
      backgroundColor: '#ffffff',
      opacity: 1,
      duration: 1000,
      ...options,
    }, callback);
  },
  showWarning(node, options, callback) {
    if (!node && node !== 0) {
      throw new Error('params cannot include any spaces');
    }
    if (!React.isValidElement(node)) {
      node = (
        <ContainerView>
          <ImageIcon source={warningIcon} />
          <SuccessText>{node}</SuccessText>
        </ContainerView>
      );
    }
    this.basicToast(node, {
      position: RootToast.positions.CENTER,
      backgroundColor: '#ffffff',
      opacity: 1,
      ...options,
    }, callback);
  },
  showError(node, options, callback) {
    if (!node && node !== 0) {
      throw new Error('params cannot include any spaces');
    }
    if (!React.isValidElement(node)) {
      node = (
        <ContainerView>
          <ImageIcon source={errorIcon} />
          <MessageText>{node}</MessageText>
        </ContainerView>
      );
    }
    this.basicToast(node, {
      position: RootToast.positions.CENTER,
      backgroundColor: '#000000',
      ...options,
    }, callback);
  },
};

export default Toast;
