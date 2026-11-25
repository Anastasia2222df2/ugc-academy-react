import styles from './Footer.module.css';

interface FooterProps {
  version?: string;
}

export function Footer({ version = 'v1.0' }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div>
        <span className={styles.agency}>UGC Lab</span> — агентство пользовательского контента и школа креаторов
      </div>
      <div>Версия: {version}</div>
    </footer>
  );
}