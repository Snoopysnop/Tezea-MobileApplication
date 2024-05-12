import React from 'react';
import { View, Text } from 'react-native';
import { Tool, ToolName, WorkSiteAndRequest } from '../../../api/Model';


interface StuffsModalProps {
    equipments: Tool[];
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

function StuffsModal ({ equipments }: StuffsModalProps) {
    const tools: Tool[] = [];
    for (const key in equipments) {
        if (Object.prototype.hasOwnProperty.call(equipments, key)) {
            const tool: Tool = {
                name: getToolName(key) || ToolName.Saw,
                quantity: equipments[key as keyof typeof equipments] as number
            };
            tools.push(tool);
        }
    }

    return (
        <View>
            {tools?.map((tool, index) => {
                return (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10, marginHorizontal: 20 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>{tool.name}</Text>
                        <Text style={{ color: '#7D7D7D' }}>x {tool.quantity}</Text>
                    </View>
                );
            })
            }
        </View>
    )
}

export default StuffsModal;
