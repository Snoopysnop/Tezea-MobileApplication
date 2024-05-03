import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { TitleHeader } from '../../components/Header';
import { Button } from '@rneui/themed';
import { DetailsButtons } from '../../components/WorkSiteInProgress/DetailsButtons';
import { BasicModal } from '../../components/BasicModal';
import { InvoiceModal } from '../../components/WorkSiteInProgress/InvoiceModal';

type Screen1NavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteInProgress'>;

type Props = {
  navigation: Screen1NavigationProp;
};

type Invoice = {
  picture: string;
  title: string;
  description: string;
  price: string;
};

function WorkSiteInProgress({ navigation }: Props) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invoiceModal, setInvoiceModal] = React.useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TitleHeader title='Réparation Antenne' subtitle='En Cours' isBlue={false} />,
    });
  }, [])

  function addInvoice(invoice: Invoice) {
    invoices.push(invoice);
    setInvoices(invoices);
  }

  return (
    <View style={{ width: '92%', height: '100%', alignSelf: 'center' }}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{ gap: 15 }}>

          <DetailsButtons />

          {/* facture */}
          <View style={{ justifyContent: 'center', backgroundColor: '#76C3F0', height: 60, paddingHorizontal: 20, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <Text numberOfLines={1} style={{ color: 'white', ...styles.title }}>Facture</Text>
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

          {/* incident */}

          {/* commentaire */}
        </View>

      </ScrollView>

      <InvoiceModal isModalVisible={invoiceModal} setIsModalVisible={setInvoiceModal}/>
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
            position: 'absolute',
            bottom: 20,
          }}
        />
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
  }
});

export { WorkSiteInProgress };
