import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Incident, Invoice, WorkSiteAndRequest, WorkSiteAndRequestAPI, WorkSiteRequest, WorkSiteStatus } from '../../api/Model';
import MainApi from '../../api/MainApi';
import { WorkSiteInfo } from './workSiteInfo';
import { WorkSiteInProgress } from './workSiteInProgress';
import { incidentsExample, workSitesAndRequests } from '../../dataset';


function WorkSiteManager({ route }: any) {
  const workSiteAndRequestAPI = route.params.workSiteAndRequestAPI as WorkSiteAndRequestAPI;

  const [workSiteAndRequest, setWorkSiteAndRequest] = useState<WorkSiteAndRequest>();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetchComplementaryData();

    setWorkSiteAndRequest(workSitesAndRequests[0]);
    setIncidents(incidentsExample);
    setInvoices([]);
    setIsLoading(false);
  }, [])

  const fetchComplementaryData = async () => {
    setIsLoading(true);

    let concierge = await MainApi.getInstance().getUserById(workSiteAndRequestAPI.workSiteRequest.concierge)
    let siteChief = await MainApi.getInstance().getUserById(workSiteAndRequestAPI.workSiteRequest.siteChief)
    let customer = await MainApi.getInstance().getCustomerById(workSiteAndRequestAPI.workSiteRequest.customer)
    let staff = await MainApi.getInstance().getUsersById(workSiteAndRequestAPI.staff)

    let invoices = await MainApi.getInstance().getInvoicesForWorkSite(workSiteAndRequestAPI.id);
    let incidents = await MainApi.getInstance().getIncidentsForWorkSite(workSiteAndRequestAPI.id);

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
      emergency: workSiteAndRequestAPI.workSiteRequest.emergency,
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
      begin: new Date(workSiteAndRequestAPI.begin),
      end: new Date(workSiteAndRequestAPI.end),
      equipments: workSiteAndRequestAPI.equipments,
      id: workSiteAndRequestAPI.id,
      satisfaction: workSiteAndRequestAPI.satisfaction,
      status: workSiteAndRequestAPI.status,
      signature: workSiteAndRequestAPI.signature,
      incident: workSiteAndRequestAPI.incident
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
        </View>) :
        // TODO change back to workSiteAndRequest.status
        workSiteAndRequest && (workSiteAndRequestAPI.status == WorkSiteStatus.InProgress ?
          <WorkSiteInProgress workSiteAndRequest={workSiteAndRequest} invoices={invoices} incidents={incidents} />
          :
          <WorkSiteInfo workSiteAndRequest={workSiteAndRequest} invoices={invoices} incidents={incidents} />
        )
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