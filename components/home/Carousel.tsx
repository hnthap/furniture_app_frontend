import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ImageStyle,
  View,
  ViewStyle,
} from "react-native";

export default function Carousel<T>({
  imageSources,
  imageStyle,
  scrollDuration,
  slideStyle,
  style,
}: {
  imageSources: ImageSourcePropType[];
  imageStyle?: ImageStyle;
  scrollDuration: number;
  slideStyle?: ViewStyle;
  style: ViewStyle;
}) {
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => {
        const temp = index + 1;
        const nextIndex = temp === imageSources.length ? 0 : temp;
        scrollTo(nextIndex);
        return nextIndex;
      });
    }, scrollDuration);
    return () => clearInterval(interval);
  }, []);

  function scrollTo(index: number) {
    if (ref.current) {
      ref.current.scrollToIndex({ animated: true, index });
    }
  }

  return (
    <FlatList
      ref={ref}
      data={imageSources}
      style={style}
      renderItem={({ item }) => (
        <Slide imageStyle={imageStyle} source={item} style={slideStyle} />
      )}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}

function Slide({
  imageStyle,
  source,
  style,
}: {
  imageStyle?: ImageStyle;
  source: ImageSourcePropType;
  style?: ViewStyle;
}) {
  return (
    <View style={style}>
      <Image source={source} style={imageStyle} />
    </View>
  );
}
