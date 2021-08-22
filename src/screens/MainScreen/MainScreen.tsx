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
import routeNames from "../../navigation/routeNames";
import { Repository, User } from "../../models/models";

const compareFunction = (a: any, b: any) => {
  if (a.id > b.id) return 1;
  if (a.id < b.id) return -1;
  return 0;
};

const fetchRepositories = () => {
  return axios
    .get("repositories")
    .then(({ data }) => {
      return data;
    })
    .catch((e) => console.log("e all repos", e));
};

const fetchUsers = () => {
  return axios
    .get("users")
    .then(({ data }) => {
      return data;
    })
    .catch((e) => console.log("e all users", e));
};

const fetchByQuery = async (q: string) => {
  const users = await axios
    .get("search/users", { params: { q } })
    .then(({ data }) => {
      return data.items;
    })
    .catch((e) => console.log("e search user", e));
  const repos = await axios
    .get("search/repositories", { params: { q } })
    .then(({ data }) => {
      return data.items;
    })
    .catch((e) => console.log("e search repos", e));

  return [...users, ...repos];
};

interface IProps {
  navigation: NavigationProp<StackMainScreen>;
}

const MainScreen: FC<IProps> = ({ navigation }) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [results, setResults] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);

  const [searchValue, setSearchValue] = useState("");
  const throttled = useRef(
    throttle((newValue) => {
      if (newValue !== "")
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
    setResults(
      (arr) =>
        [...repositories, ...users].sort(compareFunction) as
          | Repository[]
          | User[]
    );
  }, [repositories, users]);

  useEffect(() => {
    if (searchValue === "") setFilteredResults(results);
    throttled.current(searchValue);
  }, [searchValue]);

  const renderItem = (item: any) => {
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
          item.login &&
            navigation.navigate(routeNames.MainFlow.UserDetails, {
              login: item.login,
            });
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
