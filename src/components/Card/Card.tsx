import type { CourseItem } from '../../types/course';
import styles from './Card.module.css';

interface CardProps {
  course: CourseItem;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onSelect: (course: CourseItem) => void;
  onEdit: (course: CourseItem) => void;
  onDelete: (id: number) => void;
}

export function Card({
  course,
  isSelected,
  onToggleSelect,
  onSelect,
  onEdit,
  onDelete,
}: CardProps) {
  return (
    <article
      className={isSelected ? `${styles.card} ${styles.selectedCard}` : styles.card}
    >
      <div>
        <div className={styles.top}>
          <span className={styles.category}>{course.category}</span>
          <span className={styles.duration}>{course.duration}</span>
        </div>

        <label className={styles.selectLabel} title="Отметить программу для сравнения или удаления">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(course.id)}
          />
          <span>{isSelected ? 'Выбрано' : 'Выбрать'}</span>
        </label>

        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.description}>{course.description}</p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() => onSelect(course)}
          title="Открыть подробную информацию"
        >
          Подробнее
        </button>

        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={() => onEdit(course)}
          title="Редактировать программу"
        >
          Изменить
        </button>

        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => onDelete(course.id)}
          title="Удалить программу"
        >
          Удалить
        </button>
      </div>
    </article>
  );
}