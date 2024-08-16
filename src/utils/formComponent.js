import React, { useState } from 'react'
import { FormInput } from '../components/form';
import Select from 'react-select';
import { Form } from 'react-bootstrap';
import _ from "lodash"

function FormComponent(props) {
  const { formField } = props;

  // console.log("formField")
  // console.log(formField)

  const [value, setValue] = useState();
  let formBox = [];
  const handleChange = (e, formType, formName) => {
    switch (formType) {
      case 'text':
      case 'number':
      case 'textarea':
      case 'date':
        setValue((prev) => ({
          ...prev,
          [formName]: e.target.value
        }));
        break;
      case 'select':
        setValue((prev) => ({
          ...prev,
          [formName]: e.value
        }));
        break;
      case 'checkbox':
        !formBox.includes(e) ? formBox.push(e) : formBox.splice(formBox.indexOf(e), 1)
        formBox = [...formBox];
        console.log(formBox);
        return
        setValue((prev) => ({
          ...prev,
          [formName]: formBox
        }));
        break;
      case 'radio':
        setValue((prev) => ({
          ...prev,
          [formName]: e
        }));
        break;

    }
  }
  console.log("value -> ", value)

  return (
    <div>
      {
        formField.map((form, index) => {

          switch (form?.inputType) {
            case "text":
              return (
                <FormInput
                  label={form?.label}
                  type="text"
                  name={form?.name}
                  className='mb-2'
                  key={index}
                  placeholder={form?.placeholder}
                  required={form?.require}
                  disabled={form?.isDisabled}
                  onChange={(e) => { handleChange(e, 'text', form?.name) }}
                />
              )
            case "number":
              return (
                <FormInput
                  label={form?.label}
                  type="number"
                  name={form?.name}
                  className='mb-2'
                  key={index}
                  placeholder={form?.placeholder}
                  required={form?.require}
                  disabled={form?.isDisabled}
                  onChange={(e) => { handleChange(e, 'number', form?.name) }}
                />
              )
            case "date":
              return (
                <FormInput
                  label={form?.label}
                  type="date"
                  name={form?.name}
                  className='mb-2'
                  key={index}
                  placeholder={form?.placeholder}
                  required={form?.require}
                  disabled={form?.isDisabled}
                  onChange={(e) => { handleChange(e, 'date', form?.name) }}
                />
              )
            case "file":
              return (
                <FormInput
                  label={form?.label}
                  type="file"
                  name={form?.name}
                  className='mb-2'
                  multiple={form?.multiple}
                  key={index}
                  placeholder={form?.placeholder}
                  required={form?.require}
                  disabled={form?.isDisabled}
                  onChange={(e) => { handleChange(e, 'file', form?.name) }}
                />
              )
            case "select":
              return (
                <div className={'mb-3'} key={index}>
                  <p className="mb-1 fw-bold text-muted">{form?.label}</p>
                  <Select
                    isMulti={form?.isMultiple}
                    required={form?.require}
                    disabled={form?.isDisabled}
                    onChange={(e) => { handleChange(e, 'select', form?.name) }}
                    className="react-select react-select-container"
                    classNamePrefix="react-select"
                    options={[
                      { value: 'chocolate', label: 'Chocolate' },
                      { value: 'strawberry', label: 'Strawberry' },
                      { value: 'vanilla', label: 'Vanilla' },
                    ]}
                  ></Select>
                </div>
              )
            case "checkbox":
              return (
                <div className={'mb-3'} key={index}>
                  <p className="mb-1 fw-bold text-muted">{form?.label}</p>
                  {([{ label: "a", value: "a" }, { label: "b", value: "b" }, { label: "c", value: "c" }]).map((item, i) => {
                    return (
                      <Form.Check
                        key={i}
                        label={form?.label}
                        type="checkbox"
                        id={`basic-checkbox-${i}`}
                        name={form?.name}
                        className={'mb-2 form-check-Primary'}
                        defaultChecked={form?.defaultChecked}
                        onChange={(e) => { handleChange(item, 'checkbox', form?.name) }}
                      />
                    );
                  })}
                </div>
              )
            case "radio":
              return (
                <div className={'mb-3'} key={index}>
                  <p className="mb-1 fw-bold text-muted">{form?.label}</p>
                  {([{ label: "a", value: "a" }, { label: "b", value: "b" }, { label: "c", value: "c" }]).map((item, i) => {
                    return (
                      <Form.Check
                        key={i}
                        label={form?.label}
                        type="radio"
                        id={`basic-radio-${i}`}
                        name={form?.name}
                        className={'mb-2 form-check-Primary'}
                        defaultChecked={form?.defaultChecked}
                        onChange={(e) => { handleChange(item, 'radio', form?.name) }}
                      />
                    );
                  })}
                </div>
              )
          }
        })

      }
    </div>
  )

}

export default FormComponent