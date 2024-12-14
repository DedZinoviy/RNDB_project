import React from 'react';
import './pagination.css';

/**  
 * Свойства компонента пагинации.
*/
interface PaginationProps {
  /** Номер текущей страницы. */
  currentPage: number;
  /** Общее количество страниц. */
  totalPages: number;
  /** Обработчик смены страницы. */
  onPageChange: (page: number) => void;
  /** Максимальное количество отображаемых страниц */
  maxVisiblePages?: number;
}

/**
 * Компонент пагинации.
 * @param currentPage Текущая страница пагинации.
 * @param totalPages Общее количество страниц.
 * @param onPageChange коллбэк-функция-обработчик смены страницы.
 * @param maxVisiblePages максимальное количество отображаемых страниц; по умолчанию 5.
 * @returns компонент отображения пагинации.
 */
const PaginationWidget: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5, // По умолчанию показываем до 5 страниц
}) => {
  // Функции для переключения на страницы
  /** Перейти к первой странице. */
  const goToFirstPage = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };
  
  /** Перейти к предыдущей странице. */
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  /** Перейти к следующей странице. */
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  /** Перейти к последней странице. */
  const goToLastPage = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  // Вычисление диапазона видимых страниц
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);

  // Если в начале списка осталось мало страниц, сдвигаем диапазон вправо
  if (currentPage - startPage < halfVisible) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Если в конце списка осталось мало страниц, сдвигаем диапазон влево
  if (endPage - currentPage < halfVisible) {
    endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  }

  // Генерация массива с номерами страниц
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="pagination-widget">
      {/* Кнопки навигации */}
      <button onClick={goToFirstPage} disabled={currentPage === 1}>
        Первая
      </button>
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        Назад
      </button>

      {/* Кнопка с многоточием */}
      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          {startPage > 2 && <span>...</span>}
        </>
      )}

      {/* Номера страниц */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}

      {/* Кнопка с многоточием */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span>...</span>}
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      {/* Кнопки навигации */}
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        Вперед
      </button>
      <button onClick={goToLastPage} disabled={currentPage === totalPages}>
        Последняя
      </button>
    </div>
  );
};

export default PaginationWidget;
