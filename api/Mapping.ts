import { Emergency, EmergencyAPI, IncidentLevel, IncidentLevelAPI, SatisfactionLevel, SatisfactionLevelAPI, WorkSiteStatus, WorkSiteStatusAPI } from "./Enums";

function WSSAPItoWSS(statusAPI: WorkSiteStatusAPI) {
    let status: WorkSiteStatus;

    switch (statusAPI) {
        case WorkSiteStatusAPI.Standby:
            status = WorkSiteStatus.Standby
            break;
        case WorkSiteStatusAPI.InProgress:
            status = WorkSiteStatus.InProgress
            break;
        case WorkSiteStatusAPI.Done:
            status = WorkSiteStatus.Done
            break;
        case WorkSiteStatusAPI.Archive:
            status = WorkSiteStatus.Archive
            break;
        default:
            console.log("failed to map WorkSiteStatusAPI");
            throw new Error("failed to map WorkSiteStatusAPI");
    }

    return status;
}

function EmergencyAPItoEmergency(emergencyAPI: EmergencyAPI) {
    let emergency: Emergency;

    switch (emergencyAPI) {
        case EmergencyAPI.Low:
            emergency = Emergency.Low
            break;
        case EmergencyAPI.Medium:
            emergency = Emergency.Medium
            break;
        case EmergencyAPI.High:
            emergency = Emergency.High
            break;
        default:
            console.log("failed to map EmergencyAPI");
            throw new Error("failed to map EmergencyAPI");
    }

    return emergency;
}

function SLAPItoSL(statisfactionAPI: SatisfactionLevelAPI | null) {
    let satisfaction: SatisfactionLevel;

    if (!statisfactionAPI)
        return null

    switch (statisfactionAPI) {
        case SatisfactionLevelAPI.Dissatisfied:
            satisfaction = SatisfactionLevel.Dissatisfied
            break;
        case SatisfactionLevelAPI.Low:
            satisfaction = SatisfactionLevel.Low
            break;
        case SatisfactionLevelAPI.Medium:
            satisfaction = SatisfactionLevel.Medium
            break;
        case SatisfactionLevelAPI.High:
            satisfaction = SatisfactionLevel.High
            break;
        case SatisfactionLevelAPI.Perfect:
            satisfaction = SatisfactionLevel.Perfect
            break;
        default:
            console.log("failed to map SatisfactionLevelAPI");
            throw new Error("failed to map SatisfactionLevelAPI");
    }

    return satisfaction;
}

function ILAPItoIL(incidentLevelAPI: IncidentLevelAPI) {
    let incidentLevel: IncidentLevel;

    switch (incidentLevelAPI) {
        case IncidentLevelAPI.Minor:
            incidentLevel = IncidentLevel.Minor
            break;
        case IncidentLevelAPI.Medium:
            incidentLevel = IncidentLevel.Medium
            break;
        case IncidentLevelAPI.Severe:
            incidentLevel = IncidentLevel.Severe
            break;
        case IncidentLevelAPI.Blocking:
            incidentLevel = IncidentLevel.Blocking
            break;
        default:
            console.log("failed to map IncidentLevelAPI");
            throw new Error("failed to map IncidentLevelAPI");
    }

    return incidentLevel;
}

function ILtoILAPI(incidentLevel: string) {
    let incidentLevelAPI: IncidentLevelAPI;

    switch (incidentLevel) {
        case "Mineur":
            incidentLevelAPI = IncidentLevelAPI.Minor
            break;
        case "Moyen":
            incidentLevelAPI = IncidentLevelAPI.Medium
            break;
        case "Majeur":
            incidentLevelAPI = IncidentLevelAPI.Severe
            break;
        case "Bloquant":
            incidentLevelAPI = IncidentLevelAPI.Blocking
            break;
        default:
            console.log("failed to map IncidentLevel");
            throw new Error("failed to map IncidentLevel");
    }

    return incidentLevelAPI;
}

export { WSSAPItoWSS, EmergencyAPItoEmergency, SLAPItoSL, ILAPItoIL, ILtoILAPI };