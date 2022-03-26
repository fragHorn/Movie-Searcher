import React from 'react';

const error = props => {
    return (
        <div>
            {props.err.message}
        </div>
    );
}

export default error;