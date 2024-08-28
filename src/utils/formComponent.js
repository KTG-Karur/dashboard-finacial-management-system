import React, { useEffect, useState } from 'react';
import { FormInput } from '../components/form';
import Select from 'react-select';
import { Button, Form } from 'react-bootstrap';
import { formatDate, findObj } from './AllFunction';

function FormComponent(props) {
    const {
        formField,
        setState,
        errors,
        removeHanldeErrors,
        state,
        toggleModal = null,
        showSelectmodel = [],
        optionListState,
    } = props;

    const handleChange = async (e, formType, formName) => {
        switch (formType) {
            case 'text':
            case 'number':
            case 'textarea':
                setState((prev) => ({
                    ...prev,
                    [formName]: e?.target?.value,
                }));
                break;
            case 'date':
                const formate = await formatDate(e?.target?.value);
                setState((prev) => ({
                    ...prev,
                    [formName]: formate,
                }));
                break;
            case 'select':
                setState((prev) => ({
                    ...prev,
                    [formName]: e.value,
                }));
                break;
            case 'radio':
                setState((prev) => ({
                    ...prev,
                    [formName]: e,
                }));
                break;
            default:
                console.log('formName ', formName);
        }
    };

    return (
        <div>
            {formField.map((form, index) => {
                switch (form?.inputType) {
                    case 'textarea':
                        return (
                            <div key={index} className="mb-2">
                                <Form.Label>
                                    <span>
                                        {form?.label}
                                        {form?.require ? (
                                            <span style={{ fontWeight: 'bold', color: 'red' }}>*</span>
                                        ) : null}
                                    </span>
                                </Form.Label>
                                <Form.Control
                                    type="textarea"
                                    name={form?.name}
                                    className="mb-1"
                                    rows={5}
                                    placeholder={form?.placeholder}
                                    required={form?.require}
                                    value={state[form?.name]}
                                    disabled={form?.isDisabled}
                                    onFocus={form?.require ? () => removeHanldeErrors(form?.name) : null}
                                    onChange={(e) => {
                                        handleChange(e, 'textarea', form?.name);
                                    }}
                                />
                                {errors?.includes(form?.name) && (
                                    <p
                                        className="text-danger"
                                        style={{ fontWeight: 'bold' }}>{`* Please Enter ${form?.name}`}</p>
                                )}
                            </div>
                        );
                    case 'text':
                        return (
                            <div key={index} className="mb-2">
                                <Form.Label>
                                    <span>
                                        {form?.label}{' '}
                                        {form?.require ? (
                                            <span style={{ fontWeight: 'bold', color: 'red' }}>*</span>
                                        ) : null}
                                    </span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name={form?.name}
                                    className="mb-1"
                                    placeholder={form?.placeholder}
                                    required={form?.require}
                                    value={state[form?.name] || ''}
                                    disabled={form?.isDisabled}
                                    onFocus={form?.require ? () => removeHanldeErrors(form?.name) : null}
                                    onChange={(e) => {
                                        handleChange(e, 'text', form?.name);
                                    }}
                                />
                                {errors?.includes(form?.name) && (
                                    <p
                                        className="text-danger"
                                        style={{ fontWeight: 'bold' }}>{form.errorMsg ? form.errorMsg :  `* Please Enter ${form?.label || "Given Field"}`}</p>
                                )}
                            </div>
                        );
                    case 'number':
                        return (
                            <div key={index} className="mb-2">
                                <Form.Label>
                                    <span>
                                        {form?.label}{' '}
                                        {form?.require ? (
                                            <span style={{ fontWeight: 'bold', color: 'red' }}>*</span>
                                        ) : null}
                                    </span>
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name={form?.name}
                                    className="mb-1"
                                    placeholder={form?.placeholder}
                                    required={form?.require}
                                    value={state[form?.name]}
                                    disabled={form?.isDisabled}
                                    onFocus={form?.require ? () => removeHanldeErrors(form?.name) : null}
                                    onChange={(e) => {
                                        handleChange(e, 'number', form?.name);
                                    }}
                                />
                                {errors?.includes(form?.name) && (
                                    <p
                                        className="text-danger"
                                        style={{ fontWeight: 'bold' }}>{`* Please Enter ${form?.name}`}</p>
                                )}
                            </div>
                        );
                    case 'date':
                        return (
                            <div key={index} className="mb-2">
                                <Form.Label>
                                    <span>
                                        {form?.label}{' '}
                                        {form?.require ? (
                                            <span style={{ fontWeight: 'bold', color: 'red' }}>*</span>
                                        ) : null}
                                    </span>
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name={form?.name}
                                    className="mb-2"
                                    key={index}
                                    placeholder={form?.placeholder}
                                    required={form?.require}
                                    value={state[form?.name]}
                                    disabled={form?.isDisabled}
                                    onFocus={form?.require ? () => removeHanldeErrors(form?.name) : null}
                                    onChange={(e) => {
                                        handleChange(e, 'date', form?.name);
                                    }}
                                />
                                {errors?.includes(form?.name) && (
                                    <p
                                        className="text-danger"
                                        style={{ fontWeight: 'bold' }}>{`* Please Enter ${form?.name}`}</p>
                                )}
                            </div>
                        );
                    case 'select':
                        return (
                            <div className={'mb-3'} key={index}>
                                <Form.Label>
                                    <span>
                                        {form?.label}{' '}
                                        {form?.require ? (
                                            <span style={{ fontWeight: 'bold', color: 'red' }}>*</span>
                                        ) : null}
                                        {
                                            //Add Option Modal Btn
                                            (showSelectmodel || []).includes(form?.name) && (
                                                <Button
                                                    variant="success"
                                                    className="waves-effect waves-light mx-1"
                                                    style={{ padding: '3px', lineHeight: '1.0' }}
                                                    onClick={() => {
                                                        toggleModal(form);
                                                    }}>
                                                    <i className="mdi mdi-plus-circle "></i>
                                                </Button>
                                            )
                                        }
                                    </span>
                                </Form.Label>
                                <Select
                                    isMulti={form?.isMultiple}
                                    required={form?.require}
                                    disabled={form?.isDisabled}
                                    onChange={(e) => {
                                        handleChange(e, 'select', form?.name);
                                    }}
                                    getOptionLabel={(option) => option?.label}
                                    getOptionValue={(option) => option}
                                    value={findObj(optionListState?.[form?.optionList], state[form?.name])}
                                    className="react-select react-select-container"
                                    classNamePrefix="react-select"
                                    isSearchable
                                    onFocus={form?.require ? () => removeHanldeErrors(form?.name) : null}
                                    options={optionListState?.[form?.optionList] || []}
                                    // options={form?.optionList}
                                ></Select>
                                {errors?.includes(form?.name) && (
                                    <p
                                        className="text-danger"
                                        style={{ fontWeight: 'bold' }}>{`* Please Enter ${form?.name}`}</p>
                                )}
                                
                            </div>
                        );
                    case 'checkbox':
                        return (
                            <div className={'mb-3'} key={index}>
                                <p className="mb-1 fw-bold text-muted">
                                    {' '}
                                    {
                                        <span>
                                            {form?.label}{' '}
                                            {form?.require ? (
                                                <span style={{ fontWeight: 'bold', color: 'red' }}>*</span>
                                            ) : null}
                                        </span>
                                    }
                                </p>
                                {[
                                    { label: 'a', value: 'a' },
                                    { label: 'b', value: 'b' },
                                    { label: 'c', value: 'c' },
                                ].map((item, i) => {
                                    return (
                                        <Form.Check
                                            key={i}
                                            label={form?.label}
                                            value={state[form?.name]}
                                            type="checkbox"
                                            id={`basic-checkbox-${i}`}
                                            name={form?.name}
                                            className={'mb-2 form-check-Primary'}
                                            defaultChecked={form?.defaultChecked}
                                            onChange={(e) => {
                                                handleChange(item, 'checkbox', form?.name);
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        );
                    case 'radio':
                        return (
                            <div className={'mb-3'} key={index}>
                                <p className="mb-1 fw-bold text-muted">
                                    {' '}
                                    {
                                        <span>
                                            {form?.label}{' '}
                                            {form?.require ? (
                                                <span style={{ fontWeight: 'bold', color: 'red' }}>*</span>
                                            ) : null}
                                        </span>
                                    }
                                </p>
                                {[
                                    { label: 'a', value: 'a' },
                                    { label: 'b', value: 'b' },
                                    { label: 'c', value: 'c' },
                                ].map((item, i) => {
                                    return (
                                        <Form.Check
                                            key={i}
                                            label={form?.label}
                                            type="radio"
                                            id={`basic-radio-${i}`}
                                            name={form?.name}
                                            className={'mb-2 form-check-Primary'}
                                            defaultChecked={form?.defaultChecked}
                                            value={state[form?.name]}
                                            onChange={(e) => {
                                                handleChange(item, 'radio', form?.name);
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        );
                    default:
                        console.log('form?.inputType : ', form?.inputType);
                }
            })}
        </div>
    );
}

export default FormComponent;
