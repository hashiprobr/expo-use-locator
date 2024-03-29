expo-use-locator
================

[PROJECT DISCONTINUED]

**A React Hook for simplifying basic usage of
[expo-location](https://docs.expo.dev/versions/latest/sdk/location/)**

This hook returns an object with two properties:

* a boolean state `reading`, that indicates whether it is waiting for the
  delivery of the user's current location;

* an asynchronous method `read`, that requests and returns the aforementioned
  location.

Before requesting, this method asks for permission to access the device, if
necessary, and throws an error if it is not granted.


Peer dependencies
-----------------

``` json
{
    "expo": "45.0.0",
    "expo-location": "14.2.2",
    "react": "17.0.2",
    "react-native": "0.68.2"
}
```


Install
-------

With npm:

```
npm install @hashiprobr/expo-use-locator
```

With yarn:

```
yarn add @hashiprobr/expo-use-locator
```

With expo:

```
expo install @hashiprobr/expo-use-locator
```


Example
-------

``` js
import React, { useState } from 'react';

import { View, Text, Button } from 'react-native';

import useLocator from '@hashiprobr/expo-use-locator';

export default function MyComponent() {
    const [coords, setCoords] = useState(null);

    const locator = useLocator();

    async function onPress() {
        let location;
        try {
            location = await locator.read();
        } catch (error) {
            console.error(error);
        }
        setCoords(location.coords);
    }

    return (
        <View
            style={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {locator.reading ? (
                <Text>reading...</Text>
            ) : (
                coords && (
                    <Text>{coords.latitude}, {coords.longitude}</Text>
                )
            )}
            <Button title="read" onPress={onPress} />
        </View>
    );
}
```
