'use client';

import { createContext, useCallback, useEffect, useState } from 'react';

const intialValue = null;

export const ModalContext = createContext(intialValue);

const ModalProvider = ({ children }) => {
    const [Modal, setModal] = useState(intialValue);

    const CloseModal = useCallback(() => {
        setModal(intialValue);
    }, []);

    // close modal when esc key pressed
    useEffect(() => {
        const ESClistener = event => {
            event.code === 'Escape' && CloseModal();
        };

        if (!Modal) {
            window.removeEventListener('keydown', ESClistener);
            return;
        }

        window.addEventListener('keydown', ESClistener);

        return () => {
            window.removeEventListener('keydown', ESClistener);
        };
    }, [Modal, CloseModal]);

    return (
        <ModalContext.Provider value={{ setModal, CloseModal }}>
            {Modal ? (
                <div
                    onClick={({ target, currentTarget }) => {
                        target === currentTarget && CloseModal();
                    }}
                    className="fixed bg-black/20 h-screen w-screen top-0 left-0 flex items-center z-20 justify-center"
                >
                    {Modal}
                </div>
            ) : null}
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
