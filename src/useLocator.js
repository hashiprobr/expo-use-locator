import { useRef, useState } from 'react';

import * as Location from 'expo-location';

export default function useLocator() {
    const ref = useRef(true);

    const [reading, setReading] = useState(false);

    async function read() {
        setReading(true);

        if (ref.current) {
            const response = await Location.requestForegroundPermissionsAsync();
            if (response.granted) {
                ref.current = false;
            } else {
                throw new Error('Could not receive permission');
            }
        }

        const location = await Location.getCurrentPositionAsync();

        setReading(false);

        return {
            datetime: new Date(location.timestamp),
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy,
        };
    }

    return {
        reading,
        read,
    };
}
