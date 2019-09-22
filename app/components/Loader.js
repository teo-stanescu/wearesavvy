import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Dimensions
} from 'react-native';

const height = Dimensions.get('window').height;

const Loader = props => {
  const { loading } = props;
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={loading}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>
      <View style={styles.modalBackground} />
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator
          animating={loading} />
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    opacity: 0.4,
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(255,255,255,1)',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    opacity: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: (height - 100) / 2
  }
});

export default Loader;