import { useRef, useState } from 'react';

import * as Location from 'expo-location';

export default function useLocator() {
    const ref = useRef(true);

    const [reading, setReading] = useState(false);

    async function read() {
        let location;
        setReading(true);
        try {
            if (ref.current) {
                const response = await Location.requestForegroundPermissionsAsync();
                if (response.granted) {
                    ref.current = false;
                } else {
                    throw new Error('Could not receive permission');
                }
            }
            location = await Location.getCurrentPositionAsync();
        } finally {
            setReading(false);
        }
        return location;
    }

    return {
        reading,
        read,
    };
}
