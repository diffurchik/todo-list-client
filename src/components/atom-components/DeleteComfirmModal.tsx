import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { ButtonComponent } from "./ButtonComponent";
import { IconButton } from "./IconButton";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    text: string
};

export const DeleteComfirmModal = ({ isOpen, onClose, onDelete, text }: Props) => {
    const modalRoot = document.getElementById("modal-root");

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen || !modalRoot) return null;

    return ReactDOM.createPortal(
        <div style={overlayStyle} onClick={onClose} id="modal-container">
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={closeButtonStyle}>
            <IconButton icon="close.svg" width={30} height={30} onClick={onClose}/>
                </div>
                <div style={modalContentStyle}>{text}</div>
                <div style={buttonsContainerStyle}>
                    <ButtonComponent onClick={onClose} title="Cancel" />
                    <ButtonComponent
                        onClick={onDelete}
                        size="small"
                        title="Delete task"
                        variant="danger-filled"
                        hasIcon={false}
                    />
                </div>
            </div>
        </div>,
        modalRoot
    );
};

const overlayStyle: React.CSSProperties = { 
    position: "fixed", 
    top: 0, 
    left: 0, 
    width: "100vw", 
    height: "100vh", 
    background: "rgba(0,0,0,0.5)", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    zIndex: 1000, 
};

const modalStyle: React.CSSProperties = {
    position: "relative",
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "300px",
    width: "400px",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // текст сверху центрируется, кнопки вниз
};

const modalContentStyle: React.CSSProperties = {
    textAlign: "center", // по горизонтали центрируем текст
    flex: 1,
    display: "flex",
    alignItems: "center", // вертикальное центрирование текста
    justifyContent: "center",
};

const buttonsContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
};

const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "12px",
    right: "12px",
    cursor: "pointer",
    opacity: 0.6
};