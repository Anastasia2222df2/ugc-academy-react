import type { CourseItem } from '../../types/course';
import { Card } from '../Card/Card';
import styles from './CardList.module.css';

interface CardListProps {
  courses: CourseItem[];
  onSelectCourse: (course: CourseItem) => void;
}

export function CardList({ courses, onSelectCourse }: CardListProps) {
  if (courses.length === 0) {
    return (
      <p className={styles.empty}>
        По выбранному направлению программ пока нет. Попробуй выбрать другую категорию.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {courses.map((course) => (
        <Card key={course.id} course={course} onSelect={onSelectCourse} />
      ))}
    </div>
  );
}