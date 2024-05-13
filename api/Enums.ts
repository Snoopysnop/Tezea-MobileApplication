// ----------------------------------------   USERS / CUSTOMERS   ---------------------------------------- //

// TODO update with real enum values
enum Civility {
    M = "M",
    Mme = "Mme",
    Mlle = "Mlle"
}

enum CustomerStatus {
    Business = "Business",
    Community = "Communauté",
    Association = "Association",
    Particular = "Particulier"
}

enum Role {
    Concierge = "Concièrge",
    SiteChief = "Chef de site",
    Commercial = "Commercial",
    WorkSiteChief = "Chef de chantier",
    Employee = "Employé"
}


// ----------------------------------------   WORKSITE REQUEST   ---------------------------------------- //

// TODO is it really in french ???
enum WorkSiteRequestStatus {
    New = "Nouvelle",
    QuoteInProgress = "Devis en cours",
    QuoteSigned = "Devis signé",
    Duplicate = "Doublon",
    Billed = "Facturée",
    Refused = "Refusée",
    Closed = "Cloturée",
    Other = "Autre"
}

enum Service {
    Service = "Service",
    Donation = "Donation",
    ServiceAndDonation = "Service et Donation",
    Plasma = "Plasma",
    Information = "Information"
}

enum Category {
    Conciergerie = "Conciergerie",
    Recyclerie = "Recyclerie",
    PetitsTravaux = "PetitsTravaux",
    NettoyageDeVehicule = "NettoyageDeVehicule",
    EspacesVerts = "EspacesVerts",
    LaverieBlanchisserie = "LaverieBlanchisserie",
    CommerceAmbulant = "CommerceAmbulant",
    PiquetsEnBois = "PiquetsEnBois",
    BoisDeChauffage = "BoisDeChauffage",
    CreaPalette = "CreaPalette",
    LeBioAVotrePorte = "LeBioAVotrePorte",
    DonDePlasmaEtDeSang = "DonDePlasmaEtDeSang",
    RelaisColis = "RelaisColis",
    LocationVelosElectriques = "LocationVelosElectriques"
}


// TODO make sure these are the correct values
enum EmergencyAPI {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}

enum Emergency {
    Low = "Faible",
    Medium = "Moyen",
    High = "Elevé"
}


// ----------------------------------------   WORKSITE   ---------------------------------------- //

enum WorkSiteStatus {
    Standby = "En attente",
    InProgress = "En cours",
    Done = "Terminé",
    Archive = "Archivé",
}

enum WorkSiteStatusAPI {
    Standby = "Standby",
    InProgress = "InProgress",
    Done = "Done",
    Archive = "Archive",
}

enum IncidentLevelAPI {
    Minor = "Minor",
    Medium = "Medium",
    Severe = "Severe",
    Blocking = "Blocking"
}

enum IncidentLevel {
    Minor = "Mineur",
    Medium = "Moyen",
    Severe = "Majeur",
    Blocking = "Bloquant"
}

enum SatisfactionLevelAPI {
    Perfect = "Perfect",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Dissatisfied = "Dissatisfied"
}

enum SatisfactionLevel {
    Perfect = "Parfait",
    High = "Très Satisfait",
    Medium = "Satisfait",
    Low = "Peu Satisfait",
    Dissatisfied = "Pas Du Tout Satisfait"
}

enum ToolName {
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

export { Civility, SatisfactionLevel, IncidentLevelAPI,ToolName,SatisfactionLevelAPI, Category, CustomerStatus, Emergency, IncidentLevel, Role, Service, WorkSiteRequestStatus, WorkSiteStatus, WorkSiteStatusAPI, EmergencyAPI };