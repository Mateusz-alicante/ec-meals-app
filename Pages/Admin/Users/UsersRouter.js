import { createStackNavigator } from "@react-navigation/stack";

import Users from "./Users";
import ModifyUser from "./Modify";

const Stack = createStackNavigator();

export default function UserRouter({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Users List"
      screenOptions={{
        headerShown: false,
        cardStyle: { flex: 1 },
      }}
    >
      <Stack.Screen name="Users List" component={Users} />
      <Stack.Screen name="Modify User" component={ModifyUser} />
    </Stack.Navigator>
  );
}
