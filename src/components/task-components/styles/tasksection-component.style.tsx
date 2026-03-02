import styled from "styled-components";
type TitleVariant = "default" | "overdue" | "subtitle";

export const SectionWrapper = styled.div`
  margin-top: 40px;
`;

export const Header = styled.div<{ variant: TitleVariant }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150%;
  margin-bottom: ${({ variant }) =>
    variant === "subtitle" ? 40 : variant === "overdue" ? 5 : 30}px;
  column-gap: ${({ variant }) => (variant === "subtitle" ? 12 : 0)}px;
`;

export const Title = styled.div<{ variant: TitleVariant }>`
  font-weight: 600;
  text-align: left;
  font-size: ${({ variant }) =>
    variant === "overdue" ? 18 : variant === "subtitle" ? 18 : 24}px;
`;