import React from 'react';
import { View, Text, StyleSheet, Image, Modal } from 'react-native';
import { WorkSiteAndRequest } from '../../api/Model';

interface EmployeesModalProps {
  workSiteInfo : WorkSiteAndRequest
}
const EmployeesModal: React.FC<EmployeesModalProps> = ({workSiteInfo }) => {
    const employees = workSiteInfo.staff
    return (
        <View>
            {employees?.map((employee, index) => {
                return (
                   
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10, marginHorizontal: 20 }}>
                        <Image
                            source={require('../../assets/duck.jpg')}
                            style={styles.avatar}
                        />
                        <View>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>
                                {employee.firstName} {employee.lastName}
                            </Text>
                            <Text style={{ color: '#7D7D7D', ...styles.subtitle }}>{employee.phoneNumber}</Text>
                        </View>
                    </View>

                );
            })}
        </View>
    )
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

export default EmployeesModal;
