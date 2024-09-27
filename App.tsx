import * as React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { PitchDetector } from 'react-native-pitch-detector';

export default function App() {
  const [data, setData] = React.useState({ tone: '--', frequency: 0 });
  const [isRecording, setIsRecording] = React.useState(false);

  const start = async () => {
    await PitchDetector.start();
    const status = await PitchDetector.isRecording();
    setIsRecording(status);
  };

  const stop = async () => {
    await PitchDetector.stop();
    const status = await PitchDetector.isRecording();
    setIsRecording(status);
  };

  React.useEffect(() => {
    PitchDetector.addListener(setData);
    return () => {
      PitchDetector.removeListener();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.tone}>{data?.tone}</Text>
          <Text style={styles.frequency}>{data?.frequency?.toFixed(1)}hz</Text>
        </View>
        <View style={isRecording ? { ...styles.status, ...styles.status_active } : styles.status} />
      </View>
      <View style={styles.button_line} />
      <TouchableHighlight
        style={isRecording ? { ...styles.button, ...styles.button_playing } : styles.button}
        onPress={isRecording ? stop : start}
        underlayColor={isRecording ? '#bd4444' : 'green'}
      >
        <Text style={isRecording ? { ...styles.label, ...styles.label_stop_setup } : styles.label}>
          {isRecording ? '◼ ': '▶'}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  button_line: {
    position: 'absolute',
    height: 10,
    top: 525,
    width: '100%',
    borderColor: 'white',
    borderWidth: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6.27,
    elevation: 5,
  },

  wrapper: {
    alignItems: 'center',
    top: 20,
    gap: 40,
  },

  tone: {
    fontSize: 110,
  },

  frequency: {
    fontSize: 25,
  },

  button_playing: {
    backgroundColor: '#ff8563'
  },

  button: {
    marginTop: 20,
    backgroundColor: '#4ebd44',
    borderColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,
    borderWidth: 8,
    top: 60,
    width: 120,
    height: 120,
    alignItems: 'center',
    borderRadius: 300,
    justifyContent: 'center',
  },

  label_stop_setup: {
    bottom: 11,
    left: 8,
  },

  label: {
    color: 'white',
    fontSize: 70,
    bottom: 7,
    left: 4,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowRadius: 2
  },

  status_active: {
    backgroundColor: '#06C000',
    shadowOpacity: 1.0,
    elevation: 10,
    shadowRadius: 10,
    shadowOffset: {
      width: -1,
      height: -1,
    },
    shadowColor: '#059800'
  },

  status: {
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    borderWidth: 5,
    borderRadius: 300,
    borderColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1.0,
    shadowRadius: 1,
    elevation: 1,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
