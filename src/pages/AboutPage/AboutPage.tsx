import { AgencyInfoBlock } from '../../blocks/AgencyInfoBlock/AgencyInfoBlock';
import styles from './AboutPage.module.css';

const FOR_BRANDS = [
  'UGC-ролики под ТЗ и гипотезы для платного трафика и соцсетей',
  'Отбор креаторов под нишу: бьюти, лайфстайл, приложения, e-commerce',
  'Контроль сроков, сценариев и прав использования контента',
];

const FOR_CREATORS = [
  'Пошаговые курсы по хукам, съемке, монтажу и работе с брифом',
  'Разбор ошибок и сборка сильного портфолио под ключ',
  'Доступ к заказам от партнёров после успешной практики',
];

export function AboutPage() {
  return (
    <div className={styles.page}>
      <AgencyInfoBlock
        title="Об агентстве и академии UGC Lab"
        lead="Мы объединяем продакшн пользовательского контента и обучение креаторов: бренды получают живые видео с высокой вовлечённостью, а авторы — понятный старт в профессии."
        forBrands={FOR_BRANDS}
        forCreators={FOR_CREATORS}
      />
    </div>
  );
}