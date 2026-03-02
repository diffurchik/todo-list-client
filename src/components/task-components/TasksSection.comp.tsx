import { ReactNode } from "react";
import { Header, SectionWrapper, Title } from "./styles/tasksection-component.style";
type TitleVariant = "default" | "overdue" | "subtitle";

type Props = {
    title: string;
    variant?: TitleVariant;
    headerRight?: ReactNode;
    children?: ReactNode;
  };
  
  export const TasksSection: React.FC<Props> = ({
    title,
    variant = "default",
    headerRight,
    children,
  }) => (
    <SectionWrapper>
      <Header variant={variant}>
        <Title variant={variant}>{title}</Title>
        {headerRight && <div>{headerRight}</div>}
      </Header>
  
      {children}
    </SectionWrapper>
  );