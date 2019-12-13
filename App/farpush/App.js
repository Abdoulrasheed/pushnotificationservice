import React, {Fragment} from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  RefreshControl, 
  View,
  Text
} from 'react-native';


import FlatListItems from './components/FlatListItems';

const App = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
      return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
        <View>
          <FlatListItems />
        </View>
      </ScrollView>
    );
    setRefreshing(true);
  }, [refreshing]);

  return (
    <View>
      <View style={styles.appHeader}>
        <Text style={ styles.appHeaderText }>IMT NOTIFICATION SYSTEM</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
        <View>
          <FlatListItems />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({    
  scrollView: {
    backgroundColor: "#192338",
  },

  appHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    fontSize: 70,
    padding: 10,
  },

  appHeaderText:{
    fontFamily: 'poppins',
    fontWeight: 'bold',
    letterSpacing: 5,
  }
});

export default App;
