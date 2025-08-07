import styles from "../../Styles/contact.module.css";
import Map from "../../components/map";
import Form from "../../components/form";
import { contactInfo } from "./contact.content";

function ContactPage() {

  const iconTextItems = [
  {
    icon: contactInfo.address.icon,
    text: contactInfo.address.text,
    textClass: styles[contactInfo.address.textClass],
  },
  {
    icon: contactInfo.hours.icon,
    text: contactInfo.hours.text,
    textClass: styles[contactInfo.hours.textClass],
  },
  {
    icon: contactInfo.phones.icon,
    text: contactInfo.phones.primary,
    textClass: styles[contactInfo.phones.textClass],
    extra: contactInfo.phones.secondary,
  },
  {
    icon: contactInfo.email.icon,
    text: contactInfo.email.text,
    textClass: styles[contactInfo.email.textClass],
  },
  {
    icon: contactInfo.instagram.icon,
    text: contactInfo.instagram.text,
    textClass: styles[contactInfo.instagram.textClass],
  },
];

  return (
    <>
      <div className={styles.twoColumnsContainer}>
        <div className={styles.textColumn}>
          <h2 className={styles.title}>{contactInfo.title}</h2>

          {iconTextItems.map((item, index) => (
            <div key={index} className={styles.contactSection}>
              <i className={`${item.icon.includes('instagram') ? 'fab' : 'fa'} ${item.icon} ${styles.icon}`}></i>
              <span className={item.textClass}>{item.text}</span>

              {item.extra && (
                <div className={styles.contactSection2}>
                  {item.extra.map((subText, subIndex) => (
                    <span key={subIndex} className={styles.iconBoxTitle5}>
                      {subText}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <Form />
      </div>

      <Map />
    </>
  );
}

export default ContactPage;
