import { Ionicons } from "@expo/vector-icons";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Ionicons name="information-circle" size={40} color="red" style={styles.iconCenter} />
      <Text style={styles.title}>Hello World</Text>
      <TextInput placeholder="up gess.." style={styles.input} />
      <View style={styles.buttonContainer}>
        <Button title="Click Me" />
        <Ionicons name="hand-left" size={24} color="black" style={styles.iconHand} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    padding: 20,
  },
  iconCenter: {
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "blue",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  iconHand: {
    marginLeft: 8,
  },
});
