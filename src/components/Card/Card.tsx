import type { CourseItem } from '../../types/course';
import styles from './Card.module.css';

interface CardProps {
  course: CourseItem;
  onSelect: (course: CourseItem) => void;
}

export function Card({ course, onSelect }: CardProps) {
  return (
    <article className={styles.card}>
      <div>
        <div className={styles.top}>
          <span className={styles.category}>{course.category}</span>
          <span className={styles.duration}>{course.duration}</span>
        </div>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.description}>{course.description}</p>
      </div>

      <button
        type="button"
        className={styles.button}
        onClick={() => onSelect(course)}
      >
        Подробнее
      </button>
    </article>
  );
}