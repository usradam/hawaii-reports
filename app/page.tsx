"use client";

import * as React from 'react';
import { Map, useControl } from '@vis.gl/react-maplibre';
import {MapboxOverlay} from '@deck.gl/mapbox';
import {DeckProps} from '@deck.gl/core';
import {ScatterplotLayer} from '@deck.gl/layers';
import 'maplibre-gl/dist/maplibre-gl.css';


function DeckGLOverlay(props: DeckProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

const storyPoints = [
  { name: "Diamond Head", lat: 21.2619, lon: -157.8056 },
  { name: "Waikiki Beach", lat: 21.2830, lon: -157.8394 },
  { name: "Pearl Harbor", lat: 21.3641, lon: -157.9490 },
  { name: "Haleakalā", lat: 20.7200, lon: -156.1552 }
];


export default function Home() {
  const layer = new ScatterplotLayer({
      id: 'TripsLayer',
      data: storyPoints,
      getPosition: (d) => [d.lon, d.lat],
      getFillColor: [255, 140, 0],
      getRadius: 5000,
      radiusMinPixels: 5,
      radiusMaxPixels: 30,
  });

  return (
    <Map
      initialViewState={{
        longitude: -157.36,
        latitude: 21.1023,
        zoom: 7
      }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      style={{ width: '100vw', height: '100vh' }}
    >
      <DeckGLOverlay layers={[layer]} />
    </Map>
  );
}