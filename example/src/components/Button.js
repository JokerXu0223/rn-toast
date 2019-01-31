/**
 * @component Button.js
 * @description 提供loading和disabled状态的按钮组件
 * @time 2018/1/25
 * @author JUSTIN XU
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContainerView = styled.TouchableOpacity.attrs({
  activeOpacity: 0.65,
})`
  background-color: ${props => (props.disabled && !props.loading) ? '#aaaaaa' : props.backgroundColor};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  width: ${props => props.width || '100%'};
  height: ${props => props.height};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 3px;
`;

const LabelText = styled.Text`
  color: ${props => props.textColor};
  font-size: ${props => props.textSize};
  padding-left: 3px;
`;

const LoadingIcon = styled.ActivityIndicator``;

class Button extends React.PureComponent {
  renderLoading = () => {
    const {
      disabled,
      loading,
      textColor,
    } = this.props;
    if (disabled) return null;
    if (loading) {
      return (
        <LoadingIcon size="small" color={textColor} />
      );
    }
    return null;
  };
  renderChildren = () => {
    const {
      text,
      textColor,
      textSize,
      children,
    } = this.props;
    if (children) return children;
    return (
      <LabelText textColor={textColor} textSize={textSize}> {text} </LabelText>
    );
  };
  render() {
    const {
      style,
      disabled,
      loading,
      onPress,
      width,
      height,
      backgroundColor,
    } = this.props;
    return (
      <ContainerView
        style={style}
        backgroundColor={backgroundColor}
        disabled={!!loading || !!disabled}
        loading={!!loading}
        onPress={onPress}
        width={width}
        height={height}
        activeOpacity={0.7}
      >
        {this.renderLoading()}
        {this.renderChildren()}
      </ContainerView>
    );
  }
}

Button.defaultProps = {
  style: {},
  disabled: false,
  loading: false,
  text: '确定',
  onPress: null,
  textColor: '#ffffff',
  textSize: 16,
  width: null,
  height: 50,
  backgroundColor: '#e4393c',
  children: null,
};

Button.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  loading: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  text: PropTypes.string,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
