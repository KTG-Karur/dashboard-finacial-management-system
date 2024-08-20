import React from 'react';
import FormComponent from './formComponent';

const FormLayout = (props) => {
    const { dynamicForm, noOfColumns, value, setValue, errors,removeHanldeErrors } = props;
    const screenWidth = window.innerWidth;
    const noOfCol = 12 / noOfColumns;

    return (
        <div className='row'>
            {dynamicForm.map((rowData, index) => (
                <div key={index} className={screenWidth > 600 ? `col-${noOfCol}` : 'col-12'}>
                    <FormComponent
                        formField={rowData?.formFields}
                        setValue={setValue}
                        value={value}
                        errors={errors}
                        removeHanldeErrors={removeHanldeErrors}
                    />
                </div>
            ))}
        </div>
    );
};

export default FormLayout;
