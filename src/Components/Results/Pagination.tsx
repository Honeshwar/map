import clsx from "clsx";

interface Props {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  totalResults: number;
}
export default function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
  totalResults,
}: Props) {
  // const navigationNo = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   navigationNo.push(i);
  // }

  // let totalPages=100, totalResults =57
  // const [currentPage, setCurrentPage] = useState(1);
  const navigationNo = [];
  if (totalPages < 9) {
    for (let i = 1; i <= totalPages; i++) {
      navigationNo.push(i);
    }
  } else {
    navigationNo.push(...generatePaginationNumbers(currentPage, totalPages));
  }

  function generatePaginationNumbers(currentPage: number, totalPages: number) {
    const maxPagesToShow = 9;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      // Less than or equal to max pages to show so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // More than max pages to show so calculate start and end pages
      const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        // Current page near the start
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // Current page near the end
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        // Current page in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  return (
    <div className="flex items-center justify-between border-t-0 border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* mobile */}
      <div className="flex flex-1 justify-between sm:hidden">
        {currentPage === 1 ? (
          <a className="relative inline-flex items-center rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 ">
            Previous
          </a>
        ) : (
          <a
            onClick={() => handlePageChange(currentPage - 1)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 "
          >
            Previous
          </a>
        )}
        {currentPage === totalPages ? (
          <a className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 ">
            Next
          </a>
        ) : (
          <a
            onClick={() => handlePageChange(currentPage + 1)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 "
          >
            Next
          </a>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium"> {currentPage} </span>
            to
            <span className="font-medium"> {totalPages} </span>
            of
            <span className="font-medium"> {totalResults} </span>
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              onClick={() => handlePageChange(currentPage - 1)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                // fill="currentColor"
                aria-hidden="true"
              >
                <path
                  // fill-rule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  // clip-rule="evenodd"
                />
              </svg>
            </a>
            {/* <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" --> */}
            {navigationNo.map((no: number, index: number) => (
              <a
                key={"page-" + (index + 1)}
                onClick={() => handlePageChange(no)}
                aria-current="page"
                className={clsx(
                  "relative inline-flex items-center  px-4 py-2 text-sm font-semibold  focus:z-20 ",
                  {
                    "z-10 bg-[#fcb715] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fcb715]":
                      no === currentPage,
                    "text-gray-900  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 md:inline-flex":
                      no !== currentPage,
                  }
                )}
              >
                {no}
              </a>
            ))}

            {/* <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span> */}

            <a
              onClick={() => handlePageChange(currentPage + 1)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                // fill="currentColor"
                aria-hidden="true"
              >
                <path
                  // fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  // clip-rule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
