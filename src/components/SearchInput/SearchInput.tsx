import React from "react";
import { FC } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { View, Text, TextInput } from "react-native";

import styles from "./styles";

interface IProps {
  customStyle?: StyleProp<ViewStyle>;
  search: string;
  setSearch: (text: string) => void;
  placeholder: string;
}

const SearchInput: FC<IProps> = ({
  search,
  setSearch,
  placeholder,
  customStyle,
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: "#FFF",
          borderRadius: 10,
          paddingHorizontal: 15,
          paddingVertical: 8,
        },
        customStyle && customStyle,
      ]}
    >
      <TextInput
        placeholder={placeholder}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
    </View>
  );
};

export default SearchInput;
