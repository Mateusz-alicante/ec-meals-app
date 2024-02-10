import { createStackNavigator } from "@react-navigation/stack";

import Dashbaord from "./Preferences";
import EditUser from "../Admin/Users/Modify";
import NotificationPreferences from "./NotificationPreference";

const Stack = createStackNavigator();

export default function AdminRouter({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        cardStyle: { flex: 1 },
      }}
    >
      <Stack.Screen name="Preferences Dashboard" component={Dashbaord} />
      <Stack.Screen name="Edit Account" component={EditUser} />
      <Stack.Screen
        name="Notification Preferences"
        component={NotificationPreferences}
      />
    </Stack.Navigator>
  );
}
