import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {

  const [courseGoal, setCourseGoal] = useState([]);

  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (addedGoal) => {
    setCourseGoal(currentGoals => [...currentGoals, { key: Math.random().toString(), value: addedGoal }]);
    setIsAddMode(false)
  }

  const modeHandler = () => {
    setIsAddMode(true)
  }

  const removeGoalHandler = (goalId) => {
    setCourseGoal(currentGoals => {
      return currentGoals.filter((goal) => goal.key !== goalId)
    })
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false)
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={modeHandler} />
      <GoalInput
        onCancel={cancelGoalAdditionHandler}
        onAddGoal={addGoalHandler}
        visible={isAddMode} />
      <FlatList
        data={courseGoal}
        renderItem={itemData => <GoalItem id={itemData.item.key} title={itemData.item.value} onDelete={removeGoalHandler} />} />
    </View >
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30
  },
});
