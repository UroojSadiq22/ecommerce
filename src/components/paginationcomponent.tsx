import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis 
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Mobile view
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Pagination>
      <PaginationContent className="border-t py-4 flex justify-between gap-2 w-full">
        {/* Previous Button */}
        <PaginationItem className="border-2 rounded-xl">
          <PaginationPrevious
            href={currentPage > 1 ? "#" : undefined}
            className={
              currentPage === 1 ? "opacity-50 pointer-events-none" : ""
            }
            onClick={(e) => {
              e.preventDefault();
              handlePrevious();
            }}
          />
        </PaginationItem>

        <div className="flex gap-2">
          {isSmallScreen ? (
            // Mobile view: Show current page + ellipsis if more pages exist
            <>
              <PaginationItem>
                <PaginationLink isActive>{currentPage}</PaginationLink>
              </PaginationItem>
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          ) : (
            // Desktop view: Show all page numbers
            [...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
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
            })
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
  );
}
