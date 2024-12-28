import { Text, View } from "react-native";
import SearchInput from "./SearchInput";
import { welcomeStyles } from "./style";

type WelcomeProps = {
  openSearch: () => void;
};

export default function Welcome({ openSearch }: WelcomeProps) {
  return (
    <>
      <View style={welcomeStyles.container}>
        <Text style={[welcomeStyles.text, welcomeStyles.text1]}>Linh Thap</Text>
        <Text style={[welcomeStyles.text, welcomeStyles.text2]}>
          Furniture Hub
        </Text>
      </View>
      <SearchInput
        query={""}
        setQuery={() => {}}
        search={openSearch}
        onPressInput={openSearch}
      />
    </>
  );
}
