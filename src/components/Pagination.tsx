import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | "...")[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <PaginationWrapper>
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
        whileHover={{ scale: disabled || currentPage === 1 ? 1 : 1.05 }}
        whileTap={{ scale: disabled || currentPage === 1 ? 1 : 0.95 }}
      >
        Anterior
      </PaginationButton>

      <PageNumbers>
        {visiblePages.map((page, index) =>
          page === "..." ? (
            <Dots key={`dots-${index}`}>...</Dots>
          ) : (
            <PageButton
              key={page}
              onClick={() => onPageChange(page)}
              disabled={disabled}
              $isActive={page === currentPage}
              whileHover={{ scale: disabled ? 1 : 1.1 }}
              whileTap={{ scale: disabled ? 1 : 0.9 }}
            >
              {page}
            </PageButton>
          )
        )}
      </PageNumbers>

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
        whileHover={{
          scale: disabled || currentPage === totalPages ? 1 : 1.05,
        }}
        whileTap={{ scale: disabled || currentPage === totalPages ? 1 : 0.95 }}
      >
        Próxima
      </PaginationButton>
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 3rem 0 2rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.25rem;
    margin: 2rem 0 1rem 0;
  }
`;

const PaginationButton = styled(motion.button)`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primary};
    color: #ffffff;
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.primary}30;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
  }
`;

const PageNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: 480px) {
    gap: 0.125rem;
  }
`;

const PageButton = styled(motion.button)<{ $isActive: boolean }>`
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.primary : theme.card};
  color: ${({ $isActive, theme }) => ($isActive ? "#FFFFFF" : theme.text)};
  border: 2px solid
    ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.border)};
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ $isActive, theme }) => theme.primary};
    color: #ffffff;
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.primary}30;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    min-width: 40px;
    height: 40px;
    font-size: 0.9rem;
    padding: 0.6rem;
  }

  @media (max-width: 480px) {
    min-width: 36px;
    height: 36px;
    font-size: 0.85rem;
    padding: 0.5rem;
  }
`;

const Dots = styled.span`
  color: ${({ theme }) => theme.text};
  opacity: 0.5;
  padding: 0 0.5rem;
  font-weight: 600;

  @media (max-width: 480px) {
    padding: 0 0.25rem;
    font-size: 0.9rem;
  }
`;
