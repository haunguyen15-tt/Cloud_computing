import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from '../Screens/Message';
import MessagesScreen from '../Screens/HomeMessage';

const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomeMessage' component={MessagesScreen} />
      <Stack.Screen
        name='Chat'
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.userName,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}
export default function MessageNavigator() {
  return <MyStack />;
}
