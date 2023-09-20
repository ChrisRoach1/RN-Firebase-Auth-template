import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './screens/MainScreen';
import Login from './screens/Login';
import { User, onAuthStateChanged } from 'firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';




const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() =>{
    onAuthStateChanged(FIREBASE_AUTH, (user) =>{
      setUser(user);
    })
  })


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? 
        (
          <Stack.Screen name='Main' options={{headerShown: false}} component={MainScreen}/>

        ) : 
        (
          <Stack.Screen name='Login' options={{headerShown: false}} component={Login}/>
        )}

        </Stack.Navigator>      
        <StatusBar style="auto" />

    </NavigationContainer>

  );
}

