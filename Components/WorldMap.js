import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const WorldMap = ({ coloredCountries }) => {
    return (
        <ComposableMap projectionConfig={{
            scale: 155,
            rotation: [-11, 0, 0],
        }}
            width={800}
            height={400} className='w-full h-auto'>
            <Geographies geography={'/topoJSON.json'}>
                {({ geographies }) => {
                    return geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={coloredCountries.includes(geo.properties.NAME) ? '#4285F4' : '#E9F5FE'}
                            stroke="#868686"
                        />
                    ))
                }
                }
            </Geographies>
        </ComposableMap>
    );
};

export default WorldMap;
