import { MenuType } from '@/@types/menu.types';


const menu: MenuType[] = [
    {
        id: 1,
        name: 'Find Talent',
        expandable: true
    },
    {
        id: 2,
        name: 'Find Work',
        expandable: true
    },
    {
        id: 3,
        name: 'Why Upwork',
        expandable: true
    },
    {
        id: 4,
        name: 'Enterprise',
        expandable: true
    },
]

const subMenu = [
    {
        name: 'Development & IT'
    },
    {
        name: 'AI Services'
    },
    {
        name: 'Design & Creative'
    },
    {
        name: 'Sales & Marketing'
    },
    {
        name: 'Admin & Customer Support'
    },
    {
        name: 'More'
    }
]


export { menu, subMenu }