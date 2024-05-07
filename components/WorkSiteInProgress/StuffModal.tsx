import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Tool, ToolName, WorkSiteAndRequest } from '../../api/Model';



interface StuffsModalProps {
  workSiteInfo: WorkSiteAndRequest;
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

const StuffsModal: React.FC<StuffsModalProps> = ({ workSiteInfo }) => {
    const tools2: Tool[] = [];
    for (const key in workSiteInfo.equipments) {
      if (Object.prototype.hasOwnProperty.call(workSiteInfo.equipments, key)) {
        const toolName: string = key; // Récupère le nom de l'outil à partir de la clé
        const tool: Tool = {
          name: getToolName(toolName) || ToolName.Saw,
          quantity: workSiteInfo ? workSiteInfo.equipments[key as keyof typeof workSiteInfo.equipments] as number : 0
        };
        tools2.push(tool);
      }
    }



    const tools = workSiteInfo.equipments
    return (
        <View>

            {tools2?.map((tools, index) => {
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
