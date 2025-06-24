import React from 'react';

interface Props {
    style?: object;
}

export const Row = (props: React.PropsWithChildren<Props>) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', ...props.style }}>
            {props.children}
        </div>
    );
};

export const Col = (props: React.PropsWithChildren<Props>) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', ...props.style }}>
            {props.children}
        </div>
    );
};
