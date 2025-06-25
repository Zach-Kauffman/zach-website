import React from 'react';

import { BORDER_COLOR, MANILLA } from '../../theme';

interface FolderProps {
    label: string;
    children?: React.ReactElement;
    index: number;
    location: number;
    onClick: (index: number) => void;
    isSelected?: boolean;
}

export const Folder = ({
    label,
    children,
    index,
    location,
    onClick,
    isSelected = false,
}: FolderProps) => {
    const tab = () => (
        <div
            onClick={() => onClick(index)}
            style={{
                position: 'absolute',
                top: '-1.58rem',
                left: isSelected ? 25 : `${((location % 5) * 50 + 10) * 2.5}px`,
                display: 'flex',
                alignItems: 'center',
                zIndex: location + 1,
                cursor: isSelected ? undefined : 'pointer',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    left: '-9px',
                    width: '10px',
                    height: '29.33px',
                    backgroundColor: BORDER_COLOR,
                    transform: 'skewX(-20deg)',
                    borderTopLeftRadius: '4px',
                    zIndex: 2,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    left: '-7px',
                    bottom: '0px',
                    width: '20px',
                    height: '24.5px',
                    backgroundColor: MANILLA,
                    transform: 'skewX(-20deg)',
                    borderTopLeftRadius: '4px',
                    zIndex: 2,
                }}
            />
            <div
                style={{
                    height: '5.5px',
                    padding: '0.5rem 1rem',
                    backgroundColor: MANILLA,
                    fontWeight: 'bold',
                    zIndex: 3,
                    borderTop: `4px solid ${BORDER_COLOR}`,
                    borderTopLeftRadius: '6px',
                    borderTopRightRadius: '6px',
                    borderBottom: `4px solid ${MANILLA}`
                }}
            >
                <p
                    style={{
                        margin: '-6px 0 0',
                    }}
                >
                    {label}
                </p>
            </div>
            <div
                style={{
                    position: 'absolute',
                    right: '-9px',
                    width: '10px',
                    height: '29.33px',
                    backgroundColor: BORDER_COLOR,
                    transform: 'skewX(20deg)',
                    borderTopRightRadius: '4px',
                    zIndex: 2,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    right: '-7px',
                    bottom: '0px',
                    width: '20px',
                    height: '24.5px',
                    backgroundColor: MANILLA,
                    transform: 'skewX(20deg)',
                    borderTopRightRadius: '4px',
                    zIndex: 2,
                }}
            />
        </div>
    );

    return (
        <div
            style={{
                position: 'absolute',
                top: index * 10 + 30,
                left: index * 12,
                right: 0,
                margin: 'auto',
                width: '80%',
                height: '80%',
                backgroundColor: MANILLA,
                borderLeft: `4px solid ${BORDER_COLOR}`,
                borderRight: `4px solid ${BORDER_COLOR}`,
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                zIndex: index,
                overflow: 'visible',
            }}
        >
            {tab()}
            <div
                style={{
                    borderTop: `4px solid ${BORDER_COLOR}`,
                }}
            >
                {children}
            </div>
        </div>
    );
};
