import React, { useCallback, useEffect } from "react";
import "./indexModal.css";
import cn from 'classnames';

export const Modal = ({setModalActive, modalActive, children}) => {

    const closeOnEsc = useCallback((e) => {
        if (e.key === 'Escape') {
            document.removeEventListener('keydown', closeOnEsc)
            setModalActive(false)
        }
    }, [setModalActive])

    useEffect(() => {
        document.addEventListener('keydown', closeOnEsc);

        // return () => document.removeEventListener('keydown', closeOnEsc);
    }, [closeOnEsc])

    return (
    <div tabIndex={1} id='modal' className={cn("modal", {"active": modalActive})}>
        <div className={cn("modal__content",{"active": modalActive})}>
            <span className="modal__close" onClick={() => setModalActive(false)}>X</span>
            {children}
        </div>
    </div>
    )
}