import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api'

export default function App() {
  const [repos, setRepos] = useState([]);

    useEffect(() => {
        api.get('repositories').then(response => {
            console.log(response.data);
            setRepos(response.data);
        })
    }, [])

  async function handleLikeRepository(id) {
   const response = await api.post(`repositories/${id}/like`)

   const likedRepo = response.data;
  
   const repoUpdate = repos.map(repo => {
     if (repo.id === id) {
       return likedRepo;
     } else {
       return repo;
     }
   })

   setRepos([...repoUpdate])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repos}
          keyExtractor={repos => repos.id}
          renderItem={({ item: repos }) => (
          <>
            <Text style={styles.repository}>
              {repos.title}
            </Text>

            <View style={styles.techsContainer}>
              {repos.techs.map(tech => (
                <Text key={tech} style={styles.tech}>
                  {tech}
                </Text>
              ))}
            </View>

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                testID={`repository-likes-${repos.id}`}
              >
                {repos.likes} curtidas
              </Text>
            </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repos.id)}
            testID={`like-button-${repos.id}`} 
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
          </>
          )}
        >
        </FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
