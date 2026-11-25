export type CourseCategory = 'Сценарии и съемка' | 'Монтаж' | 'Продвижение';

export interface CourseItem {
  id: number;
  title: string;
  category: CourseCategory | string;
  duration: string;
  description: string;
  outcome: string;
}