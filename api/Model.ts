export enum Category {
    Conciergerie = "Conciergerie",
    Recyclerie = "Recyclerie",
    PetitsTravaux = "Petits Travaux",
    NettoyageDeVehicule = "Nettoyage De Vehicule",
    EspacesVerts = "Espaces Verts",
    LaverieBlanchisserie = "Laverie Blanchisserie",
    CommerceAmbulant = "Commerce Ambulant",
    PiquetsEnBois = "Piquets En Bois",
    BoisDeChauffage = "Bois De Chauffage",
    CreaPalette = "Crea Palette",
    LeBioAVotrePorte = "Le Bio A Votre Porte",
    DonDePlasmaEtDeSang = "Don De Plasma Et De Sang",
    RelaisColis = "Relais Colis",
    LocationVelosElectriques = "Location Velos Electriques"
}

export enum ToolName {
    Stapler = "Agrafeuse",
    CementMixer = "Bétonnière",
    Shear = "Cisaille",
    Wrench = "Clé anglaise",
    Ladder = "Échelle",
    Axe = "Hache",
    Palette = "Palette",
    Rake = "Râteau",
    Saw = "Scie",
    Drill = "Perceuse",
    Shovel = "Pelle"
}

export enum Civility {
    M = "M",
    Mme = "Mme",
    Mlle = "Mlle"
}

export enum CustomerStatus {
    Business = "Business",
    Community = "Communauté",
    Association = "Association",
    Particular = "Particulier"
}

export enum Emergency {
    Low = "Bas",
    Medium = "Moyen",
    High = "Elevé"
}

export enum Role {
    Concierge = "Concièrge",
    SiteChief = "Chef de site",
    Commercial = "Commercial",
    WorkSiteChief = "Chef de chantier",
    Employee = "Employé"
}

export enum SatisfactionLevel {
    Perfect = "Parfait",
    High = "Très Satisfait",
    Medium = "Satisfait",
    Low = "Peu Satisfait",
    Dissatisfied = "Pas Du Tout Satisfait"
}

export enum Service {
    Service = "Service",
    Donation = "Donation",
    ServiceAndDonation = "Service et Donation",
    Plasma = "Plasma",
    Information = "Information"
}

export enum WorkSiteRequestStatus {
    New = "Nouvelle",
    QuoteInProgress = "Devis en cours",
    QuoteSigned = "Devis signé",
    Duplicate = "Doublon",
    Billed = "Facturée",
    Refused = "Refusée",
    Closed = "Cloturée",
    Other = "Autre"
}

export enum WorkSiteRequestStatusListPage {
    ToComplete = "A compléter",
    Standby = "En attente",
    Done = "Terminé",
    Archive = "Archivé"
}

export enum WorkSiteStatus {
    Standby = "En attente",
    InProgress = "En cours",
    Canceled = "Archivé",
    Done = "Terminé"
}

export interface Task {
    id: number
    name: string
    date: string
    startHours: string
    endHour: string
    address: string
    status: WorkSiteStatus
}

export interface TaskRequest {
    id: number
    name: string
    date: string
    startHours: string
    endHour: string
    address: string
    status: WorkSiteRequestStatusListPage
}

export interface EmergencyDetails {
    description: string,
    chantier: any,
    id: number,
    emergency: Emergency,
    task: Task
}


export interface SubErrorDetails {
    message: string
    path?: string
    errorCode?: string
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

interface WorkSiteRequestBase {
    id: number,
    city: string,
    serviceType: Service,
    description: string,
    emergency: Emergency,
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
    customer: string,
    estimatedDate: string,
    creationDate: string
}

export interface WorkSiteRequest extends WorkSiteRequestBase {
    concierge: User,
    siteChief: User,
    customer: Customer,
    estimatedDate: Date,
    creationDate: Date
}

interface WorkSiteBase {
    workSiteRequest: number,
    equipments: Tool[],
    id: string,
    satisfaction: SatisfactionLevel | null,
    status: WorkSiteStatus,
    signature: string | null,
    incident: boolean,
    comment: string
}

export interface WorkSiteAPI extends WorkSiteBase {
    workSiteChief: string,
    staff: string[],
    begin: string,
    end: string
}

export interface WorkSite extends WorkSiteBase {
    workSiteChief: User,
    staff: User[],
    begin: Date,
    end: Date
}

interface WorkSiteAndRequestBase {
    equipments: Tool[],
    id: string,
    satisfaction: SatisfactionLevel | null,
    status: WorkSiteStatus,
    signature: string | null
    incident: boolean,
    comment: string
}

export interface WorkSiteAndRequestAPI extends WorkSiteAndRequestBase {
    workSiteRequest: WorkSiteRequestAPI,
    workSiteChief: string,
    staff: string[],
    begin: string,
    end: string,
}

export interface WorkSiteAndRequest extends WorkSiteAndRequestBase {
    workSiteRequest: WorkSiteRequest,
    workSiteChief: User,
    staff: User[],
    begin: Date,
    end: Date,
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
    email: string;
    phoneNumber: string;
}

export interface Tool {
    name: ToolName;
    quantity: number;
}

export enum IncidentLevel {
    Minor = "Mineur",
    Medium = "Moyen",
    Severe = "Grave",
    Blocking = "Bloquant"
}

export interface Incident {
    level: IncidentLevel,
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
