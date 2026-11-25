import styles from './AgencyInfoBlock.module.css';

interface AgencyInfoBlockProps {
  title: string;
  lead: string;
  forBrands: string[];
  forCreators: string[];
}

export function AgencyInfoBlock({
  title,
  lead,
  forBrands,
  forCreators,
}: AgencyInfoBlockProps) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.leadBox}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lead}>{lead}</p>
      </div>

      <div className={styles.columns}>
        <article className={styles.panel}>
          <h2 className={styles.panelTitle}>Для брендов и заказчиков</h2>
          <ul className={styles.list}>
            {forBrands.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>

        <article className={styles.panel}>
          <h2 className={styles.panelTitle}>Для начинающих креаторов</h2>
          <ul className={styles.list}>
            {forCreators.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}