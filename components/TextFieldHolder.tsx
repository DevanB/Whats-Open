import React from "react";
import { Animated } from "react-native";

interface TextFieldHolderProps {
  withValue: string;
}

interface TextFieldHolderState {
  marginAnim: Value;
}

class TextFieldHolder extends React.Component<TextFieldHolderProps, TextFieldHolderState> {
  state = {
    marginAnim: new Animated.Value(this.props.withValue ? 10 : 0)
  };

  componentWillReceiveProps(newProps: TextFieldHolder) {
    return Animated.timing(this.state.marginAnim, {
      toValue: newProps.withValue ? 10 : 0,
      duration: 230
    }).start();
  }

  render() {
    return (
      <Animated.View style={{ marginTop: this.state.marginAnim }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default TextFieldHolder;
