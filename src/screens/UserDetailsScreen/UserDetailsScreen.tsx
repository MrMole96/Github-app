import React, { FC, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

import { RouteProp } from "@react-navigation/native";
import axios from "axios";

import { UserDetails } from "../../models/models";
import { StackMainScreen } from "../../navigation/Navigation";
import routeNames from "../../navigation/routeNames";

import styles from "./styles";

interface IProps {
  route: RouteProp<
    StackMainScreen,
    typeof routeNames.MainFlow.UserDetailsScreen
  >;
}

const UserDetailsScreen: FC<IProps> = ({ route }) => {
  const { login } = route?.params;

  const [user, setUser] = useState<UserDetails>({} as UserDetails);

  useEffect(() => {
    axios.get(`users/${login}`).then((response) => setUser(response.data));
  }, []);

  return (
    <View>
      <Image style={styles.image} source={{ uri: user.avatar_url }} />
      <View>
        <View style={styles.flexRowDirection}>
          <Text>Login:</Text>
          <Text style={styles.detailsText}>{user.login}</Text>
        </View>
        <View style={styles.flexRowDirection}>
          <Text>Followers:</Text>
          <Text style={styles.detailsText}>{user.followers}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserDetailsScreen;
