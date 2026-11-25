import { useEffect, useMemo, useState, type FormEvent } from 'react';
import type { CourseItem } from '../../types/course';
import { CardList } from '../../components/CardList/CardList';
import { Modal } from '../../components/Modal/Modal';
import styles from './CoursesPage.module.css';

const ALL_CATEGORIES = 'Все';

interface CourseFormState {
  title: string;
  category: string;
  duration: string;
  description: string;
  outcome: string;
}

const EMPTY_FORM: CourseFormState = {
  title: '',
  category: 'Сценарии и съемка',
  duration: '2 недели',
  description: '',
  outcome: '',
};

export function CoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<CourseFormState>(EMPTY_FORM);
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

  function handleToggleSelect(id: number) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  }

  function handleDeleteCourse(id: number) {
    setCourses((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    if (selectedCourse?.id === id) {
      setSelectedCourse(null);
    }
  }

  function handleOpenAddModal() {
    setEditingCourse(null);
    setFormData(EMPTY_FORM);
    setIsAddModalOpen(true);
  }

  function handleOpenEditModal(course: CourseItem) {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      category: course.category,
      duration: course.duration,
      description: course.description,
      outcome: course.outcome,
    });
  }

  function handleCloseFormModal() {
    setIsAddModalOpen(false);
    setEditingCourse(null);
    setFormData(EMPTY_FORM);
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmedTitle = formData.title.trim();
    const trimmedCategory = formData.category.trim();
    const trimmedDuration = formData.duration.trim();
    const trimmedDescription = formData.description.trim();
    const trimmedOutcome = formData.outcome.trim();

    if (!trimmedTitle || !trimmedCategory || !trimmedDuration) {
      return;
    }

    if (editingCourse) {
      const updatedItem: CourseItem = {
        ...editingCourse,
        title: trimmedTitle,
        category: trimmedCategory,
        duration: trimmedDuration,
        description: trimmedDescription || 'Описание программы дополняется.',
        outcome: trimmedOutcome || 'Практический результат по итогам модуля.',
      };

      setCourses((prev) =>
        prev.map((item) => (item.id === editingCourse.id ? updatedItem : item))
      );

      if (selectedCourse?.id === editingCourse.id) {
        setSelectedCourse(updatedItem);
      }
    } else {
      const nextId =
        courses.length > 0 ? Math.max(...courses.map((item) => item.id)) + 1 : 1;

      const newCourse: CourseItem = {
        id: nextId,
        title: trimmedTitle,
        category: trimmedCategory,
        duration: trimmedDuration,
        description: trimmedDescription || 'Описание программы дополняется.',
        outcome: trimmedOutcome || 'Практический результат по итогам модуля.',
      };

      setCourses((prev) => [...prev, newCourse]);
    }

    handleCloseFormModal();
  }

  const isFormModalOpen = isAddModalOpen || editingCourse !== null;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Программы обучения UGC-креаторов</h1>
          <p className={styles.subtitle}>
            Выберите направление в академии UGC Lab — от сценариев и съёмки до монтажа и питчинга брендам.
          </p>
        </div>

        {!isLoading && !error && (
          <button
            type="button"
            className={styles.addBtn}
            onClick={handleOpenAddModal}
            title="Добавить новую программу обучения"
          >
            + Добавить программу
          </button>
        )}
      </header>

      {!isLoading && !error && (
        <div className={styles.toolbar}>
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

          {selectedIds.length > 0 && (
            <div className={styles.selectionBar}>
              <span>
                Выбрано программ: <strong>{selectedIds.length}</strong>
              </span>
              <button
                type="button"
                className={styles.clearSelectionBtn}
                onClick={() => setSelectedIds([])}
              >
                Снять выделение
              </button>
            </div>
          )}
        </div>
      )}

      {isLoading && <p className={styles.status}>Загружаем программы обучения...</p>}
      {error && <p className={styles.error}>Ошибка: {error}</p>}

      {!isLoading && !error && (
        <CardList
          courses={filteredCourses}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onSelectCourse={(course) => setSelectedCourse(course)}
          onEditCourse={handleOpenEditModal}
          onDeleteCourse={handleDeleteCourse}
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

      <Modal
        isOpen={isFormModalOpen}
        title={editingCourse ? 'Редактировать программу' : 'Новая программа обучения'}
        onClose={handleCloseFormModal}
      >
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <label className={styles.field}>
            <span>Название программы *</span>
            <input
              type="text"
              className={styles.input}
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Например, Съёмка обзоров на iPhone"
              required
            />
          </label>

          <label className={styles.field}>
            <span>Направление *</span>
            <input
              type="text"
              className={styles.input}
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="Сценарии и съемка"
              required
            />
          </label>

          <label className={styles.field}>
            <span>Длительность *</span>
            <input
              type="text"
              className={styles.input}
              value={formData.duration}
              onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
              placeholder="2 недели"
              required
            />
          </label>

          <label className={styles.field}>
            <span>Описание</span>
            <textarea
              rows={3}
              className={styles.textarea}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Кратко опиши, чему научатся студенты"
            />
          </label>

          <label className={styles.field}>
            <span>Результат обучения</span>
            <textarea
              rows={2}
              className={styles.textarea}
              value={formData.outcome}
              onChange={(e) => setFormData((prev) => ({ ...prev, outcome: e.target.value }))}
              placeholder="Какой кейс или навык останется в портфолио"
            />
          </label>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleCloseFormModal}
            >
              Отмена
            </button>
            <button type="submit" className={styles.submitBtn}>
              {editingCourse ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}