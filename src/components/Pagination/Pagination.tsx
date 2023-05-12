import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const pagesLength = Math.ceil(total / perPage);
  const pages = Array.from({ length: pagesLength }, (_, index) => index + 1);
  const items = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <>
      <ul className="pagination">
        <li className={
          classNames(
            'page-item',
            { disabled: currentPage === 1 },
          )
        }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={() => {
              if (currentPage === 1) {
                return;
              }

              onPageChange(currentPage - 1);
            }}
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {
          pages.map((page) => (
            <li
              className={
                classNames(
                  'page-item',
                  { active: currentPage === page },
                )
              }
              key={page}
            >

              <a
                onClick={(event) => (
                  onPageChange(+event.currentTarget.innerHTML)
                )}
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
              >
                {page}
              </a>
            </li>
          ))
        }
        <li className={
          classNames(
            'page-item',
            { disabled: currentPage === pagesLength },
          )
        }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesLength}
            onClick={() => {
              if (currentPage === pagesLength) {
                return;
              }

              onPageChange(currentPage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map((item) => {
          const lastItem = perPage * currentPage;
          const firstItem = lastItem - perPage;

          if (item > firstItem && item <= lastItem) {
            return (
              <li
                data-cy="item"
                key={item}
              >
                {`Item ${item}`}
              </li>
            );
          }

          return '';
        })}
      </ul>
    </>
  );
};
