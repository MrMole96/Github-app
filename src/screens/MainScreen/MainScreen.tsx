import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import SearchInput from "../../components/SearchInput";
import styles, { repoColor, userColor } from "./styles";
import throttle from "lodash/throttle";
import { useRef } from "react";
import { StackMainScreen } from "../../navigation/Navigation";
import { NavigationProp } from "@react-navigation/native";
import { FC } from "react";

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

const fetchByQuery = async (q: string) => {
  const users = await axios
    .get("https://api.github.com/search/users", { params: { q } })
    .then(({ data }) => {
      return data.items;
    })
    .catch((e) => console.log("e", e));
  const repos = await axios
    .get("https://api.github.com/search/repositories", { params: { q } })
    .then(({ data }) => {
      return data.items;
    })
    .catch((e) => console.log("e", e));
  //   console.log("users", users);
  //   console.log("repos", repos);
  return [...users, ...repos];
};

interface IProps {
  navigation: NavigationProp<StackMainScreen>;
}

const MainScreen: FC<IProps> = ({ navigation }) => {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [results, setResults] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);

  const [searchValue, setSearchValue] = useState("");
  const throttled = useRef(
    throttle((newValue) => {
      fetchByQuery(newValue).then((filtered) => {
        setFilteredResults(filtered);
      });
    }, 3000)
  );

  useEffect(() => {
    fetchRepositories().then((data) => setRepositories(data));
    fetchUsers().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    setResults((arr) => [...repositories, ...users].sort(compareFunction));
  }, [repositories, users]);

  useEffect(() => {
    if (searchValue === "") setFilteredResults(results);
    throttled.current(searchValue);
  }, [searchValue]);

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
        onPress={() => {
          item.login && navigation;
        }}
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
        placeholder="Search by login or name"
        setSearch={setSearchValue}
        customStyle={{ marginVertical: 10 }}
      />
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={filteredResults.length === 0 ? results : filteredResults}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};

export default MainScreen;
