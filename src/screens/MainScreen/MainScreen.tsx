import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import SearchInput from "../../components/SearchInput";
import styles, { repoColor, userColor } from "./styles";

const compareFunction = (a: any, b: any) => {
  if (a.id > b.id) return 1;
  if (a.id < b.id) return -1;
  return 0;
};

const fetchRepositories = () => {
  return axios
    .get("https://api.github.com/repositories")
    .then(({ data }) => {
      return data;
    })
    .catch((e) => console.log("e", e));
};

const fetchUsers = () => {
  return axios
    .get("https://api.github.com/users")
    .then(({ data }) => {
      return data;
    })
    .catch((e) => console.log("e", e));
};

const MainScreen = () => {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [results, setResults] = useState<any[]>([]);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchRepositories().then((data) =>
      setRepositories((arr) => [...arr, ...data])
    );
    fetchUsers().then((data) => setUsers((arr) => [...arr, ...data]));
  }, []);

  useEffect(() => {
    setResults((arr) => [...repositories, ...users].sort(compareFunction));
  }, [repositories, users]);

  console.log("results", results);

  const renderItem = (item: { id: number; name: string; login: string }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: item.login ? userColor : repoColor,
          marginVertical: 5,
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
        onPress={() => {}}
      >
        <Text>{item.id}</Text>
        <Text>{item.name}</Text>
        <Text>{item.login}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ marginHorizontal: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.legendUser} />
        <Text>User</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.legendRepo} />
        <Text>Repositorium</Text>
      </View>
      <SearchInput
        search={searchValue}
        setSearch={setSearchValue}
        customStyle={{ marginVertical: 10 }}
      />
      <FlatList
        data={results}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};

export default MainScreen;
