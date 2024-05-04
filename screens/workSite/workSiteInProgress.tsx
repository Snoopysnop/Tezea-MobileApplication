import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { TitleHeader } from '../../components/Header';
import { Button } from '@rneui/themed';
import { DetailsButtons } from '../../components/WorkSiteInProgress/DetailsButtons';
import { CreationModal } from '../../components/WorkSiteInProgress/CreationModal';
import { BasicModal } from '../../components/BasicModal';
import { InvoiceReviewModal } from '../../components/WorkSiteInProgress/InvoiceReviewModal';

type Screen1NavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteInProgress'>;

type Props = {
  navigation: Screen1NavigationProp;
};

type InvoiceInfo = {
  title: string,
  description: string,
  price: string,
  invoice: Invoice,
}

type Invoice = {
  uri: string,
  name: string | null | undefined,
  type: 'file' | 'image'
}

type IncidentInfo = {
  title: string,
  description: string,
  level: 'Faible' | 'Majeur' | 'Bloquant',
  evidences: string[],
}

function WorkSiteInProgress({ navigation }: Props) {
  const [invoices, setInvoices] = useState<InvoiceInfo[]>([])
  const [invoiceModal, setInvoiceModal] = React.useState(false);
  const [reviewInvoiceModal, setReviewInvoiceModal] = React.useState(false);

  const [incidents, setIncidents] = useState<IncidentInfo[]>([])
  const [incidentModal, setIncidentModal] = React.useState(false);
  const [reviewIncidentModal, setReviewIncidentModal] = React.useState(false);

  const [comment, setComment] = useState("");

  const [selectedElement, setSelectedElement] = useState<InvoiceInfo | IncidentInfo>()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TitleHeader title='Réparation Antenne' subtitle='En Cours' isBlue={false} />,
    });
  }, [])

  const addIncident = (incident: IncidentInfo) => {
    let tmpInvoices = incidents
    tmpInvoices.push(incident)
    setIncidents(tmpInvoices)
  }

  const addInvoice = (invoice: InvoiceInfo) => {
    let tmpInvoices = invoices
    tmpInvoices.push(invoice)
    setInvoices(tmpInvoices)
  }

  const removeInvoice = (invoice: InvoiceInfo) => {
    let tmpInvoices = invoices
    let index = tmpInvoices.indexOf(invoice)
    tmpInvoices.splice(index, 1)
    setInvoices(tmpInvoices)
  }

  return (
    <View style={{ width: '92%', height: '100%', alignSelf: 'center', }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <View style={{ gap: 15}}>

          <DetailsButtons />

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
                    setReviewInvoiceModal(true);
                  }} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'white' }}>
                    {invoice.invoice.type == 'file' ?
                      <Image
                        source={require('../../assets/file.png')}
                        style={{ width: 40, height: 40, backgroundColor: 'white', margin: 10 }}
                      />
                      :
                      <Image
                        source={{ uri: invoice.invoice.uri }}
                        style={{ width: 60, height: 60, backgroundColor: 'white' }}
                      />
                    }

                    <View style={{ flex: 2 }}>
                      <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '500' }}>{invoice.title}</Text>
                      <Text numberOfLines={1} style={{ ...styles.subtitle }}>{invoice.description}</Text>
                    </View>

                    <Text style={{ fontSize: 15, fontWeight: '600', paddingRight: 20 }}>{invoice.price}€</Text>
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
                    setReviewInvoiceModal(true);
                  }} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'white' }}>
                    <Image
                      source={{ uri: incident.evidences[0] }}
                      style={{ width: 60, height: 60, backgroundColor: 'white' }}
                    />

                    <View style={{ flex: 2 }}>
                      <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '500' }}>{incident.title}</Text>
                      <Text numberOfLines={1} style={{ ...styles.subtitle }}>{incident.description}</Text>
                    </View>

                    <Text style={{ fontSize: 15, fontWeight: '600', paddingRight: 20 }}>{incident.level}€</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          {/* COMMENT MANAGEMENT */}
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
          onPress={() => alert("click")}
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

      <CreationModal isModalVisible={invoiceModal} setIsModalVisible={setInvoiceModal} addElement={addInvoice} isInvoice={true}/>
      <CreationModal isModalVisible={incidentModal} setIsModalVisible={setIncidentModal} addElement={addIncident} isInvoice={false} />
      <InvoiceReviewModal isModalVisible={reviewInvoiceModal} removeInvoice={removeInvoice} setIsModalVisible={setReviewInvoiceModal} invoice={selectedElement} />

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

export { WorkSiteInProgress, Invoice, InvoiceInfo, IncidentInfo };
