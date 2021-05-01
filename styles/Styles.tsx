import { StyleSheet } from 'react-native';

export const listStyles = StyleSheet.create({
  item: {
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
});

export const containerStyles = StyleSheet.create({
  globalContainer: {
    padding: 30,
    paddingBottom: 0
  }
})