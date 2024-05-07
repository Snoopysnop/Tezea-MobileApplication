import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BasicModal } from '../BasicModal';
import { Tool, ToolName, WorkSiteAndRequest } from '../../api/Model';

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

export function getToolName(toolname: string) {
    switch (toolname) {
        case "Agrafeuse":
            return ToolName.Stapler;
        case "Bétonnière":
            return ToolName.CementMixer;
        case "Cisaille":
            return ToolName.Shear;
        case "Clé anglaise":
            return ToolName.Wrench;
        case "Échelle":
            return ToolName.Ladder;
        case "Hache":
            return ToolName.Axe;
        case "Palette":
            return ToolName.Palette;
        case "Râteau":
            return ToolName.Rake;
        case "Scie":
            return ToolName.Saw;
        case "Perceuse":
            return ToolName.Drill;
        case "Pelle":
            return ToolName.Shovel;
    }
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

    const tools2: Tool[] = [];
    for (const key in workSiteAndRequest.equipments) {
      if (Object.prototype.hasOwnProperty.call(workSiteAndRequest.equipments, key)) {
        const toolName: string = key; // Récupère le nom de l'outil à partir de la clé
        const tool: Tool = {
          name: getToolName(toolName) || ToolName.Saw,
          quantity: workSiteAndRequest ? workSiteAndRequest.equipments[key as keyof typeof workSiteAndRequest.equipments] as number : 0
        };
        tools2.push(tool);
      }
    }
    return (
        
        <View>
            {tools2?.map((tool, index) => {
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
    const employeesRequest = workSiteAndRequest.staff;
    return (
        <View>
            {employeesRequest?.map((employee, index) => {
                return (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10, marginHorizontal: 20 }}>
                        <Image
                            source={require("../../assets/duck.jpg")}
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