import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useRef } from 'react'

const icons = {
  index: ['home', 'home-outline'],
  search: ['search', 'search-outline'],
  saved: ['heart', 'heart-outline'],
  profile: ['person', 'person-outline'],
}

function TabItem({ route, index, state, descriptors, navigation }) {
  const focused = state.index === index
  const progress = useRef(new Animated.Value(focused ? 1 : 0)).current

  useEffect(() => {
    Animated.spring(progress, {
      toValue: focused ? 1 : 0,
      useNativeDriver: true,
      friction: 7,
      tension: 80,
    }).start()
  }, [focused])

  const [activeIcon, inactiveIcon] = icons[route.name] || [
    'ellipse',
    'ellipse-outline',
  ]

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    })

    if (!focused && !event.defaultPrevented) {
      navigation.navigate(route.name)
    }
  }

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  })



  return (
    <Pressable onPress={onPress} style={styles.item}>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            
            transform: [{ scale }],
          },
        ]}
      >
        <Ionicons
          name={focused ? activeIcon : inactiveIcon}
          size={24}
          color={focused ? '#ffffff' : '#777777'}
        />
      </Animated.View>

      <Animated.Text
        style={[
          styles.label,
          {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
            transform: [
              {
                translateY: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 5],
                }),
              },
            ],
          },
        ]}
      >
        {descriptors[route.key].options.title || route.name}
      </Animated.Text>
    </Pressable>
  )
}

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => (
          <TabItem
            key={route.key}
            route={route}
            index={index}
            state={state}
            descriptors={descriptors}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  )
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  tabBar: {
    height: 72,
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    elevation: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },
  item: {
    flex: 1,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 48,
    width:48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C3EF4',
  },
  label: {
    position: 'absolute',
    bottom: 2,
    fontSize: 11,
    fontWeight: '600',
    color: '#555555',
  },
})