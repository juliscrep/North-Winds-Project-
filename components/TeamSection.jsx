import Image from "next/image";
import styles from "/Styles/about.module.css";

import {
  teamText,
  teamMembers,
  teamGroupImage,
} from "./constants/team.content";

const TeamSection = () => {
  return (
    <section className={styles.teamSection} aria-labelledby="team-heading">
      <div className={styles.container}>
        
        <h2 id="team-heading" className={styles.title2}>
          {teamText.title}
        </h2>

        <p className={styles.teamDescription}>
          {teamText.paragraph}
        </p>

        {/* FOTO GRUPAL */}
        <div className={styles.teamGroupWrapper}>
          <Image
            src={teamGroupImage}
            alt="Equipo North Winds"
            width={1400}
            height={600}
            className={styles.teamGroupImage}
            priority
          />
        </div>

        {/* GRID */}
        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <article key={member.name} className={styles.teamCard}>
              
              {/* 🔥 NUEVO WRAPPER */}
              <div className={styles.teamImageWrapper}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={500}
                  className={styles.teamImageInner}
                />
              </div>

              <div className={styles.teamInfo}>
                <h3 className={styles.teamName}>
                  {member.name}
                </h3>

                <p className={styles.teamRole}>
                  {member.role}
                </p>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;