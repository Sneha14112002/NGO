import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IsChild = () => {
    const navigation = useNavigation();
    const [isChildPresent, setIsChildPresent] = useState(false);
    const [anganwadiNo, setAnganwadiNo] = useState('');
    const [childsName, setChildsName] = useState('');

    const handleFormSubmit = async () => {
        try {
            // Prepare the data to send to the server
            const requestData = {
                anganwadiNo,
                childsName,
            };

            const response = await fetch('http:/192.168.1.16:3000/checkDataMedical', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.status === 200) {
                // Data exists in the database, you can navigate to the next screen or perform other actions
                console.log('Data exists in the database');
                console.log(childsName, anganwadiNo);
                navigation.navigate('ChildReport', { anganwadiNo, childsName });
            } else {
                setIsChildPresent(true);
                ToastAndroid.showWithGravityAndOffset(
                    'Child does not have any medical history.',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    50,
                    180
                );
                // Data does not exist in the database

                console.log("Data doesn't exist in the database");
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleViewForm = () => {
        navigation.navigate('HomePage');
    };

    return (
        <ImageBackground
            source={require('../assets/bg21.jpg')} // Replace with the path to your image asset
            style={styles.backgroundImage}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.formContainer}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Anganwadi No.</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Anganwadi No."
                            value={anganwadiNo}
                            onChangeText={(text) => setAnganwadiNo(text)}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Child's Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Child's Name"
                            value={childsName}
                            onChangeText={(text) => setChildsName(text)}
                        />
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>

                    {isChildPresent && (
                        <TouchableOpacity style={styles.viewFormButton} onPress={handleViewForm}>
                            <Text style={styles.buttonText}>View Form</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    formContainer: {
        marginTop: 180,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white background
        borderRadius: 0.1,
        padding: 16,
        elevation: 3, // Add elevation for a subtle shadow on Android
        minHeight: 300, // Increase the minimum height of the form container

    },
    field: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    submitButton: {
        backgroundColor: 'teal',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 20, // Increased margin-top
        shadowColor: 'black', // Shadow color
        shadowOpacity: 0.5, // Shadow opacity
        shadowRadius: 5, // Shadow radius
        elevation: 3, // Elevation for Android
    },
    viewFormButton: {
        backgroundColor: 'teal',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: 'black', // Shadow color
        shadowOpacity: 0.5, // Shadow opacity
        shadowRadius: 5, // Shadow radius
        elevation: 3, // Elevation for Android
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
});

export default IsChild;