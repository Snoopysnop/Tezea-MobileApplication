import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BasicModal } from '../BasicModal';
import { WorkSiteAndRequest } from '../../api/Model';

type DetailsButtonsParams = {
    workSiteAndRequest: WorkSiteAndRequest;
}

function DetailsButtons({ workSiteAndRequest }: DetailsButtonsParams) {
    const [workSiteInfoModal, setWorkSiteInfoModal] = React.useState(false);
    const [toolsModal, setToolsModal] = React.useState(false);
    const [employeesModal, setEmployeeModal] = React.useState(false);

    return (
        <View>
            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, gap: 10 }}>
                <TouchableOpacity onPress={() => setWorkSiteInfoModal(true)} style={{ flex: 11 }}>
                    <View style={{ backgroundColor: 'white', justifyContent: 'center', borderRadius: 5, height: 60, alignItems: 'center' }}>
                        <View>
                            <Text numberOfLines={1} style={{ color: 'black', ...styles.title }}>{workSiteAndRequest.workSiteRequest.title}</Text>
                            <Text numberOfLines={1} style={{ color: '#7D7D7D', ...styles.subtitle }}>Voir Récapitulatif</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setToolsModal(true)} style={{ flex: 4 }}>
                    <View style={{ backgroundColor: 'white', justifyContent: 'center', borderRadius: 5, height: 60, alignItems: 'center' }}>
                        <Image
                            source={require("../../assets/tools.png")}
                            style={{ width: 30, height: 30 }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setEmployeeModal(true)} onLongPress={() => setEmployeeModal(true)} style={{ flex: 5 }}>
                    <View style={{ backgroundColor: 'white', justifyContent: 'center', borderRadius: 5, height: 60, alignItems: 'center' }}>
                        <Image
                            source={require("../../assets/user-list.png")}
                            style={{ aspectRatio: '16/9', height: 30 }}
                        />
                    </View>
                </TouchableOpacity>

            </View>
            <BasicModal isModalVisible={workSiteInfoModal} setIsModalVisible={setWorkSiteInfoModal} component={<WorkSiteModal workSiteAndRequest={workSiteAndRequest} />} />
            <BasicModal isModalVisible={toolsModal} setIsModalVisible={setToolsModal} component={<ToolsModal workSiteAndRequest={workSiteAndRequest} />} />
            <BasicModal isModalVisible={employeesModal} setIsModalVisible={setEmployeeModal} component={<EmployeesModal workSiteAndRequest={workSiteAndRequest} />} />
        </View>
    );
};

const workSiteInfo = {
    description: 'Changement câble + antenne téléphonique et télévision. Blah blah je m\'y connais pas. Insérer d\'autre truc de réparation d\'antenne.',
    concierge: 'Collongues Stéphane',
    siteManager: 'Monneau Gabriel',
    address: '123 Rue de Rennes, 35330 PIPRIAC',
    urgency: 'Faible',
    begin: '9h00',
    end: '11h00'
}

const employees = [
    {
        firstName: 'Chaveron',
        lastName: 'Bruno',
        phoneNumber: '01.23.45.67.89',
        picture: require('../../assets/duck.jpg')
    },
    {
        firstName: 'Desmontier',
        lastName: 'Josée',
        phoneNumber: '01.23.45.67.89',
        picture: require('../../assets/duck.jpg')
    },
    {
        firstName: 'Dersoir',
        lastName: 'Régine',
        phoneNumber: '01.23.45.67.89',
        picture: require('../../assets/duck.jpg')
    },
    {
        firstName: 'Ollivier',
        lastName: 'Delphine',
        phoneNumber: '01.23.45.67.89',
        picture: require('../../assets/duck.jpg')
    },
    {
        firstName: 'Lascaux',
        lastName: 'Christelle',
        phoneNumber: '01.23.45.67.89',
        picture: require('../../assets/duck.jpg')
    },
    {
        firstName: 'Marhic',
        lastName: 'Serge',
        phoneNumber: '01.23.45.67.89',
        picture: require('../../assets/duck.jpg')
    },
    {
        firstName: 'Breteaux',
        lastName: 'Damien',
        phoneNumber: '01.23.45.67.89',
        picture: require('../../assets/duck.jpg')
    },
    {
        firstName: 'Morel',
        lastName: 'Nathalie',
        phoneNumber: '01.23.45.67.89',
        picture: require('../../assets/duck.jpg')
    }
]

const tools = [
    {
        name: 'Tournevis',
        quantity: 2
    },
    {
        name: 'Marteau',
        quantity: 5
    },
    {
        name: 'Un autre truc',
        quantity: 1
    }
]

const prettyHour = (date: Date) => {
    let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    var utcDate = new Date(utc);

    let hours = ("0" + utcDate.getHours()).slice(-2)
    let minutes = ("0" + utcDate.getMinutes()).slice(-2)
    return hours + 'h' + minutes
  }

type ModalParams = {
    workSiteAndRequest: WorkSiteAndRequest;
}

function WorkSiteModal({ workSiteAndRequest }: ModalParams) {
    return (
        <View>
            <View style={{ gap: 10, marginBottom: 10, marginHorizontal: 10 }}>
                <View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Description :</Text>
                    <Text style={{ color: '#7D7D7D' }}>{workSiteAndRequest.workSiteRequest.description}</Text>
                </View>

                <View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Concierge :</Text>
                    <Text style={{ color: '#7D7D7D' }}>{workSiteAndRequest.workSiteRequest.concierge.firstName} {workSiteAndRequest.workSiteRequest.concierge.lastName}</Text>
                    <Text style={{ color: '#7D7D7D' }}>{workSiteAndRequest.workSiteRequest.concierge.phoneNumber}</Text>
                </View>

                <View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Chef de Site :</Text>
                    <Text style={{ color: '#7D7D7D' }}>{workSiteAndRequest.workSiteRequest.siteChief.firstName} {workSiteAndRequest.workSiteRequest.siteChief.lastName}</Text>
                    <Text style={{ color: '#7D7D7D' }}>{workSiteAndRequest.workSiteRequest.siteChief.phoneNumber}</Text>
                </View>

                <View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Adresse :</Text>
                    <Text style={{ color: '#7D7D7D' }}>TODO adresse</Text>
                </View>

                <View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Urgence :</Text>
                    <Text style={{ color: '#7D7D7D' }}>{workSiteAndRequest.workSiteRequest.emergency}</Text>
                </View>

                <View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Horaires :</Text>
                    <Text style={{ color: '#7D7D7D' }}>{prettyHour(workSiteAndRequest.begin)} - {prettyHour(workSiteAndRequest.end)}</Text>
                </View>
            </View>
        </View>
    )
}

function ToolsModal({ workSiteAndRequest }: ModalParams) {
    
    console.log(workSiteAndRequest.equipments[0])
    return (
        
        <View>
            {tools?.map((tool, index) => {
                return (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10, marginHorizontal: 20 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>{tool.name}</Text>
                        <Text style={{ color: '#7D7D7D' }}>x {tool.quantity}</Text>
                    </View>
                );
            })}
        </View>
    )
}

function EmployeesModal({ workSiteAndRequest }: ModalParams) {
    return (
        <View>
            {employees?.map((employee, index) => {
                return (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10, marginHorizontal: 20 }}>
                        <Image
                            source={employee.picture}
                            // source={{ uri: `data:image/png;base64,${employee.picture}` }}
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
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 12,
        fontStyle: 'italic',
    }
});

export { DetailsButtons };