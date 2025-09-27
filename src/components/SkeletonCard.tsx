import React from "react";
import styled, { keyframes } from "styled-components";

const SkeletonCard = () => {
  return (
    <Card>
      <ImageSkeleton />
      <Content>
        <TitleSkeleton />
        <LineSkeleton />
        <LineSkeleton />
        <ButtonSkeleton />
      </Content>
    </Card>
  );
};

export default SkeletonCard;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.border};
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.muted} 25%,
    ${({ theme }) => theme.border} 50%,
    ${({ theme }) => theme.muted} 75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const ImageSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 220px;
`;

const Content = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TitleSkeleton = styled(SkeletonBase)`
  height: 24px;
  border-radius: 4px;
  width: 80%;
`;

const LineSkeleton = styled(SkeletonBase)`
  height: 16px;
  border-radius: 4px;
  width: 100%;

  &:nth-child(3) {
    width: 90%;
  }

  &:nth-child(4) {
    width: 70%;
  }
`;

const ButtonSkeleton = styled(SkeletonBase)`
  height: 40px;
  border-radius: 8px;
  width: 100px;
  margin-top: auto;
`;
