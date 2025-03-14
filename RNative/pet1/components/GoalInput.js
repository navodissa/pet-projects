import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Modal } from 'react-native';

const GoalInput = props => {

    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText)
    }

    const addGoalHandler = () => {
        props.onAddGoal(enteredGoal)
        setEnteredGoal('')
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <TextInput placeholder="Course Goal"
                    style={styles.input}
                    onChangeText={goalInputHandler}
                    value={enteredGoal} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="CANCEL" color="red" onPress={props.onCancel} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Add"
                            onPress={addGoalHandler} />
                    </View>
                </View>
            </View >
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center',
    },
    input: {
        borderColor: 'gray', borderWidth: 1, padding: 2, width: '85%', marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row', justifyContent: 'space-between', width: '60%'
    },
    button: {
        width: '40%'
    }
});


export default GoalInput
