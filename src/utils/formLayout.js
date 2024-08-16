import React from 'react'
import FormComponent from './formComponent';

function FormLayout(props) {
    const { dynamicForm, noOfColumns } = props;

    const screenWidth = window.innerWidth;
    const noOfCol = 12 / noOfColumns;
    return (
        <div className='row'>
            {
                dynamicForm.map((rowData, index) => {
                    return (
                        <div key={index} className={screenWidth > 600 ? `col-${noOfCol}` : 'col-12'}>
                            <FormComponent formField={rowData?.employeeFormData} />
                        </div>
                    )

                })
            }
        </div>
    )
}

export default FormLayout