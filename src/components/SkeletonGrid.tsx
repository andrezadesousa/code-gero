import type React from "react";
import styled from "styled-components";
import SkeletonCard from "./SkeletonCard";

interface SkeletonGridProps {
  count?: number;
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({ count = 10 }) => {
  return (
    <Container className="container">
      <Title>Carregando personagens...</Title>
      <Grid>
        {Array.from({ length: count }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </Grid>
    </Container>
  );
};

export default SkeletonGrid;

const Container = styled.section`
  margin-top: 2rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  margin: 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
