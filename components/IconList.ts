const categorieIcons = [
    {
        category: 'Don De Plasma Et De Sang',
        image: require('../assets/task_icons/blood.png'),
    },
    {
        category: 'Crea Palette',
        image: require('../assets/task_icons/pallet.png'),
    },
    {
        category: 'Bois De Chauffage',
        image: require('../assets/task_icons/bonfire.png'),
    },
    {
        category: 'Piquets En Bois',
        image: require('../assets/task_icons/wood.png'),
    },
    {
        category: 'Laverie Blanchisserie',
        image: require('../assets/task_icons/washing-machine.png'),
    },
    {
        category: 'Conciergerie',
        image: require('../assets/task_icons/hotel-bell.png'),
    },
    {
        category: 'Location Velos Electriques',
        image: require('../assets/task_icons/bicycle.png'),
    },
    {
        category: 'Nettoyage De Vehicule',
        image: require('../assets/task_icons/cleaning.png'),
    },
    {
        category: 'Relais Colis',
        image: require('../assets/task_icons/delivery.png'),
    },
    {
        category: 'Le Bio A Votre Porte',
        image: require('../assets/task_icons/epizea.png'),
    },
    {
        category: 'Espaces Verts',
        image: require('../assets/task_icons/greenerie.png'),
    },
    {
        category: 'Commerce Ambulant',
        image: require('../assets/task_icons/peddler.png'),
    },
    {
        category: 'Recyclerie',
        image: require('../assets/task_icons/recycling.png'),
    },
    {
        category: 'Petits Travaux',
        image: require('../assets/task_icons/tools.png'),
    }
]

const stateIcons = [
    {
        state: 'Incident',
        color: '#E79F4A',
        image: require('../assets/state_icons/warning.png'),
    },
    {
        state: 'Standby',
        color: '#FFFFFF',
    },
    {
        state: 'InProgress',
        color: '#76C3F0',
        image: require('../assets/state_icons/stopwatch.png'),
    },
    {
        state: 'Done',
        color: '#8FBE40',
        image: require('../assets/state_icons/check.png'),
    },
    {
        state: 'Archive',
        color: '#8FBE40',
        image: require('../assets/state_icons/check.png'),
    },
]

export { categorieIcons, stateIcons }