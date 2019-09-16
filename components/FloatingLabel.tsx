import React from "react";
import { Animated, StyleSheet } from "react-native";

interface FloatingLabelProps {
  visible: string;
}

class FloatingLabel extends React.Component<FloatingLabelProps, {}> {
  static initialPadding: number = 9;
  static initialOpacity: number = 0;
  static visiblePadding: number = 5;
  static visibleOpacity: number = 1;

  componentDidUpdate(prevProps: FloatingLabelProps){
    Animated.timing(new Animated.Value(prevProps.visible ? FloatingLabel.visiblePadding : FloatingLabel.initialPadding), {
      toValue: prevProps.visible ? 9 : 5,
      duration: 230
    }).start();

    return Animated.timing(new Animated.Value(prevProps.visible ? FloatingLabel.visibleOpacity : FloatingLabel.initialOpacity), {
      toValue: prevProps.visible ? 0 : 1,
      duration: 230
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.floatingLabel,
          {
            paddingTop: new Animated.Value(this.props.visible ? FloatingLabel.visiblePadding : FloatingLabel.initialPadding),
            opacity: new Animated.Value(this.props.visible ? FloatingLabel.visibleOpacity : FloatingLabel.initialOpacity)
          }
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  floatingLabel: {
    position: "absolute",
    top: 0,
    left: 0
  }
});

export default FloatingLabel;
