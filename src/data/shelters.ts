import { Shelter } from '../types/shelter';

export const SHELTER_DATA: Shelter[] = [
    {
        id: 1,
        name: 'Центр дитячої та юнацької творчості',
        address: 'вул. Чистяківська, 18',
        rating: 3.5,
        photoUrl: '',
        description: 'Підвал освітнього закладу.',
        feedback: [
            {
                id: 1,
                user: 'Мавріна В.Р.',
                rating: 4,
                comment: 'Чудове укриття для дітей та дорослих, але мало сидячих місць.'
            },
            {
                id: 2,
                user: 'Гринько В.П.',
                rating: 3,
                comment: 'Погана вентиляція.'
            }
        ]
    },
    {
        id: 2,
        name: 'Київська Школа Економіки',
        address: 'вул. Миколи Шпака, 3',
        rating: 0,
        photoUrl: '',
        description: 'Підвал освітнього закладу.',
        feedback: []
    }
];