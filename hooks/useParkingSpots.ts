import {useState, useEffect} from 'react';

export interface Parking {
    id: number;
    name: string;
    price: string;
    availability: string;
    imageUrl?: string; // Optional if not needed for every use case
    lat: number;
    lng: number;
}

export function useParkingSpots() {
    const [parkingSpots, setParkingSpots] = useState<Parking[]>([]);

    // Sample data to simulate fetching from a database
    const sampleParkingSpots: Parking[] = [
        {
            id: 1,
            name: 'Allenby Street 45, Tel Aviv',
            price: '$8',
            availability: 'Available: 8:00 - 18:00',
            lat: 32.063568,
            lng: 34.770569,
        },
        {
            id: 2,
            name: 'King George Street 65, Tel Aviv',
            price: '$12',
            availability: 'Available: 10:00 - 22:00',
            lat: 32.072423,
            lng: 34.774787,
        },
        {
            id: 3,
            name: 'Bograshov Street 33, Tel Aviv',
            price: '$10',
            availability: 'Available: 9:00 - 20:00',
            lat: 32.080835,
            lng: 34.768512,
        },
        {
            id: 4,
            name: 'Yigal Alon Street 159, Tel Aviv',
            price: '$14',
            availability: 'Available: 24 hours',
            lat: 32.072559,
            lng: 34.794019,
        },
        {
            id: 5,
            name: 'Hahashmonaim Street 96, Tel Aviv',
            price: '$9',
            availability: 'Available: 7:00 - 19:00',
            lat: 32.068951,
            lng: 34.784724,
        },
    ];

    useEffect(() => {
        // Simulate fetching data from a database or API
        const fetchParkingSpots = async () => {
            // Replace this with your actual fetch logic
            // const response = await fetch('/api/parking-spots');
            // const data = await response.json();
            setParkingSpots(sampleParkingSpots); // For now, set the sample data
        };

        fetchParkingSpots();
    }, []);

    return parkingSpots;
}
