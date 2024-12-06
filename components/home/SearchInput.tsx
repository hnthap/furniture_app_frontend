import { Feather } from "@expo/vector-icons";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { searchInputStyles } from "./style";

export default function SearchInput({
  query,
  setQuery,
  search,
  icon,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  search: () => void;
  icon?: ReactNode;
}) {
  return (
    <View style={searchInputStyles.container}>
      <TouchableOpacity>
        <Feather name="search" size={24} style={searchInputStyles.icon} />
      </TouchableOpacity>
      <View style={searchInputStyles.inputWrapper}>
        <TextInput
          style={searchInputStyles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="What are you looking for?"
        />
      </View>
      <View>
        <TouchableOpacity style={searchInputStyles.button} onPress={search}>
          {icon ?? (
            <Feather
              name="search"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
