import { Image, Text, View } from "react-native";
import SearchInput from "./SearchInput";
import { welcomeStyles } from "./style";

type WelcomeProps = {
  openSearch: () => void;
};

export default function Welcome({ openSearch }: WelcomeProps) {
  return (
    <>
      <View style={welcomeStyles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          {/* Logo */}
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          {/* Text */}
          <View>
            <Text style={[welcomeStyles.text, welcomeStyles.text1]}>
              Linh Thap
            </Text>
            <Text style={[welcomeStyles.text, welcomeStyles.text2]}>
              Furniture Hub
            </Text>
          </View>
        </View>
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
