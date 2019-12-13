import React from 'react';
import { 
  SafeAreaView, 
  FlatList, 
  ActivityIndicator, 
  Text, 
  View, 
  StyleSheet
} from 'react-native';

export default class FlatListItems extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://farpush.pythonanywhere.com/api/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator 
            size="large" 
            color="#fff" 
            style={styles.activityIndicator}  
          />
        </View>
      )
    }

    return(
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.item}>{item.body}</Text>
            </View>
          )}
          keyExtractor={({id}, index) => id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  item: {
    backgroundColor: "#5c61ab",
    color: '#d5d7f2',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20
  },
  title: {
    paddingLeft: 20,
    paddingRight: 20,
    color: '#d5d7f2',
    fontSize: 20,
  },

  activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   },

  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 230
  }
});
