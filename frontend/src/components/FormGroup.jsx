import React from 'react'

const FormGroup = (props) => {
    return (
        <div className='flex flex-col w-full'>
            {props.children}
        </div>
    )
}

export default FormGroup