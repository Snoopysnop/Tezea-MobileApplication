import { useState } from 'react';
import { StyleVariable, Color, FontSize, Border } from "../../GlobalStyles";
import * as React from "react";
import { StyleSheet, View, Text, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { TabView, TabBar } from "react-native-tab-view";
import { useEffect } from "react";
import { TitleHeader } from "../../components/Header";
import { Incident, Invoice, WorkSiteAndRequest, WorkSiteStatus } from '../../api/Model';
import MainApi from "../../api/MainApi";
import { workSitesAndRequests, users, customer, incidentsExample } from '../../dataset';
import { DetailsButtons } from "../../components/WorkSiteInProgress/DetailsButtons";
import { Ionicons } from '@expo/vector-icons';
import EmployeesModal from '../../components/WorkSiteInProgress/EmployeesModal';
import StuffModal from '../../components/WorkSiteInProgress/StuffModal';
import { BasicModal } from "../../components/BasicModal";


type WorkSiteInfoParams = {
  route: any;
  workSiteAndRequest: WorkSiteAndRequest;
  invoices: Invoice[];
  incidents: Incident[];
  refresh: boolean;
  setRefresh: Function;
}

function WorkSiteInfo({ route, workSiteAndRequest, invoices, incidents, refresh, setRefresh }: WorkSiteInfoParams) {
  const [selectedElement, setSelectedElement] = useState<Invoice | Incident>()
  const [invoiceModal, setInvoiceModal] = React.useState(false);
  const [reviewInvoiceModal, setReviewInvoiceModal] = React.useState(false);

  const [employeesModal, setEmployeeModal] = React.useState(false);
  const [stuffModal, setStuffModal] = React.useState(false);

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "image", icon: require("../../assets/information-545674-1.png") },
    { key: "text", icon: require("../../assets/userlist-9633874-1.png") },
    //{ key: "history", icon: require("../../assets/history.png") },
  ]);
  const [dynamicRoutes, setDynamicRoutes] = useState<{ key: string; icon: any; }[]>([]);
  useEffect(() => {
    console.log(workSiteAndRequest.status.toString() === "Done")
    if (workSiteAndRequest.status.toString() === "Done") {
      setDynamicRoutes([{ key: "history", icon: require("../../assets/history.png") }]);
    } else {
      setDynamicRoutes([]);
    }
  }, [workSiteAndRequest.status]);


  const mergedRoutes = [...routes, ...dynamicRoutes];

  type CustomNavigationState = {
    index: number;
    routes: { key: string; icon: any }[];
  }
  const navigationState: CustomNavigationState = {
    index,
    routes: mergedRoutes,
  };
  useEffect(() => {
    let subtitle;
    switch (workSiteAndRequest.status.toString()) {
        case "Standby":
            subtitle = "En Attente";
            break;
        case "Done":
          subtitle = "Finis";
          break;
        case "InProgress":
          subtitle = "En cours";
          break;
        case "Canceled":
          subtitle = "Annulé";
          break;

        default:
            subtitle = workSiteAndRequest.status; // Par défaut, utilisez la valeur existante
            break;
    }

    navigation.setOptions({
        headerTitle: () => <TitleHeader title={workSiteAndRequest.workSiteRequest.title} subtitle={subtitle} isBlue={false} />,
    });
}, [])


  const updateWorkSiteStatus = async (status: string) => {
    try {
      await MainApi.getInstance().updateWorksiteStatus(workSiteAndRequest.id, status)
    } catch (error) {
      console.log(error)
    }

  }
  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "image":
        return (
          <View style={styles.listeInfoTabView}>

            <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Chef de site associé : <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.siteChief.firstName} {workSiteAndRequest.workSiteRequest.siteChief.lastName} {workSiteAndRequest.workSiteRequest.siteChief.phoneNumber}</Text></Text>
            <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Client : <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.customer.firstName} {workSiteAndRequest.workSiteRequest.customer.lastName} {workSiteAndRequest.workSiteRequest.customer.phoneNumber}</Text></Text>
            <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Type de service : <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.serviceType}</Text></Text>
            <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Catégorie : <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.category}</Text></Text>
            <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Chantier crée le : <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.creationDate.toDateString()}</Text></Text>
            <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Affectation TEZEA : <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.tezeaAffectation}</Text></Text>
          </View>
        );
      case "text":
        return (
          <View style={styles.listeInfoTabView}>

            <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Descritption du chantier : <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.description}</Text></Text>
            <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Données estimées :</Text>
            <Text style={styles.tabed}>Date: <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.estimatedDate.toDateString()}</Text></Text>
            <Text style={styles.tabed}>Volume: <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.volumeEstimate}</Text></Text>
            <Text style={styles.tabed}>Poids: <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.weightEstimate}</Text></Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => setEmployeeModal(true)}>
                <Text style={styles.buttonText}>Voir Personnel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setStuffModal(true)}>
                <Text style={styles.buttonText}>Voir Matériel</Text>
              </TouchableOpacity>
            </View>
            <BasicModal
              isModalVisible={employeesModal}
              setIsModalVisible={setEmployeeModal}
              component={<EmployeesModal
                workSiteInfo={workSiteAndRequest} />} />
            <BasicModal isModalVisible={stuffModal} setIsModalVisible={setStuffModal} component={<StuffModal workSiteInfo={workSiteAndRequest} />} />
          </View>

        );
      case "history":
        return (

          //Facture
          <View>
            <ScrollView >


              <View style={{ paddingTop: 20 }}>
                <View style={{ justifyContent: 'center', height: 30 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#76C3F0', ...styles.title }}>Facture</Text>
                  </View>
                </View>

                {invoices?.map((invoice, index) => {
                  return (
                    <View key={index} style={{ paddingBottom: 5 }}  >
                      <TouchableOpacity onPress={() => {
                        setSelectedElement(invoice);
                        setReviewInvoiceModal(true);
                      }} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'white', borderRadius: 5 }}>
                        {invoice.type == 'file' ?
                          <Image
                            source={require('../../assets/file.png')}
                            style={{ width: 40, height: 40, backgroundColor: 'white', margin: 10 }}
                          />
                          :
                          <Image
                            source={{ uri: invoice.invoiceFile }}
                            style={{ width: 60, height: 60, backgroundColor: 'white' }}
                          />
                        }

                        <View style={{ flex: 2 }}>
                          <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '500' }}>{invoice.title}</Text>
                          <Text numberOfLines={1} style={{ ...styles.subtitle }}>{invoice.description}</Text>
                        </View>

                        <Text style={{ fontSize: 15, fontWeight: '600', paddingRight: 20 }}>{invoice.amount}€</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>

              <View style={{ paddingTop: 20 }}>
                <View style={{ justifyContent: 'center', height: 30 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#76C3F0', ...styles.title }}>Incidents</Text>
                  </View>
                </View>

                {incidents?.map((incident, index) => {
                  return (
                    <View key={index} style={{ paddingBottom: 5 }}>
                      <TouchableOpacity onPress={() => {
                        //setSelectedElement(incident);
                        setReviewInvoiceModal(true);
                      }} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'white', borderRadius: 5 }}>
                        <Image
                          source={{ uri: `data:image/png;base64,${incident.evidences}` }}
                          style={{ width: 60, height: 60, backgroundColor: 'white' }}
                        />

                        <View style={{ flex: 2 }}>
                          <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '500' }}>{incident.title}</Text>
                          <Text numberOfLines={1} style={{ ...styles.subtitle }}>{incident.description}</Text>
                        </View>

                        <Text style={{ fontSize: 15, fontWeight: '600', paddingRight: 20 }}>{incident.level}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
              <View style={{ paddingTop: 20 }}>
                <View style={{ justifyContent: 'center', height: 30 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#76C3F0', ...styles.title }}>Commentaire</Text>
                  </View>
                </View>
                <Text style={{ flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'white', borderRadius: 5, paddingLeft: 10 }}> {workSiteAndRequest.comment} </Text>
              </View>


              <View style={{ paddingTop: 20 }}>
                <View style={{ justifyContent: 'center', height: 30 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#76C3F0', ...styles.title }}>Signature Client</Text>
                  </View>
                </View>
              </View>
              <Image
                source={{ uri: `data:image/png;base64,${workSiteAndRequest.signature}` }}
                style={{ width: 80, height: 80, backgroundColor: 'white' }}
              />
              <View style={styles.container}>
                <Text style={styles.ratingText}>Satisfaction client : {workSiteAndRequest.satisfaction}/5</Text>
              </View>
            </ScrollView>
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top: 20 }}>

      <Pressable
        style={[styles.dtailChantierItem, styles.dtailShadowBox, { top: 600, left: 72 }]}
        onPress={() => {
          updateWorkSiteStatus("InProgress");
          // navigation.navigate("WorkSiteInProgress")
          console.log(workSiteAndRequest.status)
          setRefresh(!refresh)
        }}
      >
        <Text style={[styles.dmarrerLeChantier, styles.dmarrerLeChantierFlexBox]}>
          Démarrer le chantier
        </Text>
      </Pressable>


      <View style={[styles.dtailChantierInner, styles.dtailShadowBox]} >

        <View style={styles.desInfosSurContainer}>
          <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>
            {`Informations sur le chantier`}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <View style={styles.ellipseContainer}>
              <View style={[styles.ellipse, { borderColor: workSiteAndRequest.workSiteRequest.removal ? '#43C50B' : '#CF2602', borderWidth: 1 }]}>
                <Text style={[styles.ellipseText, { color: workSiteAndRequest.workSiteRequest.removal ? '#43C50B' : '#CF2602' }]}>Removal</Text>
              </View>
            </View>

            <View style={styles.ellipseContainer}>
              <View style={[styles.ellipse, { borderColor: workSiteAndRequest.workSiteRequest.delivery ? '#43C50B' : '#CF2602', borderWidth: 1 }]}>
                <Text style={[styles.ellipseText, { color: workSiteAndRequest.workSiteRequest.delivery ? '#43C50B' : '#CF2602' }]}>Delivery</Text>
              </View>
            </View>
            <View style={styles.ellipseContainer}>
              <View style={[styles.ellipse, { borderColor: workSiteAndRequest.workSiteRequest.removalRecycling ? '#43C50B' : '#CF2602', borderWidth: 1 }]}>
                <Text style={[styles.ellipseText, { color: workSiteAndRequest.workSiteRequest.removalRecycling ? '#43C50B' : '#CF2602' }]}>Recycling</Text>
              </View>
            </View>
            <View style={styles.ellipseContainer}>
              <View style={[styles.ellipse, { borderColor: workSiteAndRequest.workSiteRequest.chronoQuote ? '#43C50B' : '#CF2602', borderWidth: 1 }]}>
                <Text style={[styles.ellipseText, { color: workSiteAndRequest.workSiteRequest.chronoQuote ? '#43C50B' : '#CF2602' }]}>Chrono</Text>
              </View>
            </View>

          </View>

        </View>

        <View style={styles.listeInfoBase}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Commence le : <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.begin.toDateString()}</Text></Text>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Prend fin le : <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.end.toDateString()}</Text></Text>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Lieux : <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.city}</Text></Text>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Concierge associé : <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.concierge.firstName} {workSiteAndRequest.workSiteRequest.concierge.lastName}</Text></Text>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Niveau d'urgence : <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.emergency}</Text></Text>
        </View>

      </View>
      <TabView
        navigationState={navigationState}
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
    height: 200,
    paddingVertical: 10,
    paddingLeft: 10

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
    color: Color.colorGray_200,
  },
  loremIpsumDolor1: {
    color: Color.colorBlack,
    marginTop: 3
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
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginHorizontal: 20,
    fontSize: FontSize.size_xs,
    color: Color.colorBlack,
  },
  tabView: {
    width: 336,
    height: 370,
    position: "absolute",
    bottom: 80,
  },
  pressableContainer: {
    position: "absolute",
  },
  imageContainer: {
    position: "absolute",
  },

  listeInfoBase: {
    top: 20,
  },
  listeInfoTabView: {
    top: 25,
  },
  tabed: {
    color: 'black', fontSize: 16, fontWeight: '500',
    marginLeft: 20,
    marginTop: 3
  },

  ellipseContainer: {
    marginTop: 0,
    alignItems: 'center',
    marginRight: 10,
  },
  ellipse: {
    width: 65,
    height: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ellipseText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
  },
  ratingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,

  },
  button: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#3FDCE0',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#3FDCE0',
    textAlign: 'center',
  },
});

export { WorkSiteInfo };
