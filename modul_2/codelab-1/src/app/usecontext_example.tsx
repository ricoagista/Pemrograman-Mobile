import { createContext, useContext, useState } from "react";
import { Button, Text, View, useWindowDimensions } from "react-native";

const ThemeContext = createContext<any>(null);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Home />
    </ThemeContext.Provider>
  );
}

function Home() {
  return <Profile />;
}
function Profile() {
  return <UserCard />;
}
function UserCard() {
  return <UserName />;
}

function UserName() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.darkMode;
  const setDarkMode = theme.setDarkMode;
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        width,
        height,
        backgroundColor: darkMode ? "black" : "white",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Text style={{ color: darkMode ? "white" : "black", fontSize: 20 }}>
        {darkMode ? "Dark Mode" : "Light Mode"}
      </Text>
      <Button title="Toggle Theme" onPress={() => setDarkMode(!darkMode)} />
    </View>
  );
}
