import {useState, useEffect} from 'react';

export interface Parking {
    id: number;
    name: string;
    price: string;
    availability: string;
    imageUrl?: string; // Optional if not needed for every use case
}

export function useParkingSpots() {
    const [parkingSpots, setParkingSpots] = useState<Parking[]>([]);

    // Sample data to simulate fetching from a database
    const sampleAddresses: Parking[] = [
        {id: 1, name: 'Dizengoff Street 101, Tel Aviv', price: '$10', availability: 'Available: 9:00 - 16:00'},
        {id: 2, name: 'Rothschild Boulevard 20, Tel Aviv', price: '$15', availability: 'Available: 12:00 - 15:30'},
        {id: 3, name: 'Florentin Street 12, Tel Aviv', price: '$12', availability: 'Available: 10:00 - 20:00'},
    ];

    useEffect(() => {
        // Simulate fetching data from a database or API
        const fetchParkingSpots = async () => {
            // Replace this with your actual fetch logic
            // const response = await fetch('/api/parking-spots');
            // const data = await response.json();
            setParkingSpots(sampleAddresses); // For now, set the sample data
        };

        fetchParkingSpots();
    }, []);

    return parkingSpots;
}
