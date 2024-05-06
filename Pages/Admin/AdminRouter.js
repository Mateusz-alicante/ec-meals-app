import { createStackNavigator } from "@react-navigation/stack";

import Dashbaord from "./Dashbaord";
import UsersRouter from "./Users/UsersRouter";
import Meals from "./Meals/Meals";
import Diets from "./Diets/Diets";

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
      <Stack.Screen name="Dashboard" component={Dashbaord} />
      <Stack.Screen name="Users" component={UsersRouter} />
      <Stack.Screen name="Meals" component={Meals} />
      <Stack.Screen name="Diets" component={Diets} />
    </Stack.Navigator>
  );
}
