import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router"

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4f46e5",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          height: 74,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 1,
          borderTopColor: "#eceef3",
          backgroundColor: "#ffffff",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="movies"
        options={{
          title: "영화",
          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="film-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="reservations"
        options={{
          title: "예매",
          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="ticket-outline"
              color={color}
              size={size}
            />
          ),          
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "내 정보",
          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="person-circle-outline"
              color={color}
              size={size}
            />
          ),          
        }}
      />            
    </Tabs>
  );
};

export default TabLayout;