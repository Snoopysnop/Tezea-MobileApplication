import { useState } from 'react';
import { Border, Color, FontWeight, Others } from "../../GlobalStyles";
import * as React from "react";
import { StyleSheet, View, Text, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { TabView, TabBar } from "react-native-tab-view";
import { useEffect } from "react";
import { TitleHeader } from "../../components/Header";
import { Incident, Invoice, WorkSiteAndRequest } from '../../api/Model';
import MainApi from "../../api/MainApi";
import EmployeesModal from '../../components/WorkSiteInProgress/Modals/EmployeesModal';
import StuffModal from '../../components/WorkSiteInProgress/Modals/StuffModal';
import { BasicModal } from "../../components/BasicModal";
import { Button } from '@rneui/themed';
import { WorkSiteStatus, WorkSiteStatusAPI } from '../../api/Enums';
import { FormatDate, FormatHour, FormatPhoneNumber } from '../../common/utils/Format';
import { ILAPItoIL } from '../../api/Mapping';
import { InvoiceReviewModal } from '../../components/WorkSiteInProgress/Modals/InvoiceReviewModal';
import { IncidentReviewModal } from '../../components/WorkSiteInProgress/Modals/IncidentReviewModal';


type WorkSiteInfoParams = {
  workSiteAndRequest: WorkSiteAndRequest;
  invoices: Invoice[];
  incidents: Incident[];
  refresh: boolean;
  setRefresh: Function;
}

function WorkSiteInfo({ workSiteAndRequest, invoices, incidents, refresh, setRefresh }: WorkSiteInfoParams) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>()
  const [invoiceReviewModal, setInvoiceReviewModal] = React.useState(false);

  const [selectedIncident, setSelectedIncident] = useState<Incident>()
  const [incidentReviewModal, setIncidentReviewModal] = React.useState(false);

  const [employeesModal, setEmployeeModal] = React.useState(false);
  const [stuffModal, setStuffModal] = React.useState(false);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "image", icon: require("../../assets/info.png") },
    { key: "text", icon: require("../../assets/user-list-expanded.png") },
  ]);
  const [dynamicRoutes, setDynamicRoutes] = useState<{ key: string; icon: any; }[]>([]);
  const mergedRoutes = [...routes, ...dynamicRoutes];

  useEffect(() => {
    if (workSiteAndRequest.status === WorkSiteStatus.Done) {
      setDynamicRoutes([{ key: "history", icon: require("../../assets/history.png") }]);
    } else {
      setDynamicRoutes([]);
    }
  }, [workSiteAndRequest.status]);

  type CustomNavigationState = {
    index: number;
    routes: { key: string; icon: any }[];
  }
  const navigationState: CustomNavigationState = {
    index,
    routes: mergedRoutes,
  };

  const updateWorkSiteStatus = async (status: string) => {
    try {
      await MainApi.getInstance().updateWorksiteStatus(workSiteAndRequest.id, status)
      setRefresh(!refresh)
    } catch (error) {
      console.log(error)
    }
  }

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "image":
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: Color.white, padding: 15, gap: 15, borderBottomLeftRadius: Border.default_radius, borderBottomRightRadius: Border.default_radius, minHeight: 370 }}>
              <View>
                <Text style={{ color: Color.blue, fontSize: 16, fontWeight: '600' }}>Autres Informations</Text>
                {Info('Service', workSiteAndRequest.workSiteRequest.serviceType)}
                {Info('Catégorie', workSiteAndRequest.workSiteRequest.category)}
                <Text style={{ color: Color.black, fontSize: 16, fontWeight: '600' }}>Description : <Text style={{ color: '#7D7D7D', fontSize: 15, fontWeight: '400' }}>{workSiteAndRequest.workSiteRequest.description}</Text></Text>
              </View>

              <View>
                <Text style={{ color: Color.blue, fontSize: 16, fontWeight: '600' }}>Données estimées</Text>
                <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Volume: <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.volumeEstimate}</Text></Text>
                <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Poids: <Text style={{ color: '#7D7D7D', fontSize: 14 }}>{workSiteAndRequest.workSiteRequest.weightEstimate}</Text></Text>
              </View>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity
                  style={{ flex: 1, borderWidth: 1.5, borderColor: Color.blue, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, }}
                  onPress={() => setEmployeeModal(true)}>
                  <Text style={{ textAlign: 'center', color: Color.blue }}>Voir Personnel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flex: 1, borderWidth: 1.5, borderColor: Color.blue, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, }}
                  onPress={() => setStuffModal(true)}>
                  <Text style={{ textAlign: 'center', color: Color.blue }}>Voir Matériel</Text>
                </TouchableOpacity>
              </View>

              <BasicModal isModalVisible={employeesModal} setIsModalVisible={setEmployeeModal} component={<EmployeesModal employees={workSiteAndRequest.staff} />} />
              <BasicModal isModalVisible={stuffModal} setIsModalVisible={setStuffModal} component={<StuffModal equipments={workSiteAndRequest.equipments} />} />
            </View>
          </ScrollView>
        );

      case "text":
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ gap: 15, backgroundColor: Color.white, padding: 15, borderBottomLeftRadius: Border.default_radius, borderBottomRightRadius: Border.default_radius }}>
              <View>
                <Text style={{ color: Color.blue, fontSize: 16, fontWeight: '600' }}>Informations Concierge</Text>
                {Info('Client', workSiteAndRequest.workSiteRequest.concierge.firstName + ' ' + workSiteAndRequest.workSiteRequest.concierge.lastName)}
                {Info('Téléphone', FormatPhoneNumber(workSiteAndRequest.workSiteRequest.concierge.phoneNumber))}
                {Info('Email', workSiteAndRequest.workSiteRequest.concierge.email)}
              </View>

              <View style={{ width: '70%', height: 1, alignSelf: 'center', backgroundColor: Color.blue }} />

              <View>
                <Text style={{ color: Color.blue, fontSize: 16, fontWeight: '600' }}>Informations Chef de Site</Text>
                {Info('Client', workSiteAndRequest.workSiteRequest.siteChief.firstName + ' ' + workSiteAndRequest.workSiteRequest.siteChief.lastName)}
                {Info('Téléphone', FormatPhoneNumber(workSiteAndRequest.workSiteRequest.siteChief.phoneNumber))}
                {Info('Email', workSiteAndRequest.workSiteRequest.siteChief.email)}
              </View>

              <View style={{ width: '70%', height: 1, alignSelf: 'center', backgroundColor: Color.blue }} />

              <View>
                <Text style={{ color: Color.blue, fontSize: 16, fontWeight: '600' }}>Informations Client</Text>
                {Info('Client', workSiteAndRequest.workSiteRequest.customer.firstName + ' ' + workSiteAndRequest.workSiteRequest.customer.lastName)}
                {Info('Téléphone', FormatPhoneNumber(workSiteAndRequest.workSiteRequest.customer.phoneNumber))}
                {Info('Email', workSiteAndRequest.workSiteRequest.customer.email)}
                {Info('Adresse', workSiteAndRequest.workSiteRequest.customer.address + ' ' + workSiteAndRequest.workSiteRequest.customer.postalCode + ' ' + workSiteAndRequest.workSiteRequest.customer.city)}
                {workSiteAndRequest.workSiteRequest.customer.company && Info('Entreprise', workSiteAndRequest.workSiteRequest.customer.company)}
              </View>
            </View>
          </ScrollView>
        );

      case "history":
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ gap: 20, backgroundColor: Color.white, padding: 15, borderBottomLeftRadius: Border.default_radius, borderBottomRightRadius: Border.default_radius, minHeight: 370 }}>

              {/* -------------------------   INVOICES   ------------------------- */}
              <View style={{ gap: 5 }}>
                <Text style={{ color: Color.blue, fontSize: 16, fontWeight: '600' }}>Facture(s)</Text>

                {invoices?.map((invoice, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedInvoice(invoice);
                        setInvoiceReviewModal(true);
                      }}
                      style={{ flexDirection: 'row', gap: 10, alignItems: 'center', borderWidth: 1, borderColor: Color.light_gray, padding: 5, backgroundColor: '#f9f9f9', borderRadius: 5 }}>
                      {invoice.type == 'file' ?
                        <Image
                          source={require('../../assets/file.png')}
                          style={{ width: 30, height: 30, backgroundColor: 'white', margin: 5 }}
                        />
                        :
                        <Image
                          source={{ uri: `data:image/png;base64,${invoice.invoiceFile}` }}
                          style={{ width: 40, height: 40, backgroundColor: 'white' }}
                        />
                      }

                      <View style={{ flex: 2 }}>
                        <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '500' }}>{invoice.title}</Text>
                        <Text numberOfLines={1} style={{ ...styles.subtitle }}>{invoice.description}</Text>
                      </View>

                      <Text style={{ fontSize: 15, fontWeight: '600', paddingRight: 20 }}>{invoice.amount}€</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* -------------------------   INCIDENTS   ------------------------- */}
              <View style={{ gap: 5 }}>
                <Text style={{ color: Color.blue, fontSize: 16, fontWeight: '600' }}>Incident(s)</Text>

                {incidents?.map((incident, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedIncident(incident);
                        setIncidentReviewModal(true);
                      }}
                      style={{ flexDirection: 'row', gap: 10, alignItems: 'center', borderWidth: 1, borderColor: Color.light_gray, padding: 5, backgroundColor: '#f9f9f9', borderRadius: 5 }}>
                      <Image
                        source={{ uri: `data:image/png;base64,${incident.evidences}` }}
                        style={{ width: 40, height: 40, backgroundColor: 'white' }}
                      />

                      <View style={{ flex: 2 }}>
                        <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '500' }}>{incident.title}</Text>
                        <Text numberOfLines={1} style={{ ...styles.subtitle }}>{incident.description}</Text>
                      </View>

                      <Text style={{ fontSize: 15, fontWeight: '600', paddingRight: 20 }}>{ILAPItoIL(incident.level)}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* -------------------------   COMMENTARY   ------------------------- */}
              <View style={{}}>
                <Text style={{ color: Color.blue, fontSize: 16, fontWeight: '600' }}>Commentaire</Text>
                {workSiteAndRequest.comment ?
                  <Text>{workSiteAndRequest.comment}</Text>
                  :
                  <Text>Pas de commentaire.</Text>
                }
              </View>

              {/* -------------------------   CLIENT SATISFACTION   ------------------------- */}
              <View style={{}}>
                <Text style={{ color: Color.blue, fontSize: 16, fontWeight: '600' }}>Retours Client</Text>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Signature : </Text>
                  <Image
                    source={{ uri: `data:image/png;base64,${workSiteAndRequest.signature}` }}
                    style={{ aspectRatio: '240/197', height: 80, margin: 10, borderWidth: 1, borderRadius: 5, borderColor: Color.light_gray }}
                  />
                </View>

                {Info("Satisfaction", workSiteAndRequest.satisfaction ? workSiteAndRequest.satisfaction.toString() : '')}
              </View>

              <InvoiceReviewModal isModalVisible={invoiceReviewModal} setIsModalVisible={setInvoiceReviewModal} invoice={selectedInvoice} />
              <IncidentReviewModal isModalVisible={incidentReviewModal} setIsModalVisible={setIncidentReviewModal} incident={selectedIncident} />
            </View >
          </ScrollView>
        );

      default:
        return null;
    }
  };

  const renderTabBar = (props: React.ComponentProps<typeof TabBar>) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Color.blue }}
      style={{ backgroundColor: Color.white }}
      renderIcon={({ route, focused }) => (
        <Image
          source={route.icon}
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? Color.blue : Color.gray,
          }}
        />
      )}
    />
  );

  return (
    <View style={{ flex: 1, width: '95%', alignSelf: 'center', flexDirection: 'column', gap: 10, marginTop: 10 }}>
      {/* -------------------------   GENERAL INFORMATION   ------------------------- */}
      <View style={{
        flex: 3,
        borderRadius: Border.default_radius,
        backgroundColor: Color.white,
        padding: 15,
        elevation: Others.elevation
      }} >

        <Text style={{ marginBottom: 5, color: 'black', fontSize: 17, fontWeight: '600' }}>Informations Générales</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 15 }}>
          {Tag(workSiteAndRequest.workSiteRequest.removal, 'Enlèvement')}
          {Tag(workSiteAndRequest.workSiteRequest.delivery, 'Livraison')}
          {Tag(workSiteAndRequest.workSiteRequest.removalRecycling, 'Recyclage')}
          {Tag(workSiteAndRequest.workSiteRequest.chronoQuote, 'Chrono')}
        </View>

        <View style={{}}>
          {Info("Date", FormatDate(workSiteAndRequest.begin, true))}
          {Info("Horaire", FormatHour(workSiteAndRequest.begin) + ' - ' + FormatHour(workSiteAndRequest.end))}
          {Info("Adresse", workSiteAndRequest.workSiteRequest.city)}
          {Info('Date de Création', FormatDate(workSiteAndRequest.workSiteRequest.creationDate, true))}
          {Info("Niveau d'urgence", workSiteAndRequest.workSiteRequest.emergency)}
        </View>

      </View>

      {/* -------------------------   TAB VIEW   ------------------------- */}
      <View style={{ flex: 7, marginBottom: 20}}>
        <TabView
          navigationState={navigationState}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          style={{
            borderRadius: Border.default_radius,
            elevation: Others.elevation
          }}
        />

        {/* -------------------------   START BUTTON   ------------------------- */}
        {!(workSiteAndRequest.status === WorkSiteStatus.Done) && (
          <Button
            title={'Démarrer Le Chantier'}
            buttonStyle={{
              backgroundColor: Color.blue,
              borderRadius: Border.rounded_end,
            }}
            containerStyle={{
              minWidth: 200,
              alignSelf: 'center',
              marginTop: 15
            }}
            onPress={() => {
              updateWorkSiteStatus(WorkSiteStatusAPI.InProgress);
            }}
          />
        )}
      </View >
    </View>
  );
};

const Tag = (value: boolean, text: string) => {
  let color = value ? Color.green : Color.red

  return (
    <View>
      <View style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: Border.rounded_end,
        borderColor: color,
        borderWidth: 1.2
      }}>
        <Text style={{
          fontWeight: FontWeight.bold,
          fontSize: 12,
          color: color
        }}>{text}</Text>
      </View>
    </View>
  )
}

const Info = (label: string, value: string) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
      <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>{label} : </Text>
      <Text style={{ color: '#7D7D7D', fontSize: 15, fontWeight: '400' }}>{value}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  imageContainer: {
    position: "absolute",
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export { WorkSiteInfo };
