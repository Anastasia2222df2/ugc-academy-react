import type { CourseItem } from '../../types/course';
import { Card } from '../Card/Card';
import styles from './CardList.module.css';

interface CardListProps {
  courses: CourseItem[];
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
  onSelectCourse: (course: CourseItem) => void;
  onEditCourse: (course: CourseItem) => void;
  onDeleteCourse: (id: number) => void;
}

export function CardList({
  courses,
  selectedIds,
  onToggleSelect,
  onSelectCourse,
  onEditCourse,
  onDeleteCourse,
}: CardListProps) {
  if (courses.length === 0) {
    return (
      <p className={styles.empty}>
        По выбранному направлению программ пока нет. Попробуй выбрать другую категорию или добавить курс.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {courses.map((course) => (
        <Card
          key={course.id}
          course={course}
          isSelected={selectedIds.includes(course.id)}
          onToggleSelect={onToggleSelect}
          onSelect={onSelectCourse}
          onEdit={onEditCourse}
          onDelete={onDeleteCourse}
        />
      ))}
    </div>
  );
}