import React, { useRef, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import './Map.css';

const MapComponent = ({ center, zoom, markers }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "weight": "2.00"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#9c9c9c"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                "color": "#f2f2f2"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 45
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#7b7b7b"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              {
                "color": "#46bcec"
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#c8d7d4"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#070707"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          }
        ]
      });

      // Add markers
      markers.forEach(marker => {
        new window.google.maps.Marker({
          position: marker.position,
          map: map,
          title: marker.title,
          icon: marker.icon
        });
      });
    }
  }, [center, zoom, markers]);

  return <div ref={ref} className="map-container" />;
};

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <div className="map-loading">Xarita yuklanmoqda...</div>;
    case Status.FAILURE:
      return <div className="map-error">Xaritani yuklashda xatolik yuz berdi</div>;
    case Status.SUCCESS:
      return <MapComponent />;
  }
};

export default function Map({ center, zoom = 10, markers = [] }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <MapComponent center={center} zoom={zoom} markers={markers} />
    </Wrapper>
  );
}