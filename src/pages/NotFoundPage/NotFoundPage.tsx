import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <section className={styles.notFound}>
      <p className={styles.code}>404</p>
      <h1>Страница не найдена</h1>
      <p>Похоже, такого раздела в UGC Lab нет или ссылка устарела.</p>
      <Link to="/" className={styles.backLink}>
        Вернуться на главную
      </Link>
    </section>
  );
}