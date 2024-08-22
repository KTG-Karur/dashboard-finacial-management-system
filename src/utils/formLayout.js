import React from 'react';
import FormComponent from './formComponent';

const FormLayout = (props) => {
    const { dynamicForm, noOfColumns, state, setState, errors,removeHanldeErrors } = props;
    const screenWidth = window.innerWidth;
    const noOfCol = 12 / noOfColumns;

    return (
        <div className='row'>
            {dynamicForm.map((rowData, index) => (
                <div key={index} className={screenWidth > 600 ? `col-${noOfCol}` : 'col-12'}>
                    <FormComponent
                        formField={rowData?.formFields}
                        setState={setState}
                        state={state}
                        errors={errors} 
                        removeHanldeErrors={removeHanldeErrors}
                    />
                </div>
            ))}
        </div>
    );
};

export default FormLayout;
