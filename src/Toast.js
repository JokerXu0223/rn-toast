import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer, { positions, durations } from './ToastContainer';

class Toast extends React.PureComponent {
  static positions = positions;
  static durations = durations;

  static show = (message, options = { position: positions.BOTTOM, duration: durations.SHORT }) => {
    return new RootSiblings(<ToastContainer {...options} visible>{message}</ToastContainer>);
  };

  static hide = (toast) => {
    if (toast instanceof RootSiblings) {
      toast.destroy();
    } else {
      console.warn(`Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`);
    }
  };

  static displayName = 'Toast';
  static propTypes = ToastContainer.propTypes;
  constructor(props) {
    super(props);
    this.toast = null;
  }

  componentWillMount = () => {
    this.toast = new RootSiblings(<ToastContainer
      {...this.props}
      duration={0}
    />);
    global.$RootToast = this.toast;
  };

  componentWillReceiveProps = (nextProps) => {
    this.toast.update(<ToastContainer
      {...nextProps}
      duration={0}
    />);
  };

  componentWillUnmount = () => {
    this.toast.destroy();
    global.$RootToast = null;
  };

  render() {
    return null;
  }
}

export default Toast;
