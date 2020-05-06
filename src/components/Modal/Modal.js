import React from 'react';
import {createPortal} from 'react-dom';
import {useHistory} from 'react-router-dom';
import {Wrapper, Content, CloseIcon} from './Modal.css';

function Modal ({children}) {
    const history = useHistory();
    const handleClose = e => {
        e.stopPropagation()
        history.goBack()
    }
return createPortal(
    <Wrapper onClick={handleClose}>
        <Content onClick={e=>e.stopPropagation()}>
            {children}
            <CloseIcon onClick={history.goBack}>&times</CloseIcon>
        </Content>
    </Wrapper>,
    document.querySelector('#modal')
)
};

export default Modal;