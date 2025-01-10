import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  Text,
  Image,
} from "react-native";

import { router } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Slide {
  title: string;
  description: string;
  color: string;
  image: any;
}

interface LiquidSwipeProps {
  slides: Slide[];
  onSwipeComplete: () => void;
}

const LiquidSwipe: React.FC<LiquidSwipeProps> = ({
  slides,
  onSwipeComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.Value(0)).current;
  const animation = useRef(new Animated.Value(0)).current;
  const currentIndexRef = useRef(currentIndex);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dx) > 10;
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue(gesture.dx);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 50) {
          handleSwipeRight();
        } else if (gesture.dx < -50) {
          handleSwipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 50,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  const handleSwipeRight = () => {
    if (currentIndexRef.current === 0) {
      resetPosition();
      return;
    }
    Animated.timing(position, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      currentIndexRef.current -= 1;
      setCurrentIndex(currentIndexRef.current);
      position.setValue(0);
    });
  };

  const handleSwipeLeft = () => {
    if (currentIndexRef.current === slides.length - 1) {
      Animated.timing(position, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        router.push("/routes/login");
      });

      return;
    }

    Animated.timing(position, {
      toValue: -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      currentIndexRef.current += 1;
      setCurrentIndex(currentIndexRef.current);
      position.setValue(0);
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const currentSlide = slides[currentIndex];

  return (
    <View style={styles.container}>
      <View style={[styles.slide, { backgroundColor: currentSlide?.color }]}>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [{ translateY: animation }],
            },
          ]}
        >
          <Image source={currentSlide.image} style={styles.image} />
        </Animated.View>
        <Text style={styles.title}>{currentSlide?.title}</Text>
        <Text style={styles.description}>{currentSlide?.description}</Text>
      </View>

      <Animated.View
        style={[
          styles.overlay,
          {
            transform: [{ translateX: position }],
          },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  slide: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  imageContainer: {
    position: "absolute",
    top: 30,
    width: 400,
    height: 600,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default LiquidSwipe;
