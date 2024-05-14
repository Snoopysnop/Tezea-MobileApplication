import React, { ReactNode, useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Incident, Invoice, WorkSite, WorkSiteAPI, WorkSiteAndRequest, WorkSiteAndRequestAPI, WorkSiteRequest } from '../../api/Model';
import MainApi from '../../api/MainApi';
import { WorkSiteInfo } from './workSiteInfo';
import { WorkSiteInProgress } from './workSiteInProgress';
import { EmergencyAPItoEmergency, SLAPItoSL, WSSAPItoWSS } from '../../api/Mapping';
import { WorkSiteStatus } from '../../api/Enums';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TitleHeader } from '../../components/Header';


function WorkSiteManager({ route }: any) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const workSiteAndRequestAPI = route.params.workSiteAndRequestAPI as WorkSiteAndRequestAPI;

  const [workSiteAndRequest, setWorkSiteAndRequest] = useState<WorkSiteAndRequest>();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchComplementaryData();
  }, [refresh])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TitleHeader title={workSiteAndRequest ? workSiteAndRequest.workSiteRequest.title : ''} subtitle={workSiteAndRequest ? workSiteAndRequest.status : ''} isBlue={false} />,
    });
  }, [workSiteAndRequest])

  const fetchComplementaryData = async () => {
    setIsLoading(true);

    let workSite, concierge, siteChief, customer, staff, invoices, incidents;
    try {
      workSite = await MainApi.getInstance().getWorksiteById(workSiteAndRequestAPI.id)

      concierge = await MainApi.getInstance().getUserById(workSiteAndRequestAPI.workSiteRequest.concierge)
      siteChief = await MainApi.getInstance().getUserById(workSiteAndRequestAPI.workSiteRequest.siteChief)
      customer = await MainApi.getInstance().getCustomerById(workSiteAndRequestAPI.workSiteRequest.customer)
      staff = await MainApi.getInstance().getUsersById(workSiteAndRequestAPI.staff)
      invoices = await MainApi.getInstance().getInvoicesForWorkSite(workSiteAndRequestAPI.id);
      incidents = await MainApi.getInstance().getIncidentsForWorkSite(workSiteAndRequestAPI.id);
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      return
    }

    let updatedWorkSiteRequest: WorkSiteRequest = {
      concierge: concierge,
      siteChief: siteChief,
      customer: customer,
      estimatedDate: new Date(workSiteAndRequestAPI.workSiteRequest.estimatedDate),
      creationDate: new Date(workSiteAndRequestAPI.workSiteRequest.creationDate),
      id: workSiteAndRequestAPI.workSiteRequest.id,
      city: workSiteAndRequestAPI.workSiteRequest.city,
      serviceType: workSiteAndRequestAPI.workSiteRequest.serviceType,
      description: workSiteAndRequestAPI.workSiteRequest.description,
      emergency: EmergencyAPItoEmergency(workSiteAndRequestAPI.workSiteRequest.emergency),
      title: workSiteAndRequestAPI.workSiteRequest.title,
      category: workSiteAndRequestAPI.workSiteRequest.category,
      removal: workSiteAndRequestAPI.workSiteRequest.removal,
      delivery: workSiteAndRequestAPI.workSiteRequest.delivery,
      removalRecycling: workSiteAndRequestAPI.workSiteRequest.removalRecycling,
      chronoQuote: workSiteAndRequestAPI.workSiteRequest.chronoQuote,
      weightEstimate: workSiteAndRequestAPI.workSiteRequest.weightEstimate,
      volumeEstimate: workSiteAndRequestAPI.workSiteRequest.volumeEstimate,
      provider: workSiteAndRequestAPI.workSiteRequest.provider,
      tezeaAffectation: workSiteAndRequestAPI.workSiteRequest.tezeaAffectation,
      status: workSiteAndRequestAPI.workSiteRequest.status
    }

    let updatedWorkSiteAndRequest: WorkSiteAndRequest = {
      workSiteRequest: updatedWorkSiteRequest,
      workSiteChief: concierge, // TODO replace with current user
      staff: staff,
      begin: new Date(workSite.begin),
      end: new Date(workSite.end),
      equipments: workSite.equipments,
      id: workSite.id,
      satisfaction: SLAPItoSL(workSite.satisfaction),
      status: WSSAPItoWSS(workSite.status),
      signature: workSite.signature,
      hasIncidents: (incidents.length != 0),
      comment: workSite.comment
    }

    setWorkSiteAndRequest(updatedWorkSiteAndRequest);
    setInvoices(invoices);
    setIncidents(incidents);

    setIsLoading(false);
  }

  return (
    <View style={{ height: '100%', margin: 0 }}>
      {isLoading ?
        (<View style={styles.loading} >
          <ActivityIndicator size='large' />
        </View>)
        :
        workSiteAndRequest ?
          (workSiteAndRequest.status == WorkSiteStatus.InProgress ?
            <WorkSiteInProgress workSiteAndRequest={workSiteAndRequest} invoices={invoices} incidents={incidents} refresh={refresh} setRefresh={setRefresh} />
            :
            <WorkSiteInfo workSiteAndRequest={workSiteAndRequest} invoices={invoices} incidents={incidents} refresh={refresh} setRefresh={setRefresh} />
          )
          :
          <Text>Désolé, nous n'avons pas réussi à charger le chantier demandé : {workSiteAndRequestAPI.workSiteRequest.title}.</Text>
      }
    </View >
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    margin: 20,
  },
  view: {
    margin: 20,
    marginBottom: 100,
  }
})

export { WorkSiteManager }