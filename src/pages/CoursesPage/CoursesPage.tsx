import { useEffect, useMemo, useState } from 'react';
import type { CourseItem } from '../../types/course';
import { CardList } from '../../components/CardList/CardList';
import { Modal } from '../../components/Modal/Modal';
import styles from './CoursesPage.module.css';

const ALL_CATEGORIES = 'Все';

export function CoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadCourses() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.status}`);
        }
        const data: CourseItem[] = await response.json();
        if (!isCancelled) {
          setCourses(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Не удалось загрузить курсы');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadCourses();

    return () => {
      isCancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((item) => item.category)));
    return [ALL_CATEGORIES, ...unique];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (selectedCategory === ALL_CATEGORIES) {
      return courses;
    }
    return courses.filter((item) => item.category === selectedCategory);
  }, [courses, selectedCategory]);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Программы обучения UGC-креаторов</h1>
        <p className={styles.subtitle}>
          Выберите направление в академии UGC Lab — от сценариев и съёмки до монтажа и питчинга брендам.
        </p>
      </header>

      {!isLoading && !error && (
        <div className={styles.filters} role="group" aria-label="Фильтр по направлениям">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category
                  ? `${styles.filterBtn} ${styles.activeFilter}`
                  : styles.filterBtn
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {isLoading && <p className={styles.status}>Загружаем программы обучения...</p>}
      {error && <p className={styles.error}>Ошибка: {error}</p>}

      {!isLoading && !error && (
        <CardList
          courses={filteredCourses}
          onSelectCourse={(course) => setSelectedCourse(course)}
        />
      )}

      <Modal
        isOpen={selectedCourse !== null}
        title={selectedCourse?.title ?? ''}
        onClose={() => setSelectedCourse(null)}
      >
        {selectedCourse && (
          <>
            <p className={styles.modalMeta}>
              Направление: <strong>{selectedCourse.category}</strong> · Длительность:{' '}
              <strong>{selectedCourse.duration}</strong>
            </p>
            <p className={styles.modalText}>{selectedCourse.description}</p>
            <div className={styles.modalOutcome}>
              <strong>Результат обучения:</strong> {selectedCourse.outcome}
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}