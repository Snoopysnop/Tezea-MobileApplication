import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BasicModal } from '../BasicModal';
import { Tool, ToolName, WorkSiteAndRequest } from '../../api/Model';
import StuffsModal from './Modals/StuffModal';
import EmployeesModal from './Modals/EmployeesModal';
import { FormatHour, FormatPhoneNumber } from '../../common/utils/Format';
import { Border, Others } from '../../GlobalStyles';

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
                    <View style={{ backgroundColor: 'white', justifyContent: 'center', borderRadius: Border.default_radius, height: 60, alignItems: 'center', paddingHorizontal:5, elevation:Others.elevation }}>
                        <View>
                            <Text numberOfLines={1} style={{ color: 'black', ...styles.title }}>{workSiteAndRequest.workSiteRequest.title}</Text>
                            <Text numberOfLines={1} style={{ color: '#7D7D7D', ...styles.subtitle }}>Voir Récapitulatif</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setToolsModal(true)} style={{ flex: 4 }}>
                    <View style={{ backgroundColor: 'white', justifyContent: 'center', borderRadius: 5, height: 60, alignItems: 'center', elevation:Others.elevation }}>
                        <Image
                            source={require("../../assets/tools.png")}
                            style={{ width: 30, height: 30 }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setEmployeeModal(true)} onLongPress={() => setEmployeeModal(true)} style={{ flex: 5 }}>
                    <View style={{ backgroundColor: 'white', justifyContent: 'center', borderRadius: 5, height: 60, alignItems: 'center', elevation:Others.elevation }}>
                        <Image
                            source={require("../../assets/user-list.png")}
                            style={{ aspectRatio: '16/9', height: 30 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <BasicModal isModalVisible={workSiteInfoModal} setIsModalVisible={setWorkSiteInfoModal} component={<WorkSiteModal workSiteAndRequest={workSiteAndRequest} />} />
            <BasicModal isModalVisible={toolsModal} setIsModalVisible={setToolsModal} component={<StuffsModal equipments={workSiteAndRequest.equipments} />} />
            <BasicModal isModalVisible={employeesModal} setIsModalVisible={setEmployeeModal} component={<EmployeesModal employees={workSiteAndRequest.staff} />} />
        </View>
    );
};


type ModalParams = {
    workSiteAndRequest: WorkSiteAndRequest;
}

function WorkSiteModal({ workSiteAndRequest }: ModalParams) {
    return (
        <View>
            <View style={{ gap: 10, marginBottom: 10, marginHorizontal: 10, minWidth: 220 }}>
                <View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Titre :</Text>
                    <Text style={{ color: '#7D7D7D' }}>{workSiteAndRequest.workSiteRequest.title}</Text>
                </View>

                <View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Description :</Text>
                    <Text style={{ color: '#7D7D7D' }}>{workSiteAndRequest.workSiteRequest.description}</Text>
                </View>

                <View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Concierge :</Text>
                    <Text style={{ color: '#7D7D7D' }}>{workSiteAndRequest.workSiteRequest.concierge.firstName} {workSiteAndRequest.workSiteRequest.concierge.lastName}</Text>
                    <Text style={{ color: '#7D7D7D' }}>{FormatPhoneNumber(workSiteAndRequest.workSiteRequest.concierge.phoneNumber)}</Text>
                </View>

                <View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Chef de Site :</Text>
                    <Text style={{ color: '#7D7D7D' }}>{workSiteAndRequest.workSiteRequest.siteChief.firstName} {workSiteAndRequest.workSiteRequest.siteChief.lastName}</Text>
                    <Text style={{ color: '#7D7D7D' }}>{FormatPhoneNumber(workSiteAndRequest.workSiteRequest.siteChief.phoneNumber)}</Text>
                </View>

                <View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Adresse :</Text>
                    <Text style={{ color: '#7D7D7D' }}>{workSiteAndRequest.workSiteRequest.city}</Text>
                </View>

                <View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Urgence :</Text>
                    <Text style={{ color: '#7D7D7D' }}>{workSiteAndRequest.workSiteRequest.emergency}</Text>
                </View>

                <View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Horaires :</Text>
                    <Text style={{ color: '#7D7D7D' }}>{FormatHour(workSiteAndRequest.begin)} - {FormatHour(workSiteAndRequest.end)}</Text>
                </View>
            </View>
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