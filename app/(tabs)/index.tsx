import { api } from '@/convex/_generated/api';
import useTheme, { ColorScheme } from '@/hooks/useTheme';
import { useQuery } from "convex/react";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function index() {
  const { colors } = useTheme();
  const todos = useQuery(api.todos.getTodos);
  const styles = createStyles(colors);
  console.log(todos);
  return (
    <View style={styles.container}>
      <Text>index screen</Text>
    </View>
  )
}

const createStyles=(colors:ColorScheme)=>{
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.bg,
    },
  })
}