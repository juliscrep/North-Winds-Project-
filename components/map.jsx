// Mapa.jsx
import React from "react";
import styles from "../Styles/map.module.css";

const Mapa = () => {
  return (
    <div className={styles.mapouter}>
      <div className={styles.gmap_canvas}>
        <iframe
          width="820"
          height="560"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=20+de+mayo%2CAimogasta%2CLa+Rioja&t=&z=15&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        ></iframe>
        <a href="https://online-timer.me/"></a>
        <br />
        <a href="https://online.stopwatch-timer.net/"></a>
        <br />
        <a href="https://www.embedmaps.co">location map</a>
      </div>
    </div>
  );
};

export default Mapa;
