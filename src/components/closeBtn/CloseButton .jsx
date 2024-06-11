import React from 'react';
import close from "../../assets/close-icon.png";

const CloseButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                position: 'absolute',
                top: '5px',
                right: '5px',
            }} >
            <img
                src={close}
                alt="Close"
                style={{
                    width: '24px', height: '24px', margin: '12px',
                    filter: 'brightness(0) invert(1)'
                }}
            />
        </button>
    );
};

export default CloseButton;
