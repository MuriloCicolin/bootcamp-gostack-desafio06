import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Star from './pages/Repository';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      headerBackTitleVisible={false}
      headerLayoutPreset="center"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7159c1',
        },

        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ title: 'Main'}}
        />

      <Stack.Screen
        name="User"
        component={User}
        options={({ route }) => ({ title: route.params.user.name})}
        // options={{title: 'Usuários'}}

      />

      <Stack.Screen
        name="Star"
        component={Star}
        options={({ route }) => ({ title: route.params.star.name})}
        headerTruncatedBackTitle={false}
        headerBackAllowFontScaling={true}
      />

    </Stack.Navigator>
  )
}
