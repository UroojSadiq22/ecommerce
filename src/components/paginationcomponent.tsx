
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }

export default function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange,
  }: PaginationProps) {
    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
      };
    
      const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
      };
    
      const renderPageLinks = () => {
        const pages = [];
        const maxPagesToShow = 5;
        const startPage = Math.max(currentPage - 2, 1);
        const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
    
        for (let page = startPage; page <= endPage; page++) {
          pages.push(
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        }
    
        return pages;
      };
    
  return (
    <Pagination>
      <PaginationContent className="border-t py-4 flex justify-between w-full">
        {/* Previous Button */}
        <PaginationItem className="border-2 rounded-xl">
          <PaginationPrevious
            href={currentPage > 1 ? "#" : undefined}
            className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
            onClick={(e) => {
              e.preventDefault();
              handlePrevious();
            }}
          />
        </PaginationItem>

        {/* Page Links */}
        <div className="flex">
          {renderPageLinks()}

          {/* Ellipsis and Last Page */}
          {currentPage + 2 < totalPages && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(totalPages);
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
        </div>

        {/* Next Button */}
        <PaginationItem className="border-2 rounded-xl">
          <PaginationNext
            href={currentPage < totalPages ? "#" : undefined}
            className={
              currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
            }
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
//     <div className="flex justify-between items-center mt-4">
//     <button
//       onClick={handlePrevious}
//       disabled={currentPage === 1}
//       className={`px-4 py-2 border rounded ${
//         currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//       }`}
//     >
//       Previous
//     </button>

//     <div>
//       Page {currentPage} of {totalPages}
//     </div>

//     <button
//       onClick={handleNext}
//       disabled={currentPage === totalPages}
//       className={`px-4 py-2 border rounded ${
//         currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
//       }`}
//     >
//       Next
//     </button>
//   </div>
  );
}
