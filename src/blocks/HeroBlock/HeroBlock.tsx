import { Link } from 'react-router-dom';
import styles from './HeroBlock.module.css';

interface HeroBlockProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function HeroBlock({ eyebrow, title, subtitle }: HeroBlockProps) {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.actions}>
        <Link to="/courses" className={styles.primaryBtn}>
          Смотреть программы обучения
        </Link>
        <Link to="/about" className={styles.secondaryBtn}>
          О нашем UGC-агентстве
        </Link>
      </div>
    </section>
  );
}
