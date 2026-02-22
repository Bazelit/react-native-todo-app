import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "@/src/hooks/use-theme";
import { View, StyleSheet, Platform } from "react-native";

const TabsLayout = () => {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          ...styles.tabBar,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarBackground: () => (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.surface }]} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: colors.primary + '20' }]}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={focused ? 26 : 24} 
                color={color} 
              />
            </View>
          ),
          animation: "shift",
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: colors.primary + '20' }]}>
              <Ionicons 
                name={focused ? "search" : "search-outline"} 
                size={focused ? 26 : 24} 
                color={color} 
              />
            </View>
          ),
          animation: "shift",
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="add"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={[styles.addButton, { backgroundColor: colors.primary }]}>
              <Ionicons 
                name="add" 
                size={32} 
                color="#fff" 
              />
            </View>
          ),
          animation: "shift",
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: colors.primary + '20' }]}>
              <Ionicons 
                name={focused ? "heart" : "heart-outline"} 
                size={focused ? 26 : 24} 
                color={color} 
              />
            </View>
          ),
          animation: "shift",
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: colors.primary + '20' }]}>
              <Ionicons 
                name={focused ? "settings" : "settings-outline"} 
                size={focused ? 26 : 24} 
                color={color} 
              />
            </View>
          ),
          animation: "shift",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default TabsLayout;