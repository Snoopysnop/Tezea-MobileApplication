import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import {
  StyleVariable,
  FontFamily,
  Color,
  FontSize,
  Border,
} from "../../GlobalStyles";
import { TabView, TabBar } from "react-native-tab-view";
import { useEffect } from "react";
import { TitleHeader } from "../../components/Header";
import MainApi from "../../api/MainApi";


const WorkSiteInfo = () => {



  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "image", icon: require("../../assets/information-545674-1.png") },
    { key: "text", icon: require("../../assets/userlist-9633874-1.png") },
  ]);


  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TitleHeader title='Réparation Antenne' subtitle='En Cours' isBlue={false} />,
    });
    fetchHeaderInfo();
  }, [])


  const fetchHeaderInfo = async() => {
    //await MainApi.getInstance().getUsers();
}


  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "image":
        return (
          <Image
            style={styles.image}
            contentFit="cover"
            source={require("../../assets/information-545674-1.png")}
          />
        );
      case "text":
        return (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              a dolor in sapien molestie porttitor. Pellentesque viverra rhoncus
              dolor, non pharetra nunc rutrum ullamcorper. Nam maximus est egestas
              odio ultricies, quis maximus sapien feugiat. Maecenas bibendum
              fringilla lorem, vitae pulvinar libero dignissim sit amet.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderTabBar = (
    props: React.ComponentProps<typeof TabBar>
  ) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Color.colorCornflowerblue }}
      style={{ backgroundColor: Color.colorWhitesmoke_100 }}
      labelStyle={{ color: Color.colorBlack }}
      renderIcon={({ route, focused }) => (
        <Image
          source={route.icon}
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? '#2E9A99' : '#748c94',
          }}
        />
      )}


    />
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,top: 20 }}>


      <Pressable
        style={[styles.dtailChantierItem, styles.dtailShadowBox, { top: 600, left: 72 }]}
        onPress={() =>  navigation.navigate("WorkSiteInProgress")}
      >
        <Text style={[styles.dmarrerLeChantier, styles.dmarrerLeChantierFlexBox]}>
          Démarrer le chantier
        </Text>
      </Pressable>


      <View style={[styles.dtailChantierInner, styles.dtailShadowBox]} >
    <View style={styles.desInfosSurContainer}>
      <Text style={[styles.desInfosSur, styles.desInfosSurTypo]}>
        {`Des infos sur le chantier`}
      </Text>
      <Text style={styles.blahBlahBlah}>
        {`blah blah blah`}
      </Text>
    </View>
    <Text style={styles.loremIpsumDolor1}>
      ZIZI ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a
      dolor in sapien molestie porttitor. Pellentesque viverra rhoncus
      dolor, non pharetra nunc rutrum ullamcorper. Nam maximus est egestas
      odio ultricies, quis maximus sapien feugiat. Maecenas bibendum
      fringilla lorem, vitae pulvinar libero dignissim sit amet.
    </Text>
  </View>


      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        style={styles.tabView}
      />

    </View>
    
  );
};

const styles = StyleSheet.create({
  backgroundLayout: {
    height: StyleVariable.phoneHeight,
    width: StyleVariable.phoneWidth,
  },
  backgroundPosition: {
    left: 0,
    top: 0,
  },
  dmarrerLeChantierFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  dtailShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    position: "absolute",
  },
  backLayout: {
    height: 26,
    width: 29,
    position: "absolute",
  },
  desInfosSurTypo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  background: {
    backgroundColor: Color.colorWhitesmoke_100,
    position: "absolute",
    height: StyleVariable.phoneHeight,
    width: StyleVariable.phoneWidth,
  },
  dtailChantierChild: {
    top: 0,
    left: 10,
    width: 39,
    height: 39,
    position: "absolute",
  },
  userIcon: {
    top: 7,
    left: 17,
    width: 25,
    height: 25,
    position: "absolute",
  },
  rparationAntenne1: {
    fontSize: FontSize.size_mini,
  },
  blankLine: {
    fontSize: FontSize.size_xs,
  },
  rparationAntenne: {
    color: "#2a2a2a",
  },
  enAttente1: {
    color: Color.colorDarkgray,
  },
  rparationAntenneEnAttenteContainer: {
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    left: 0,
    top: 0,
  },
  rparationAntenneEnAttenteWrapper: {
    left: 108,
    width: 145,
    height: 33,
    top: 18,
    position: "absolute",
  },
  dtailChantierItem: {
    top: 741,
    left: 72,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: Border.br_16xl,
    backgroundColor: Color.colorCornflowerblue,
    width: 216,
    height: 35,
  },
  dmarrerLeChantier: {
    top: 7,
    left: 20,
    letterSpacing: 0.8,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    color: Color.systemBackgroundsSBLPrimary,
    width: 178,
    fontSize: FontSize.size_mini,
  },
  goBackButtonChild: {
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0)",
    left: 0,
    top: 0,
  },
  vectorIcon: {
    top: 5,
    left: 6,
    width: 17,
    height: 18,
    position: "absolute",
  },
  goBackButton: {
    left: 20,
    top: 18,
  },
  dtailChantierInner: {
    top: 0,
    left: 12,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: Border.br_8xs,
    backgroundColor: Color.systemBackgroundsSBLPrimary,
    width: 336,
    height: 220,
    paddingVertical: 10,
    paddingLeft:10
    
  },
  loremIpsumDolor: {
    top: 358,
    left: 21,
    color: "#4f4f4f",
    textAlign: "justify",
    width: 318,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  desInfosSur: {
    color: Color.colorBlack,
    fontSize: FontSize.size_mini,
  },
  blahBlahBlah: {
    fontSize: FontSize.size_2xs,
    fontStyle: "italic",
    fontFamily: FontFamily.interLight,
    color: Color.colorGray_200,
  },
  loremIpsumDolor1: {
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
    fontSize: FontSize.size_xs,
    flex:2,
  },
  desInfosSurContainer: {
    marginBottom: 10,
  },
  groupIcon: {
    top: 284,
    left: -1,
    width: 361,
    height: 60,
    position: "absolute",
  },
  information5456741Icon: {
    top: 299,
    left: 74,
    width: 31,
    height: 31,
    position: "absolute",
  },
  dtailChantier: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_xs,
    color: Color.colorBlack,
  },
  tabView: {
    width: 336,
    height:300,
    position: "absolute",
    bottom: 150,
  },
  pressableContainer: {
    position: "absolute",
  },
  imageContainer: {
    position: "absolute",
  },
});

export  {WorkSiteInfo};
