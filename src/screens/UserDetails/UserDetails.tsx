import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { FC } from "react";
import { useEffect } from "react";
import { View, Text, Image } from "react-native";

interface IProps {
  route: RouteProp<any>;
}

const UserDetails: FC<IProps> = ({ route }) => {
  const { login } = route?.params;

  const [user, setUser] = useState({});

  console.log("user", user);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${login}`)
      .then((response) => setUser(response.data));
  }, []);

  return (
    <View>
      <Image source={{ uri: user.avatar_url }} />
      <View>
        <Text>{user.login}</Text>
        <Text>{user.login}</Text>
      </View>
    </View>
  );
};

export default UserDetails;
