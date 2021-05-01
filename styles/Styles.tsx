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
  item2: {
    marginVertical: 5,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    height: 50,
    alignItems: "center",
    flexDirection: "row"
  },
});

export const containerStyles = StyleSheet.create({
  globalContainer: {
    padding: 30,
    paddingBottom: 0
  }
})