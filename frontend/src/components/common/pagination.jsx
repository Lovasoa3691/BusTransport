import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-end mt-4">
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-2 px-2 py-2 rounded-lg border disabled:opacity-50"
        >
          <ChevronLeft size={16} />
          {/* Précédent */}
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center gap-2 px-2 py-2 rounded-lg border disabled:opacity-50"
        >
          {/* Suivant */}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
