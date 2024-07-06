import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import classnames from "classnames";
import "./style.css";
import { DOTS, usePagination } from "./usePaginationHook";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <div className="grid grid-cols-3 ">
      <div className="relative">
        {currentPage === 1 ? null : (
          <button
            className={classnames(
              " text-[#344054] py-2 px-2 text-xs rounded-md flex items-center gap-1 border font-medium"
            )}
            disabled={currentPage === 1}
            onClick={onPrevious}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Previous
          </button>
        )}
      </div>
      <ul
        className={classnames("pagination-container", {
          [className]: className,
        })}
      >
        {paginationRange?.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          return (
            <li
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      </ul>
      <div className="flex justify-end">
        <button
          className={classnames(
            "text-[#344054] p-1 px-2  text-xs rounded-md flex items-center gap-1 border font-medium"
          )}
          disabled={currentPage === lastPage}
          onClick={onNext}
        >
          Next
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
