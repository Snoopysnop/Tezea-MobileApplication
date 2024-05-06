import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { WorkSiteAndRequest } from '../../api/Model';



interface StuffsModalProps {
  workSiteInfo: WorkSiteAndRequest;
}
const StuffsModal: React.FC<StuffsModalProps> = ({ workSiteInfo }) => {
    const tools = workSiteInfo.equipments
    return (
        <View>

            {tools?.map((tools, index) => {
            return (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10, marginHorizontal: 20 }}>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>{tools.name}</Text>
                    <Text style={{ color: '#7D7D7D' }}>x {tools.quantity}</Text>
                </View>
                ); 
            })
  }
</View>)
}

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    subtitle: {
        fontSize: 12,
        fontStyle: 'italic',
    }
});

export default StuffsModal;
