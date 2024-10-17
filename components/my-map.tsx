import React from "react";
import {Map, MapProps} from '@vis.gl/react-google-maps';

interface MyMapProps extends MapProps {

}

export const MyMap: React.FC<MyMapProps> = (props) => {
    return <Map
            style={{width: '100vw', height: '100vh'}}
            defaultCenter={{lat: 27.672932021393862, lng: 85.31184012689732}}
            defaultZoom={3}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            {...props}
        />
}