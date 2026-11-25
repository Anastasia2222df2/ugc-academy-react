import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  agencyName: string;
}

export function Header({ agencyName }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <span>{agencyName}</span>
        <span className={styles.badge}>Academy</span>
      </Link>

      <nav className={styles.nav} aria-label="Основная навигация">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
          }
        >
          Главная
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
          }
        >
          Обучение
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
          }
        >
          Об агентстве
        </NavLink>
      </nav>
    </header>
  );
}