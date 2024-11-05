import React, { useState, useEffect } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ route }) => {
  const { username } = route.params;
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadDarkModeSetting = async () => {
      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        setIsDarkMode(JSON.parse(savedDarkMode));
      }
    };
    loadDarkModeSetting();
  }, []);

  const toggleDarkMode = async () => {
    setIsDarkMode(!isDarkMode);
    await AsyncStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#f0f0f0' }]}>
      {/* Profile Header */}
      <Image source={require('../assets/pamila.jpg')} style={styles.profileImage} />
      <Text style={[styles.username, { color: isDarkMode ? '#fff' : '#000' }]}>{username}</Text>
      <Text style={[styles.status, { color: isDarkMode ? '#bbb' : '#555' }]}>Active User</Text>
      
      {/* Menu Options */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={[styles.menuText, { color: isDarkMode ? '#fff' : '#000' }]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={[styles.menuText, { color: isDarkMode ? '#fff' : '#000' }]}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={[styles.menuText, { color: isDarkMode ? '#fff' : '#000' }]}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.switchContainer}>
        <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: 16 }}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#1E90FF',
    marginBottom: 15,
  },
  username: {
    fontSize: 26,
    fontWeight: '600',
  },
  status: {
    fontSize: 16,
    marginBottom: 30,
  },
  menu: {
    width: '85%',
    
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'left',
    marginBottom: 20,
  },
  menuItem: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
   
  },
  menuText: {
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'right',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    
  },
  signOutButton: {
    backgroundColor: '#FF5555',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  signOutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
