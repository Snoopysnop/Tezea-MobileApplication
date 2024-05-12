const categorieIcons = [
    {
        category: 'DonDePlasmaEtDeSang',
        image: require('../assets/task_icons/blood.png'),
    },
    {
        category: 'CreaPalette',
        image: require('../assets/task_icons/pallet.png'),
    },
    {
        category: 'BoisDeChauffage',
        image: require('../assets/task_icons/bonfire.png'),
    },
    {
        category: 'PiquetsEnBois',
        image: require('../assets/task_icons/wood.png'),
    },
    {
        category: 'LaverieBlanchisserie',
        image: require('../assets/task_icons/washing-machine.png'),
    },
    {
        category: 'Conciergerie',
        image: require('../assets/task_icons/hotel-bell.png'),
    },
    {
        category: 'LocationVelosElectriques',
        image: require('../assets/task_icons/bicycle.png'),
    },
    {
        category: 'NettoyageDeVehicule',
        image: require('../assets/task_icons/cleaning.png'),
    },
    {
        category: 'RelaisColis',
        image: require('../assets/task_icons/delivery.png'),
    },
    {
        category: 'LeBioAVotrePorte',
        image: require('../assets/task_icons/epizea.png'),
    },
    {
        category: 'EspacesVerts',
        image: require('../assets/task_icons/greenerie.png'),
    },
    {
        category: 'CommerceAmbulant',
        image: require('../assets/task_icons/peddler.png'),
    },
    {
        category: 'Recyclerie',
        image: require('../assets/task_icons/recycling.png'),
    },
    {
        category: 'PetitsTravaux',
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