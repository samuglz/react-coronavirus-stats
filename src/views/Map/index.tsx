import React, { FC } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAppContext } from '../../components/Store';
import { observer } from 'mobx-react-lite';
export const Mapa: FC = observer(() => {
   const center = [51.505, -0.09];
   const { appStore } = useAppContext();
   return (
      <Map className="w-screen h-screen" center={center} zoom={3}>
         <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
         />

         {appStore.globalCountries.length !== 0 &&
            appStore.globalCountries.map((country, index) => {
               const position = [country.lat, country.long];
               return (
                  // TODO: CAMBIAR MARKER POR CIRCLE-MARKER
                  // TODO: LIMITAR EL ZOOM-OUT DEL MAPA
                  // TODO: CAMBIAR LAYER DEL MAPA
                  <Marker key={index} position={position}>
                     <Popup>
                        {country.combinedKey}
                        <br />
                        {country.provinceState}
                     </Popup>
                  </Marker>
               );
            })}
      </Map>
   );
});
