import { StyleSheet } from "react-native";

export const repoColor = "rgba(10, 255, 75,0.5)";
export const userColor = "rgba(82, 102, 255,0.5)";

export default StyleSheet.create({
  legendUser: {
    backgroundColor: userColor,
    width: 15,
    height: 15,
    marginRight: 5,
  },
  legendRepo: {
    backgroundColor: repoColor,
    width: 15,
    height: 15,
    marginRight: 5,
  },
});
