import React, {useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import {StatusBar, StyleSheet, View, Button, Modal} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const TestModal: React.FC<{isVisible: boolean; toggleModal: () => void}> = ({
  isVisible,
  toggleModal,
}) => {
  const [useInsetMethod, setUseInsetMethod] = useState(false);
  const [useReactNativeModal, setUseReactNativeModal] = useState(false);

  const insets = useSafeAreaInsets();
  // Manually set the insets works
  const manualPadding = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
  };

  const toggleInset = () => {
    setUseInsetMethod(!useInsetMethod);
  };

  const toggleUseModal = () => {
    setUseReactNativeModal(!useReactNativeModal);
  };

  if (!isVisible) {
    return null;
  }

  if (useReactNativeModal) {
    <ReactNativeModal isVisible={true}>
      <SafeAreaView
        style={[useInsetMethod ? manualPadding : null, styles.safeAreaStyle]}>
        <View style={styles.yellowBackground}>
          <Button title="Close modal" onPress={toggleModal} />
          <Button
            title={
              useInsetMethod
                ? 'Change to SafeAreaView'
                : 'Change to use useSafeAreaInsets'
            }
            onPress={toggleInset}
          />
          <Button
            title={
              useInsetMethod
                ? 'Change to Using React Native default Modal'
                : 'Change to use React NativeModal'
            }
            onPress={toggleInset}
          />
        </View>
      </SafeAreaView>
    </ReactNativeModal>;
  }

  return (
    <Modal>
      <SafeAreaView
        style={[useInsetMethod ? manualPadding : null, styles.safeAreaStyle]}>
        <View style={styles.yellowBackground}>
          <Button title="Close modal" onPress={toggleModal} />
          <Button
            title={
              useInsetMethod
                ? 'Change to SafeAreaView'
                : 'Change to use useSafeAreaInsets'
            }
            onPress={toggleInset}
          />
          <Button
            title={
              useReactNativeModal
                ? 'Change to Using React Native default Modal'
                : 'Change to use react-native-modal'
            }
            onPress={toggleUseModal}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const App = () => {
  const [ModalIsVisible, setModalIsVisible] = React.useState(false);

  const toggleModal = () => {
    setModalIsVisible(!ModalIsVisible);
  };

  return (
    <SafeAreaProvider>
      <StatusBar />
      <View style={styles.container}>
        <Button title="Open Modal" onPress={toggleModal} />
      </View>
      <TestModal isVisible={ModalIsVisible} toggleModal={toggleModal} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: 'blue',
  },
  modalStyle: {},
  yellowBackground: {
    backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
