import styles from './BenefitsBlock.module.css';

export interface BenefitItem {
  id: number;
  title: string;
  description: string;
}

interface BenefitsBlockProps {
  heading: string;
  items: BenefitItem[];
}

export function BenefitsBlock({ heading, items }: BenefitsBlockProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.grid}>
        {items.map((item) => (
          <article key={item.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardText}>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}