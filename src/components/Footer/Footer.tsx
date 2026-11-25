import styles from './Footer.module.css';

interface FooterProps {
  agencyName: string;
  version?: string;
}

export function Footer({ agencyName, version = 'v1.0' }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div>
        <span className={styles.agency}>{agencyName}</span> — агентство пользовательского контента и школа креаторов
      </div>
      <div>Версия: {version}</div>
    </footer>
  );
}