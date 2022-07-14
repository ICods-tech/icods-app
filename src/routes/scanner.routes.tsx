import { createStackNavigator } from "@react-navigation/stack";
import Editor from "../pages/Editor";
import Scanner from "../pages/Scanner";

const { Navigator, Screen } = createStackNavigator();

export const ScannerRoutes = () => {
  return (
    <Navigator>
      <Screen name="Scanner" component={Scanner} />
      <Screen name="Editor" component={Editor} />

    </Navigator>
  )
}