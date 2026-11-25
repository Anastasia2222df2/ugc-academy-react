import { HeroBlock } from '../../blocks/HeroBlock/HeroBlock';
import { BenefitsBlock, type BenefitItem } from '../../blocks/BenefitsBlock/BenefitsBlock';
import styles from './HomePage.module.css';

const AGENCY_NAME = 'UGC Lab';
const MAIN_TITLE = 'Создавай живой UGC-контент, который покупают бренды';

const HOME_BENEFITS: BenefitItem[] = [
  {
    id: 1,
    title: 'Практика на реальных брифах',
    description:
      'Разбираем задачи брендов: распаковки, нативные обзоры, сценарии и ролики для Reels, TikTok и Shorts.',
  },
  {
    id: 2,
    title: 'Съемка и монтаж без сложной студии',
    description:
      'Показываем, как работать со светом, ракурсами и быстрым монтажом прямо на смартфоне.',
  },
  {
    id: 3,
    title: 'Путь в пул креаторов агентства',
    description:
      'Помогаем собрать портфолио и подключаем лучших выпускников к реальным заказам от брендов.',
  },
];

export function HomePage() {
  return (
    <div className={styles.page}>
      <HeroBlock
        eyebrow={`${AGENCY_NAME} · Agency & Creator Academy`}
        title={MAIN_TITLE}
        subtitle="Обучаем сценариям, съемке и монтажу пользовательского контента с нуля и соединяем креаторов с коммерческими проектами."
      />

      <BenefitsBlock
        heading="Почему выбирают UGC Lab"
        items={HOME_BENEFITS}
      />
    </div>
  );
}