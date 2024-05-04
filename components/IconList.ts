const categorieIcons = [
    {
        category: 'Bicycle',
        image: require('../assets/task_icons/bicycle.png'),
    },
    {
        category: 'Cleaning',
        image: require('../assets/task_icons/cleaning.png'),
    },
    {
        category: 'Delivery',
        image: require('../assets/task_icons/delivery.png'),
    },
    {
        category: 'Epizea',
        image: require('../assets/task_icons/epizea.png'),
    },
    {
        category: 'Greenerie',
        image: require('../assets/task_icons/greenerie.png'),
    },
    {
        category: 'Peddler',
        image: require('../assets/task_icons/peddler.png'),
    },
    {
        category: 'Recycling',
        image: require('../assets/task_icons/recycling.png'),
    },
    {
        category: 'Tools',
        image: require('../assets/task_icons/tools.png'),
    }
]

const stateIcons = [
    {
        state: 'Todo',
        color: '#FFFFFF',
    },
    {
        state: 'In Progress',
        color: '#76C3F0',
        image: require('../assets/state_icons/stopwatch.png'),
    },
    {
        state: 'Incident',
        color: '#E79F4A',
        image: require('../assets/state_icons/warning.png'),
    },
    {
        state: 'Done',
        color: '#8FBE40',
        image: require('../assets/state_icons/check.png'),
    },
]

export { categorieIcons, stateIcons }