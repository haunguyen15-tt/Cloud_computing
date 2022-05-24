import React from 'react';
import { View, FlatList, Text } from 'react-native';

const Profile = () => {
  const [data, setData] = React.useState([]);

  const testApi = async () => {
    try {
      const res = await fetch('http://192.168.43.35:3000/api/v1/tours');
      const json = await res.json();
      setData(json.data.tours);
      console.log(json.data.tours);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    testApi();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>
              {item.name}, {item.price}
            </Text>
          )}
        />
      }
    </View>
  );
};

export default Profile;
