import { Category, Civility, CustomerStatus, Emergency, EmergencyAPI, IncidentLevel, IncidentLevelAPI, Role, SatisfactionLevel, SatisfactionLevelAPI, Service, ToolName, WorkSiteRequestStatus, WorkSiteStatus, WorkSiteStatusAPI } from "./Enums"

// ----------------------------------------   USERS / CUSTOMERS   ---------------------------------------- //

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
    email: string;
    phoneNumber: string;
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    civility: Civility;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: number;
    status: CustomerStatus;
    company: string;
}


// ----------------------------------------   WORKSITE REQUESTS   ---------------------------------------- //

interface WorkSiteRequestBase {
    id: number,
    city: string,
    serviceType: Service,
    description: string,
    title: string,
    category: Category,
    removal: boolean,
    delivery: boolean,
    removalRecycling: boolean,
    chronoQuote: boolean,
    weightEstimate: number,
    volumeEstimate: number,
    provider: string,
    tezeaAffectation: string,
    status: WorkSiteRequestStatus,
}

export interface WorkSiteRequestAPI extends WorkSiteRequestBase {
    concierge: string,
    siteChief: string,
    emergency: EmergencyAPI,
    customer: string,
    estimatedDate: string,
    creationDate: string
}

export interface WorkSiteRequest extends WorkSiteRequestBase {
    concierge: User,
    siteChief: User,
    emergency: Emergency,
    customer: Customer,
    estimatedDate: Date,
    creationDate: Date
}


// ----------------------------------------   WORKSITE   ---------------------------------------- //

interface WorkSiteBase {
    workSiteRequest: number,
    id: string,
    signature: string | null,
    incident: boolean,
    comment: string
}

export interface WorkSiteAPI extends WorkSiteBase {
    workSiteChief: string,
    equipments: any,
    staff: string[],
    status: WorkSiteStatusAPI,
    satisfaction: SatisfactionLevelAPI | null,
    begin: string,
    end: string
}

export interface WorkSite extends WorkSiteBase {
    workSiteChief: User,
    staff: User[],
    status: WorkSiteStatus,
    begin: Date,
    satisfaction: SatisfactionLevel | null,
    end: Date,
    equipments: any
}

export interface Tool {
    name: ToolName;
    quantity: number;
}

export interface Incident {
    level: IncidentLevelAPI,
    title: string,
    description: string,
    id: string,
    evidences: string[]
}

export interface Invoice {
    title: string,
    description: string,
    id: string,
    amount: number,
    invoiceFile: string,
    type: "file" | "image"
}


// ----------------------------------------   WORKSITE AND REQUEST  ---------------------------------------- //

interface WorkSiteAndRequestBase {
    equipments: Tool[],
    id: string,
    signature: string | null
    hasIncidents: boolean,
    comment: string
}

export interface WorkSiteAndRequestAPI extends WorkSiteAndRequestBase {
    workSiteRequest: WorkSiteRequestAPI,
    workSiteChief: string,
    satisfaction: SatisfactionLevelAPI | null,
    staff: string[],
    begin: string,
    status: WorkSiteStatusAPI,
    end: string,
}

export interface WorkSiteAndRequest extends WorkSiteAndRequestBase {
    workSiteRequest: WorkSiteRequest,
    workSiteChief: User,
    satisfaction: SatisfactionLevel | null,
    staff: User[],
    status: WorkSiteStatus,
    begin: Date,
    end: Date,
}


// ----------------------------------------   OTHERS   ---------------------------------------- //

export interface SubErrorDetails {
    message: string
    path?: string
    errorCode?: string
}
export { Category, Civility, Emergency, IncidentLevel, Role, Service, ToolName };

