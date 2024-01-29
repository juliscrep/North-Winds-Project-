import React from "react";
import styles from "../Styles/map.module.css";

const Map = () => {
  return (
    <div className={styles.mapouter}>
      <div className={styles.gmap_canvas}>
        <iframe
          id="gmap_canvas"
          width="100%"
          height="100%"
          src="https://maps.google.com/maps?q=RN60+1211%2C+aimogasta%2C+la+rioja&t=&z=15&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        ></iframe>
        {/* <a href="https://online-timer.me/"></a>
        <br />
        <a href="https://online.stopwatch-timer.net/"></a>
        <br />
        <a href="https://www.embedmaps.co">location map</a> */}
      </div>
    </div>
  );
};

export default Map;

