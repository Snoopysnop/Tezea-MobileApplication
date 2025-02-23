import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { TitleHeader } from '../../components/Header';
import { Button } from '@rneui/themed';
import { DetailsButtons } from '../../components/WorkSiteInProgress/DetailsButtons';
import { CreationModal } from '../../components/WorkSiteInProgress/Modals/CreationModal';
import { InvoiceReviewModal } from '../../components/WorkSiteInProgress/Modals/InvoiceReviewModal';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { Incident, Invoice, WorkSiteAndRequest } from '../../api/Model';
import MainApi from '../../api/MainApi';
import { IncidentReviewModal } from '../../components/WorkSiteInProgress/Modals/IncidentReviewModal';
import { SignatureScreen } from './validationScreen';
import { ILAPItoIL } from '../../api/Mapping';
import { Others } from '../../GlobalStyles';


type WorkSiteInProgressParams = {
  workSiteAndRequest: WorkSiteAndRequest;
  invoices: Invoice[];
  incidents: Incident[];
  refresh: boolean;
  setRefresh: Function;
}

function WorkSiteInProgress({ workSiteAndRequest, invoices: retrievedInvoices, incidents: retrievedIncidents, refresh, setRefresh }: WorkSiteInProgressParams) {
  const [invoices, setInvoices] = useState<Invoice[]>(retrievedInvoices)
  const [invoiceModal, setInvoiceModal] = React.useState(false);

  const [incidents, setIncidents] = useState<Incident[]>(retrievedIncidents)
  const [incidentModal, setIncidentModal] = React.useState(false);

  const [comment, setComment] = useState("");

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>()
  const [invoiceReviewModal, setInvoiceReviewModal] = React.useState(false);

  const [selectedIncident, setSelectedIncident] = useState<Incident>()
  const [incidentReviewModal, setIncidentReviewModal] = React.useState(false);

  const [validationScreenModal, setValidationScreenModal] = useState(false);


  async function uriToBase64(uri: string) {
    const result = await fetch(uri)
    const blob = await result.blob()

    const reader = new FileReader()
    reader.readAsDataURL(blob)

    return new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => {
        resolve(String(reader?.result).split(",")[1])
      }
    })
  }

  const putInvoiceForWorksite = async (invoice: Invoice) => {
    try {
      // create new invoice
      let b64 = await uriToBase64(invoice.invoiceFile) as string
      await MainApi.getInstance().putInvoiceForWorkSite(workSiteAndRequest.id, invoice, b64)

      // retrieve all invoices
      let newInvoices = await MainApi.getInstance().getInvoicesForWorkSite(workSiteAndRequest.id)

      setInvoices(newInvoices)
    } catch (error) {
      console.log(error)
    }
  }

  const addInvoice = (invoice: Invoice) => {
    putInvoiceForWorksite(invoice)
  }

  const deleteInvoiceFromWorkSite = async (invoiceId: string) => {
    // delete invoice
    let response = await MainApi.getInstance().deleteInvoice(invoiceId)

    // retrieve all invoices
    let newInvoices = await MainApi.getInstance().getInvoicesForWorkSite(workSiteAndRequest.id)

    setInvoices(newInvoices)
  }

  const removeInvoice = (invoice: Invoice) => {
    deleteInvoiceFromWorkSite(invoice.id)
  }

  const putIncidentForWorksite = async (incident: Incident) => {
    try {
      // create new incident
      let response = await MainApi.getInstance().putIncidentForWorkSite(workSiteAndRequest.id, incident)

      // add corresponding pictures
      for (let i = 0; i < incident.evidences.length; i++) {
        let b64 = await uriToBase64(incident.evidences[i]) as string
        await MainApi.getInstance().putEvidenceForIncident(response.id, b64)
      }

      // retrieve all incidents
      let newIncidents = await MainApi.getInstance().getIncidentsForWorkSite(workSiteAndRequest.id)

      setIncidents(newIncidents)
    } catch (error) {
      console.log(error)
    }
  }

  const addIncident = (incident: Incident) => {
    putIncidentForWorksite(incident);
  }

  const deleteIncidentFromWorkSite = async (incidentId: string) => {
    // delete invoice
    let response = await MainApi.getInstance().deleteIncident(incidentId)

    // retrieve all invoices (refresh)
    let newInvoices = await MainApi.getInstance().getIncidentsForWorkSite(workSiteAndRequest.id)

    setIncidents(newInvoices)
  }

  const removeIncident = (incident: Incident) => {
    deleteIncidentFromWorkSite(incident.id);
  }

  const uploadComment = async () => {
    if(comment!=""){
      await MainApi.getInstance().uploadComment(workSiteAndRequest.id, comment)
    }
  }

  return (
    <View style={{ width: '92%', height: '100%', alignSelf: 'center', }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <View style={{ gap: 15 }}>

          <DetailsButtons workSiteAndRequest={workSiteAndRequest} />

          {/* -------------------- INVOICE MANAGEMENT -------------------- */}
          <View>
            <View style={{ justifyContent: 'center', backgroundColor: '#76C3F0', height: 60, paddingHorizontal: 20, borderTopLeftRadius: 5, borderTopRightRadius: 5, elevation: (invoices.length != 0 ? 0 : 3), shadowColor: Others.shadow_color }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'white', ...styles.title }}>Facture</Text>
                <View style={{}}>
                  <TouchableOpacity onPress={() => setInvoiceModal(true)}>
                    <Image
                      source={require("../../assets/plus.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {invoices?.map((invoice, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity onPress={() => {
                    setSelectedInvoice(invoice);
                    setInvoiceReviewModal(true);
                  }} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'white', elevation: (index == (invoices.length - 1) ? 3 : 0), shadowColor: Others.shadow_color  }}>
                    {invoice.type == 'file' ?
                      <Image
                        source={require('../../assets/file.png')}
                        style={{ width: 40, height: 40, backgroundColor: 'white', margin: 10 }}
                      />
                      :
                      <Image
                        source={{ uri: `data:image/png;base64,${invoice.invoiceFile}` }}
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

          {/* -------------------- INCIDENT MANAGEMENT -------------------- */}
          <View>
            <View style={{ justifyContent: 'center', backgroundColor: '#76C3F0', height: 60, paddingHorizontal: 20, borderTopLeftRadius: 5, borderTopRightRadius: 5, elevation: (invoices.length != 0 ? 0 : 3), shadowColor: Others.shadow_color }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'white', ...styles.title }}>Incidents</Text>
                <View style={{}}>
                  <TouchableOpacity onPress={() => setIncidentModal(true)}>
                    <Image
                      source={require("../../assets/plus.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {incidents?.map((incident, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity onPress={() => {
                    setSelectedIncident(incident);
                    setIncidentReviewModal(true);
                  }} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'white', elevation: (index == (incidents.length - 1) ? 3 : 0), shadowColor: Others.shadow_color }}>
                    <Image
                      source={{ uri: `data:image/png;base64,${incident.evidences[0]}` }}
                      style={{ width: 60, height: 60, backgroundColor: 'white' }}
                    />

                    <View style={{ flex: 2 }}>
                      <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '500' }}>{incident.title}</Text>
                      <Text numberOfLines={1} style={{ ...styles.subtitle }}>{incident.description}</Text>
                    </View>

                    <Text style={{ fontSize: 15, fontWeight: '600', paddingRight: 20 }}>{ILAPItoIL(incident.level)}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          {/* -------------------- COMMENT MANAGEMENT -------------------- */}
          <View>
            <View style={{ justifyContent: 'center', backgroundColor: '#76C3F0', height: 60, paddingHorizontal: 20, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
              <Text style={{ color: 'white', ...styles.title }}>Commentaire</Text>
            </View>
            <TextInput
              style={{
                width: '100%',
                backgroundColor: '#fff',
                paddingHorizontal: 15,
                paddingVertical: 5,
                elevation: Others.elevation,
                shadowColor: Others.shadow_color,
              }}
              value={comment}
              onChangeText={setComment}
              placeholder='Ajouter un commentaire...'
              multiline={true}
              numberOfLines={5}
              textAlignVertical={'top'}
            />
          </View>
        </View>

        <Button
          title={'Terminer Le Chantier'}
          onPress={() => {
            
            uploadComment();
            // navigation.navigate("ValidationScreen", { workSiteId: workSiteAndRequest.id } )
            setValidationScreenModal(true);
          }}
          buttonStyle={{
            backgroundColor: '#E15656',
            borderRadius: 20,
            elevation: Others.elevation,
            shadowColor: Others.shadow_color,
          }}
          containerStyle={{
            minWidth: 200,
            alignSelf: 'center',
            justifyContent: 'flex-end',
            paddingVertical: 20,
            borderRadius: 100,
          }}
        />
      </ScrollView>

      <CreationModal isModalVisible={invoiceModal} setIsModalVisible={setInvoiceModal} addElement={addInvoice} isInvoice={true} />
      <CreationModal isModalVisible={incidentModal} setIsModalVisible={setIncidentModal} addElement={addIncident} isInvoice={false} />
      <InvoiceReviewModal isModalVisible={invoiceReviewModal} removeInvoice={removeInvoice} setIsModalVisible={setInvoiceReviewModal} invoice={selectedInvoice} />
      <IncidentReviewModal isModalVisible={incidentReviewModal} removeIncident={removeIncident} setIsModalVisible={setIncidentReviewModal} incident={selectedIncident} />

      <Modal
        animationType="none"
        transparent={false}
        visible={validationScreenModal}
        onRequestClose={() => {
          setValidationScreenModal(false);
        }}>
        <SignatureScreen workSiteId={workSiteAndRequest.id} refresh={refresh} setRefresh={setRefresh} setValidationScreenModal={setValidationScreenModal} />
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export { WorkSiteInProgress };
