import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { TitleHeader } from '../../components/Header';
import { Button } from '@rneui/themed';
import { DetailsButtons } from '../../components/WorkSiteInProgress/DetailsButtons';
import { CreationModal } from '../../components/WorkSiteInProgress/CreationModal';
import { InvoiceReviewModal } from '../../components/WorkSiteInProgress/InvoiceReviewModal';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { Incident, Invoice, WorkSiteAndRequest } from '../../api/Model';
import MainApi from '../../api/MainApi';
import { IncidentReviewModal } from '../../components/WorkSiteInProgress/IncidentReviewModal';


type WorkSiteInProgressParams = {
  workSiteAndRequest: WorkSiteAndRequest;
  invoices: Invoice[];
  incidents: Incident[];
}

function WorkSiteInProgress({ workSiteAndRequest, invoices: retrievedInvoices, incidents: retrievedIncidents }: WorkSiteInProgressParams) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [invoices, setInvoices] = useState<Invoice[]>(retrievedInvoices)
  const [invoiceModal, setInvoiceModal] = React.useState(false);

  const [incidents, setIncidents] = useState<Incident[]>(retrievedIncidents)
  const [incidentModal, setIncidentModal] = React.useState(false);

  const [comment, setComment] = useState("");

  const [selectedElement, setSelectedElement] = useState<Invoice | Incident>()
  const [invoiceReviewModal, setInvoiceReviewModal] = React.useState(false);
  const [incidentReviewModal, setIncidentReviewModal] = React.useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TitleHeader title='Réparation Antenne' subtitle='En Cours' isBlue={false} />,
    });
  }, [])

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

    // retrieve all invoices
    let newInvoices = await MainApi.getInstance().getIncidentsForWorkSite(workSiteAndRequest.id)

    setIncidents(newInvoices)
  }

  const removeIncident = (incident: Incident) => {
    deleteIncidentFromWorkSite(incident.id);
  }

  const uploadComment = async () => {
    await MainApi.getInstance().uploadComment(workSiteAndRequest.id, comment)
  }

  return (
    <View style={{ width: '92%', height: '100%', alignSelf: 'center', }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <View style={{ gap: 15 }}>

          <DetailsButtons workSiteAndRequest={workSiteAndRequest} />

          {/* -------------------- INVOICE MANAGEMENT -------------------- */}
          <View>
            <View style={{ justifyContent: 'center', backgroundColor: '#76C3F0', height: 60, paddingHorizontal: 20, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
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
                    setSelectedElement(invoice);
                    setInvoiceReviewModal(true);
                  }} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'white' }}>
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
            <View style={{ justifyContent: 'center', backgroundColor: '#76C3F0', height: 60, paddingHorizontal: 20, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
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
                    setSelectedElement(incident);
                    setIncidentReviewModal(true);
                  }} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'white' }}>
                    <Image
                      source={{ uri: `data:image/png;base64,${incident.evidences[0]}` }}
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

          {/* -------------------- COMMENT MANAGEMENT -------------------- */}
          <View>
            <View style={{ justifyContent: 'center', backgroundColor: '#76C3F0', height: 60, paddingHorizontal: 20, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
              <Text style={{ color: 'white', ...styles.title }}>Commentaire</Text>
            </View>
            <TextInput
              style={{
                borderColor: '#ccc',
                width: '100%',
                borderWidth: 1,
                backgroundColor: '#fff',
                paddingHorizontal: 15,
                paddingVertical: 5
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
            // uploadComment();
            navigation.navigate("ValidationScreen", { workSiteId: workSiteAndRequest.id }
            )
          }}
          buttonStyle={{
            backgroundColor: '#E15656',
            borderRadius: 20,
          }}
          containerStyle={{
            minWidth: 200,
            alignSelf: 'center',
            justifyContent: 'flex-end',
            paddingVertical: 20
          }}
        />
      </ScrollView>

      <CreationModal isModalVisible={invoiceModal} setIsModalVisible={setInvoiceModal} addElement={addInvoice} isInvoice={true} />
      <CreationModal isModalVisible={incidentModal} setIsModalVisible={setIncidentModal} addElement={addIncident} isInvoice={false} />
      <InvoiceReviewModal isModalVisible={invoiceReviewModal} removeInvoice={removeInvoice} setIsModalVisible={setInvoiceReviewModal} invoice={selectedElement as Invoice} />
      <IncidentReviewModal isModalVisible={incidentReviewModal} removeIncident={removeIncident} setIsModalVisible={setIncidentReviewModal} incident={selectedElement as Incident} />

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
