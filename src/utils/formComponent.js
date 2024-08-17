import React, { useState } from 'react'
import { FormInput } from '../components/form';
import Select from 'react-select';
import { Form } from 'react-bootstrap';

function FormComponent(props) {
  const { formField, setValue, errors} = props;

  // let formBox = []; for Checkbox
  const handleChange = async (e, formType, formName) => {
    switch (formType) {
      case 'text':
      case 'number':
      case 'textarea':
      case 'date':
        setValue((prev) => ({
          ...prev,
          [formName]: e?.target?.value
        }));
        break;
      case 'select':
        setValue((prev) => ({
          ...prev,
          [formName]: e?.value
        }));
        break;
      // case 'checkbox':
      //   !formBox.includes(e) ? formBox.push(e) : formBox.splice(formBox.indexOf(e), 1)
      //   formBox = [...formBox];
      //   setValue((prev) => ({
      //     ...prev,
      //     [formName]: formBox
      //   }));
      //   break;
      case 'radio':
        setValue((prev) => ({
          ...prev,
          [formName]: e
        }));
        break;
      case 'file':
        setValue((prev) => ({
          ...prev,
          [formName]: e?.target?.files[0]
        }));
        break;

    }
  }

  return (
    <div>
      {
        formField.map((form, index) => {

          switch (form?.inputType) {
            case "text":
              return (
                <div key={index} className='mb-2'>
                  <FormInput
                    label={form?.label}
                    type="text"
                    name={form?.name}
                    className='mb-1'
                    placeholder={form?.placeholder}
                    required={form?.require}
                    disabled={form?.isDisabled}
                    onChange={(e) => { handleChange(e, 'text', form?.name) }}
                  />
                  {errors.includes(form?.name) && <p className="text-danger" style={{ fontWeight: "bold" }}>{`* Please Enter ${form?.name}`}</p>}
                </div>
              )
            case "number":
              return (
                <div key={index} className='mb-2'>
                  <FormInput
                    label={form?.label}
                    type="number"
                    name={form?.name}
                    className='mb-1'
                    placeholder={form?.placeholder}
                    required={form?.require}
                    disabled={form?.isDisabled}
                    onChange={(e) => { handleChange(e, 'number', form?.name) }}
                  />
                  {errors.includes(form?.name) && <p className="text-danger" style={{ fontWeight: "bold" }}>{`* Please Enter ${form?.name}`}</p>}
                </div>
              )
            case "date":
              return (
                <div key={index} className='mb-2'>
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
                  {errors.includes(form?.name) && <p className="text-danger" style={{ fontWeight: "bold" }}>{`* Please Enter ${form?.name}`}</p>}
                </div>
              )
            case "file":
              return (
                <div key={index} className='mb-2'>
                  <FormInput
                    label={form?.label}
                    type="file"
                    name={form?.name}
                    className='mb-1'
                    multiple={form?.multiple}
                    key={index}
                    placeholder={form?.placeholder}
                    required={form?.require}
                    disabled={form?.isDisabled}
                    onChange={(e) => { handleChange(e, 'file', form?.name) }}
                  />
                  {errors.includes(form?.name) && <p className="text-danger" style={{ fontWeight: "bold" }}>{`* Please Enter ${form?.name}`}</p>}
                </div>
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
                      { value: 'Admin', label: 'Admin' },
                      { value: 'Fund Collector', label: 'Fund Collector' },
                      { value: 'Manager', label: 'Manager' },
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