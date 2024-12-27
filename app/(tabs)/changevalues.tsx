import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ChangeValues = () => {
  const [objectId, setObjectId] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleFetchData = async () => {
    if (objectId.trim() === '') return;
    const objectRef = doc(db, 'objects', objectId);
    const snapshot = await getDoc(objectRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      setTemperature(data.temperature || 0);
      setLatitude(data.latitude || 0);
      setLongitude(data.longitude || 0);
    } else {
      alert('Object not found!');
    }
  };

  const handleUpdateValues = async (newTemperature: number, newLatitude: number, newLongitude: number) => {
    if (objectId.trim() === '') {
      alert('Enter a valid object ID first.');
      return;
    }
    const objectRef = doc(db, 'objects', objectId);
    await setDoc(objectRef, { temperature: newTemperature, latitude: newLatitude, longitude: newLongitude }, { merge: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Sensor Values</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Object ID"
        value={objectId}
        onChangeText={setObjectId}
        onSubmitEditing={handleFetchData}
      />
      <Text style={styles.label}>Temperature</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const newTemperature = temperature - 1;
            setTemperature(newTemperature);
            handleUpdateValues(newTemperature, latitude, longitude);
          }}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={String(temperature)}
          onChangeText={(text) => {
            const newTemperature = Number(text);
            setTemperature(newTemperature);
            handleUpdateValues(newTemperature, latitude, longitude);
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const newTemperature = temperature + 1;
            setTemperature(newTemperature);
            handleUpdateValues(newTemperature, latitude, longitude);
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Latitude</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const newLatitude = latitude - 1;
            setLatitude(newLatitude);
            handleUpdateValues(temperature, newLatitude, longitude);
          }}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={String(latitude)}
          onChangeText={(text) => {
            const newLatitude = Number(text);
            setLatitude(newLatitude);
            handleUpdateValues(temperature, newLatitude, longitude);
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const newLatitude = latitude + 1;
            setLatitude(newLatitude);
            handleUpdateValues(temperature, newLatitude, longitude);
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Longitude</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const newLongitude = longitude - 1;
            setLongitude(newLongitude);
            handleUpdateValues(temperature, latitude, newLongitude);
          }}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={String(longitude)}
          onChangeText={(text) => {
            const newLongitude = Number(text);
            setLongitude(newLongitude);
            handleUpdateValues(temperature, latitude, newLongitude);
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const newLongitude = longitude + 1;
            setLongitude(newLongitude);
            handleUpdateValues(temperature, latitude, newLongitude);
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    width: '60%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default ChangeValues;