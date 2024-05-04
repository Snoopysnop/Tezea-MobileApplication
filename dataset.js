const workSites = [
    {
        "concierge": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "siteChief": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "customer": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "city": "Rennes",
        "serviceType": "Service",
        "description": "Une super description d'une super demande de chantier. Il faut rajouter du texte pour que ce soit un peu plus long et que ça ressemble plus à une vraie description.",
        "emergency": "Low",
        "title": "Réparation Tuyauterie",
        "category": "Conciergerie",
        "removal": true,
        "delivery": false,
        "removalRecycling": true,
        "chronoQuote": true,
        "estimatedDate": "2024-05-04T21:55:29.171Z",
        "weightEstimate": 120,
        "volumeEstimate": 41,
        "provider": "Super Provider",
        "tezeaAffectation": "Super Tezea Affectation",
        "creationDate": "2024-05-04T21:55:29.171Z",

        "begin": "2024-05-04T21:36:12.089Z",
        "end": "2024-05-04T21:36:12.089Z",
        "staff": [
            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        ],
        "equipments": {
            "Pelle": 2,
            "Marteau": 3,
            "Tournevis": 2
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "status": "Standby",
    },
    {
        "concierge": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "siteChief": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "customer": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "city": "Pipriac",
        "serviceType": "Livraison",
        "description": "Une deuxième super description d'une super demande de chantier. Il faut rajouter du texte pour que ce soit un peu plus long et que ça ressemble plus à une vraie description.",
        "emergency": "High",
        "title": "Aide Pour Démmenagement",
        "category": "Conciergerie",
        "removal": true,
        "delivery": true,
        "removalRecycling": true,
        "chronoQuote": false,
        "estimatedDate": "2024-05-04T21:55:29.171Z",
        "weightEstimate": 520,
        "volumeEstimate": 634,
        "provider": "Un Autre Provider",
        "tezeaAffectation": "Une Affectation Tezea",
        "creationDate": "2024-03-04T21:55:29.171Z",

        "begin": "2024-05-11T14:30:00.000Z",
        "end": "2024-05-11T17:00:00.000Z",
        "staff": [
            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        ],
        "equipments": {
            "Ampoule": 2,
            "Diable": 4,
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "status": "In Progress",
    }
]

const users = [
    {
        "firstName": "Bruno",
        "lastName": "Savon",
        "role": "Concierge",
        "email": "Bruno.Savon@gmail.com",
        "phoneNumber": "06.12.06.53.92",
        "id": "5327ed76-b97f-4cd7-8201-b4a7d2215f18"
    },
    {
        "firstName": "Serge",
        "lastName": "Gabard",
        "role": "Concierge",
        "email": "Serge.Gabard@gmail.com",
        "phoneNumber": "07.18.92.61.88",
        "id": "b5ec11e2-41a2-482f-bebd-6bfb0cd0c65c"
    },
    {
        "firstName": "Antoine",
        "lastName": "Mirreau",
        "role": "WorkSiteChief",
        "email": "Antoine.Mirreau@gmail.com",
        "phoneNumber": "06.76.84.39",
        "id": "ea3668fd-f9fd-476c-b860-07e06364a29c"
    }
]

const customer = {
    "firstName": "Jacques",
    "lastName": "Dupont",
    "civility": "Mr",
    "email": "Jacques.Dupont@gmail.com",
    "phoneNumber": "0632548963",
    "address": "2 rue",
    "city": "Rennes",
    "postalCode": 35000,
    "status": "Business",
    "company": "Lama",
    "id": "fa3735eb-81ff-4fb5-ac37-fc2c53b265d9"
}

const incidents = [
    {
      "level": "Minor",
      "title": "Accident Travail",
      "description": "Jean-Pierre s'est cassé le pied.",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "evidences": [
          "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC",
          "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAC4UlEQVR4nOzVMRHCABQEUWDQwKAIPWAFB4mHGEkbHekj4xf7noJrdu65b+8bc5bfa3pC2mN6AEwSAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDSBECaAEgTAGkCIE0ApAmANAGQJgDS7t/Pf3pD2nqc0xPSPABpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRAmgBIEwBpAiBNAKQJgDQBkCYA0gRA2hUAAP//sscIg4U4j84AAAAASUVORK5CYII="
      ]
    },
    {
        "level": "Blocking",
        "title": "Manque de matériel",
        "description": "Pas assez de ciment pour finir la chappe, impossibilité d'en acheter aux alentours. Report du chantier.",
        "id": "4fa85f64-5717-4562-b3fc-2c963f66afa6",
        "evidences": []
      }
  ]