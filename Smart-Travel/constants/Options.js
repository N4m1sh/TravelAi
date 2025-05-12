import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
export const SelectTravalerList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveler in exploration',
        icon:<MaterialCommunityIcons name="airplane" size={24} color="black" />,
        people:'1 Person'
    },

    {
        id:2,
        title:'Couple',
        desc:'Two travellers in tandem',
        icon:<FontAwesome5 name="glass-cheers" size={24} color="black" />,
        people:'2 People'
    },

    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:<FontAwesome6 name="house" size={24} color="black" />,
        people:'3 to 5 People'
    },

    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekers',
        icon:<Fontisto name="sait-boat" size={24} color="black" />,
        people:'5 - 10 People'
    }
]


export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:<FontAwesome6 name="money-bill" size={24} color="black" />,
    },

    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average',
        icon:<FontAwesome6 name="money-bills" size={24} color="black" />,
        
    },

    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about the cost',
        icon:<FontAwesome6 name="sack-dollar" size={24} color="black" />,
        
    }
]


export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDay} Days and {totalNight} Nights for {traveler} with {budget} budget with Flight details, Flight Price with booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and places to visit nearby ones with placeName, Place Details, Place Image Url, Geo coordinates, ticket Pricing, Time to travel each of location for {totalDay} days {totalNight} night with each day plan with best time to visit in JSON format.'