import React, { FC } from 'react';
import { Map, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { useAppContext } from '../../components/Store';
import { observer } from 'mobx-react-lite';
export const Mapa: FC = observer(() => {
   const center = [51.505, -0.09];

   const maxBounds = [
      [40.71, -74.22],
      [40.77, 74.12]
   ];

   const rangeRadius = {
      min: 3,
      max: 50
   };

   const { appStore } = useAppContext();

   return (
      <Map
         className="w-screen h-screen"
         center={center}
         zoom={3}
         minZoom={2}
         // maxBounds={maxBounds}
         //PENDIENTE EXPLICACION RAUL
      >
         <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
            // noWrap="true" //PENDIENTE EXPLICACION RAUL
         />
         {console.log(appStore.maxConfirmed)}
         {appStore.globalCountries.length !== 0 &&
            appStore.globalCountries.map((country, index) => {
               const position = [country.lat, country.long];
               return (
                  // TODO: FIX ZOOM-OUT
                  <CircleMarker
                     key={index}
                     center={position}
                     color={'red'}
                     stroke={false}
                     fillOpacity={0.6}
                     radius={10}
                     // Math.floor(
                     //    (country.confirmed / appStore.maxConfirmed) *
                     //       (rangeRadius.max - rangeRadius.min) +
                     //       rangeRadius.min
                     // )
                  >
                     <Tooltip className="bg-gray-700 text-white">
                        <div>
                           {country.countryRegion}
                           <hr />
                           Confirmed:{' '}
                           <span className="text-yellow-500 font-bold">
                              {country.confirmed}
                           </span>
                           <br />
                           Deaths:{' '}
                           <span className="text-red-500 font-bold">
                              {country.deaths}
                           </span>
                           <br />
                           Recovered:{' '}
                           <span className="text-green-500 font-bold">
                              {country.recovered}
                           </span>
                        </div>
                     </Tooltip>
                  </CircleMarker>
               );
            })}
      </Map>
   );
});

// const outer = [
//    [50.505, -29.09],
//    [52.505, 29.09],
//  ]
//  const inner = [
//    [49.505, -2.09],
//    [53.505, 2.09],
//  ]

//  type State = {
//    bounds: Array<[number, number]>,
//  }

//  export default class BoundsExample extends Component<{}, State> {
//    state = {
//      bounds: outer,
//    }

//    onClickInner = () => {
//      this.setState({ bounds: inner })
//    }

//    onClickOuter = () => {
//      this.setState({ bounds: outer })
//    }

//    render() {
//      return (
//        <Map bounds={this.state.bounds}>
//          <TileLayer
//            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//          />
//          <Rectangle
//            bounds={outer}
//            color={this.state.bounds === outer ? 'red' : 'white'}
//            onClick={this.onClickOuter}
//          />
//          <Rectangle
//            bounds={inner}
//            color={this.state.bounds === inner ? 'red' : 'white'}
//            onClick={this.onClickInner}
//          />
//        </Map>
//      )
//    }
//  }
