import React from 'react';

function Button({type, content}) {
    return (
        <a className={`btn btn-${type}`}>{content}</a>
    );
}

export default Button;