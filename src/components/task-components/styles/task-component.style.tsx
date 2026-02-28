import styled from "styled-components";

export const TaskRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 200px;
  margin-bottom: 10px;
`;

export const TaskTitleContainer = styled.div`
  color: black;
  padding: 5px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TaskCheckbox = styled.input`
  margin-right: 12px;
  cursor: pointer;
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 30%;
  border: 2px solid #ccc;
  appearance: none;
  outline: none;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &::after {
    content: "";
    width: 9px;
    height: 5px;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: translateY(-1px) rotate(-45deg);
    opacity: 0;
    transition: opacity 0.7s ease;
  }

  &:checked {
    background-color:rgb(182, 183, 182);
    border-color: rgb(182, 183, 182);
  }

  &:checked::after {
    opacity: 1;
  }

  &:hover {
    background-color: rgb(190, 193, 190);
  }
`;

export const TaskTitleLabel = styled.label<{ $checked?: boolean }>`
  text-decoration: ${(props) => (props.$checked ? "line-through" : "none")};
  color: ${(props) => (props.$checked ? "rgb(182, 183, 182)" : "black")};
`;

export const MenuWrapper = styled.div<{ $isHovered: boolean }>`
  opacity: ${(props) => (props.$isHovered ? 1 : 0)};
`;

export const TaskMetaRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TaskDateText = styled.div<{ $isOverdue?: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.$isOverdue ? "red" : "black")};
`;

export const RepeatIcon = styled.img`
  width: 15px;
  height: 15px;
`;

export const TaskSeparator = styled.hr`
  opacity: 0.3;
`;