import { WorkSiteRequestStatus, CustomerStatus, EmergencyAPI, WorkSiteStatusAPI, WorkSiteStatus, IncidentLevelAPI } from "./api/Enums"
import { Category, Civility, Customer, Emergency, Incident, IncidentLevel, Role, Service, ToolName, User, WorkSiteAndRequest, WorkSiteRequest, WorkSiteAndRequestAPI, WorkSiteRequestAPI } from "./api/Model"

export const users: User[] = [
    {
        firstName: "Bruno",
        lastName: "Savon",
        role: Role.Concierge,
        email: "Bruno.Savon@gmail.com",
        phoneNumber: "06.12.06.53.92",
        id: "5327ed76-b97f-4cd7-8201-b4a7d2215f18"
    },
    {
        firstName: "Serge",
        lastName: "Gabard",
        role: Role.SiteChief,
        email: "Serge.Gabard@gmail.com",
        phoneNumber: "07.18.92.61.88",
        id: "b5ec11e2-41a2-482f-bebd-6bfb0cd0c65c"
    },
    {
        firstName: "Antoine",
        lastName: "Mirreau",
        role: Role.WorkSiteChief,
        email: "Antoine.Mirreau@gmail.com",
        phoneNumber: "06.76.84.39",
        id: "ea3668fd-f9fd-476c-b860-07e06364a29c"
    },
    {
    firstName: "Sarah",
    lastName: "Connor",
    role: Role.WorkSiteChief,
    email: "sarah.connor@gmail.com",
    phoneNumber: "0690291836",
    id: "0903f68d-4db1-4203-beee-095581b29d9a"
    }
]

export const customer: Customer = {
    firstName: "Jacques",
    lastName: "Dupont",
    civility: Civility.M,
    email: "Jacques.Dupont@gmail.com",
    phoneNumber: "0632548963",
    address: "2 rue",
    city: "Rennes",
    postalCode: 35000,
    status: CustomerStatus.Business,
    company: "Lama",
    id: "fa3735eb-81ff-4fb5-ac37-fc2c53b265d9"
}

export const workSiteRequestAPI: WorkSiteRequestAPI[] = [
    {
        id: 1,
        concierge: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        siteChief: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        customer: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        city: "Rennes",
        serviceType: Service.Service,
        description: "Une super description d'une super demande de chantier. Il faut rajouter du texte pour que ce soit un peu plus long et que ça ressemble plus à une vraie description.",
        emergency: EmergencyAPI.Low,
        title: "Réparation Tuyauterie",
        category: Category.PetitsTravaux,
        removal: true,
        delivery: false,
        removalRecycling: true,
        chronoQuote: true,
        estimatedDate: "2024-05-04T21:55:29.171Z",
        weightEstimate: 120,
        volumeEstimate: 41,
        provider: "Super Provider",
        tezeaAffectation: "Super Tezea Affectation",
        creationDate: "2024-05-04T21:55:29.171Z",
        status: WorkSiteRequestStatus.QuoteInProgress,
    },
    {
        id: 2,
        concierge: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        siteChief: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        customer: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        city: "Pipriac",
        serviceType: Service.Donation,
        description: "Une deuxième super description d'une super demande de chantier. Il faut rajouter du texte pour que ce soit un peu plus long et que ça ressemble plus à une vraie description.",
        emergency: EmergencyAPI.High,
        title: "Aide Pour Démmenagement",
        category: Category.Conciergerie,
        removal: true,
        delivery: true,
        removalRecycling: true,
        chronoQuote: false,
        estimatedDate: "2024-05-04T21:55:29.171Z",
        weightEstimate: 520,
        volumeEstimate: 634,
        provider: "Un Autre Provider",
        tezeaAffectation: "Une Affectation Tezea",
        creationDate: "2024-03-04T21:55:29.171Z",
        status: WorkSiteRequestStatus.QuoteInProgress,
    }
]

export const workSiteRequest: WorkSiteRequest[] = [
    {
        id: 1,
        concierge: users[0],
        siteChief: users[1],
        customer: customer,
        city: "Rennes",
        serviceType: Service.Service,
        description: "Une super description d'une super demande de chantier. Il faut rajouter du texte pour que ce soit un peu plus long et que ça ressemble plus à une vraie description.",
        emergency: Emergency.Low,
        title: "Réparation Tuyauterie",
        category: Category.PetitsTravaux,
        removal: true,
        delivery: false,
        removalRecycling: true,
        chronoQuote: true,
        estimatedDate: new Date("2024-05-04T21:55:29.171Z"),
        weightEstimate: 120,
        volumeEstimate: 41,
        provider: "Super Provider",
        tezeaAffectation: "Super Tezea Affectation",
        creationDate: new Date("2024-05-04T21:55:29.171Z"),
        status: WorkSiteRequestStatus.QuoteInProgress,
    },
    {
        id: 2,
        concierge: users[0],
        siteChief: users[1],
        customer: customer,
        city: "Pipriac",
        serviceType: Service.Donation,
        description: "Une deuxième super description d'une super demande de chantier. Il faut rajouter du texte pour que ce soit un peu plus long et que ça ressemble plus à une vraie description.",
        emergency: Emergency.High,
        title: "Aide Pour Démmenagement",
        category: Category.Conciergerie,
        removal: true,
        delivery: true,
        removalRecycling: true,
        chronoQuote: false,
        estimatedDate: new Date("2024-05-04T21:55:29.171Z"),
        weightEstimate: 520,
        volumeEstimate: 634,
        provider: "Un Autre Provider",
        tezeaAffectation: "Une Affectation Tezea",
        creationDate: new Date("2024-03-04T21:55:29.171Z"),
        status: WorkSiteRequestStatus.QuoteInProgress,
    }
]

export const workSitesAndRequestsAPI: WorkSiteAndRequestAPI[] = [
    {
        workSiteChief: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        workSiteRequest: workSiteRequestAPI[0],
        begin: "2024-05-04T09:00:12.089Z",
        end: "2024-05-04T11:00:12.089Z",
        staff: [
            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        ],
        equipments: [
            {
                name: ToolName.Axe,
                quantity: 2,
            },
            {
                name: ToolName.Drill,
                quantity: 1,
            },
            {
                name: ToolName.Wrench,
                quantity: 1,
            },
        ],
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: WorkSiteStatusAPI.Standby,
        hasIncidents: false,

        satisfaction: null,
        signature: "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam, enim sed consequat ullamcorper, tellus lectus finibus nunc, nec rhoncus massa ante eu risus. Ut in tempus nunc. Donec sit amet rhoncus erat. Donec dictum dolor in ex dictum, quis tempor quam vestibulum. Etiam mi nisi, dictum et lorem nec, imperdiet placerat tortor. Cras sagittis laoreet risus, sit amet hendrerit tortor. Vivamus sit amet congue lorem. Curabitur condimentum odio at molestie interdum. Vestibulum faucibus vehicula felis, vel faucibus purus fermentum eu. Praesent viverra ipsum nulla, et porttitor diam mattis ut. Nunc eu dignissim odio. Nunc ac vestibulum velit, vitae vehicula massa. Donec ut quam maximus, tincidunt leo a, lobortis neque. Suspendisse nibh nisi, sagittis et finibus in, placerat quis est. Donec non leo iaculis, iaculis justo eu, mollis sapien."
    },
    {
        workSiteChief: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        workSiteRequest: workSiteRequestAPI[1],
        begin: "2024-05-11T14:30:00.000Z",
        end: "2024-05-11T17:00:00.000Z",
        staff: [
            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        ],
        equipments: [
            {
                name: ToolName.Palette,
                quantity: 2,
            },
            {
                name: ToolName.Shear,
                quantity: 1,
            },
            {
                name: ToolName.Wrench,
                quantity: 1,
            },
        ],
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: WorkSiteStatusAPI.InProgress,
        hasIncidents: false,

        satisfaction: null,
        signature: null,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam, enim sed consequat ullamcorper, tellus lectus finibus nunc, nec rhoncus massa ante eu risus. Ut in tempus nunc. Donec sit amet rhoncus erat. Donec dictum dolor in ex dictum, quis tempor quam vestibulum. Etiam mi nisi, dictum et lorem nec, imperdiet placerat tortor. Cras sagittis laoreet risus, sit amet hendrerit tortor. Vivamus sit amet congue lorem. Curabitur condimentum odio at molestie interdum. Vestibulum faucibus vehicula felis, vel faucibus purus fermentum eu. Praesent viverra ipsum nulla, et porttitor diam mattis ut. Nunc eu dignissim odio. Nunc ac vestibulum velit, vitae vehicula massa. Donec ut quam maximus, tincidunt leo a, lobortis neque. Suspendisse nibh nisi, sagittis et finibus in, placerat quis est. Donec non leo iaculis, iaculis justo eu, mollis sapien."
    },
    {
        workSiteChief: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        workSiteRequest: workSiteRequestAPI[1],
        begin: "2024-05-11T18:00:00.000Z",
        end: "2024-05-11T19:00:00.000Z",
        staff: [
            "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        ],
        equipments: [
            {
                name: ToolName.CementMixer,
                quantity: 2,
            },
            {
                name: ToolName.Ladder,
                quantity: 1,
            }
        ],
        id: "3fb85f64-5717-4562-b3fc-2c963f66afa6",
        status: WorkSiteStatusAPI.Done,
        hasIncidents: true,

        satisfaction: null,
        signature: null,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam, enim sed consequat ullamcorper, tellus lectus finibus nunc, nec rhoncus massa ante eu risus. Ut in tempus nunc. Donec sit amet rhoncus erat. Donec dictum dolor in ex dictum, quis tempor quam vestibulum. Etiam mi nisi, dictum et lorem nec, imperdiet placerat tortor. Cras sagittis laoreet risus, sit amet hendrerit tortor. Vivamus sit amet congue lorem. Curabitur condimentum odio at molestie interdum. Vestibulum faucibus vehicula felis, vel faucibus purus fermentum eu. Praesent viverra ipsum nulla, et porttitor diam mattis ut. Nunc eu dignissim odio. Nunc ac vestibulum velit, vitae vehicula massa. Donec ut quam maximus, tincidunt leo a, lobortis neque. Suspendisse nibh nisi, sagittis et finibus in, placerat quis est. Donec non leo iaculis, iaculis justo eu, mollis sapien."
    },
    {
        workSiteChief: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        workSiteRequest: workSiteRequestAPI[0],
        begin: "2024-05-12T10:00:00.000Z",
        end: "2024-05-12T12:30:00.000Z",
        staff: [
            "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        ],
        equipments: [
            {
                name: ToolName.Palette,
                quantity: 2,
            },
        ],
        id: "3fb85f64-5717-4563-b3fc-2c963f66afa6",
        status: WorkSiteStatusAPI.InProgress,
        hasIncidents: true,

        satisfaction: null,
        signature: null,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam, enim sed consequat ullamcorper, tellus lectus finibus nunc, nec rhoncus massa ante eu risus. Ut in tempus nunc. Donec sit amet rhoncus erat. Donec dictum dolor in ex dictum, quis tempor quam vestibulum. Etiam mi nisi, dictum et lorem nec, imperdiet placerat tortor. Cras sagittis laoreet risus, sit amet hendrerit tortor. Vivamus sit amet congue lorem. Curabitur condimentum odio at molestie interdum. Vestibulum faucibus vehicula felis, vel faucibus purus fermentum eu. Praesent viverra ipsum nulla, et porttitor diam mattis ut. Nunc eu dignissim odio. Nunc ac vestibulum velit, vitae vehicula massa. Donec ut quam maximus, tincidunt leo a, lobortis neque. Suspendisse nibh nisi, sagittis et finibus in, placerat quis est. Donec non leo iaculis, iaculis justo eu, mollis sapien."
    }
]

export const workSitesAndRequests: WorkSiteAndRequest[] = [
    {
        workSiteChief: users[2],
        workSiteRequest: workSiteRequest[0],
        begin: new Date("2024-05-04T09:00:12.089Z"),
        end: new Date("2024-05-04T11:00:12.089Z"),
        staff: [
            users[0],
            users[1]
        ],
        equipments: [
            {
                name: ToolName.Axe,
                quantity: 2,
            },
            {
                name: ToolName.Drill,
                quantity: 1,
            },
            {
                name: ToolName.Wrench,
                quantity: 1,
            },
        ],
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: WorkSiteStatus.Standby,
        hasIncidents: false,

        satisfaction: null,
        signature: "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC",
        comment: "comment"
    },
    {
        workSiteChief: users[2],
        workSiteRequest: workSiteRequest[1],
        begin: new Date("2024-05-11T14:30:00.000Z"),
        end: new Date("2024-05-11T17:00:00.000Z"),
        staff: [
            users[0]],
        equipments: [
            {
                name: ToolName.Palette,
                quantity: 2,
            },
            {
                name: ToolName.Shear,
                quantity: 1,
            },
            {
                name: ToolName.Wrench,
                quantity: 1,
            },
        ],
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        status: WorkSiteStatus.InProgress,
        hasIncidents: false,

        satisfaction: null,
        signature: null,
        comment: "comment"
    },
    {
        workSiteChief: users[2],
        workSiteRequest: workSiteRequest[1],
        begin: new Date("2024-05-11T18:00:00.000Z"),
        end: new Date("2024-05-11T19:00:00.000Z"),
        staff: [
            users[0],
            users[1],
        ],
        equipments: [
            {
                name: ToolName.CementMixer,
                quantity: 2,
            },
            {
                name: ToolName.Ladder,
                quantity: 1,
            }
        ],
        id: "3fb85f64-5717-4562-b3fc-2c963f66afa6",
        status: WorkSiteStatus.Done,
        hasIncidents: true,

        satisfaction: null,
        signature: null,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam, enim sed consequat ullamcorper, tellus lectus finibus nunc, nec rhoncus massa ante eu risus. Ut in tempus nunc. Donec sit amet rhoncus erat. Donec dictum dolor in ex dictum, quis tempor quam vestibulum. Etiam mi nisi, dictum et lorem nec, imperdiet placerat tortor. Cras sagittis laoreet risus, sit amet hendrerit tortor. Vivamus sit amet congue lorem. Curabitur condimentum odio at molestie interdum. Vestibulum faucibus vehicula felis, vel faucibus purus fermentum eu. Praesent viverra ipsum nulla, et porttitor diam mattis ut. Nunc eu dignissim odio. Nunc ac vestibulum velit, vitae vehicula massa. Donec ut quam maximus, tincidunt leo a, lobortis neque. Suspendisse nibh nisi, sagittis et finibus in, placerat quis est. Donec non leo iaculis, iaculis justo eu, mollis sapien."
    },
    {
        workSiteChief: users[2],
        workSiteRequest: workSiteRequest[0],
        begin: new Date("2024-05-12T10:00:00.000Z"),
        end: new Date("2024-05-12T12:30:00.000Z"),
        staff: [
            users[0],
            users[1],
        ],
        equipments: [
            {
                name: ToolName.Palette,
                quantity: 2,
            },
        ],
        id: "3fb85f64-5717-4563-b3fc-2c963f66afa6",
        status: WorkSiteStatus.InProgress,
        hasIncidents: true,

        satisfaction: null,
        signature: null,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam, enim sed consequat ullamcorper, tellus lectus finibus nunc, nec rhoncus massa ante eu risus. Ut in tempus nunc. Donec sit amet rhoncus erat. Donec dictum dolor in ex dictum, quis tempor quam vestibulum. Etiam mi nisi, dictum et lorem nec, imperdiet placerat tortor. Cras sagittis laoreet risus, sit amet hendrerit tortor. Vivamus sit amet congue lorem. Curabitur condimentum odio at molestie interdum. Vestibulum faucibus vehicula felis, vel faucibus purus fermentum eu. Praesent viverra ipsum nulla, et porttitor diam mattis ut. Nunc eu dignissim odio. Nunc ac vestibulum velit, vitae vehicula massa. Donec ut quam maximus, tincidunt leo a, lobortis neque. Suspendisse nibh nisi, sagittis et finibus in, placerat quis est. Donec non leo iaculis, iaculis justo eu, mollis sapien."
    }
]

export const incidentsExample: Incident[] = [
    {
        level: IncidentLevelAPI.Minor,
        title: "Accident Travail",
        description: "Jean-Pierre s'est cassé le pied.",
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        evidences: [
            "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC",
            "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAC4UlEQVR4nOzVMRHCABQEUWDQwKAIPWAFB4mHGEkbHekj4xf7noJrdu65b+8bc5bfa3pC2mN6AEwSAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDS7t/Pf3pD2nqc0xPSPABpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRA2hUAAP//sscIg4U4j84AAAAASUVORK5CYII="
        ]
    },
    {
        level: IncidentLevelAPI.Blocking,
        title: "Manque de matériel",
        description: "Pas assez de ciment pour finir la chappe, impossibilité d'en acheter aux alentours. Report du chantier.",
        id: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
        evidences: []
    }
]