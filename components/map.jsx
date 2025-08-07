import React from 'react';
import styles from '../Styles/map.module.css';
import { mapData } from './constants/map.content';

const Map = () => {
  return (
    <div className={styles.mapouter}>
      <div className={styles.gmap_canvas}>
        <iframe
          id="gmap_canvas"
          src={mapData.src}
          title={mapData.title}
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
