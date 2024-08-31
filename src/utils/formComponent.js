import React, { useEffect, useState } from 'react';
import { FormInput } from '../components/form';
import Select from 'react-select';
import { Button, Form } from 'react-bootstrap';
import { formatDate, findObj } from './AllFunction';
import _ from 'lodash';

function FormComponent(props) {
    const {
        formField,
        setState,
        errors,
        onChangeCallBack,
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
                    [formName]: e,
                }));
                break;
            case 'multiple':
                console.log("e")
                console.log(e)
                setState((prev) => ({
                    ...prev,
                    [formName]: e,
                }));
                break;
            case 'radio':
                setState((prev) => ({
                    ...prev,
                    [formName]: e,
                }));
                break;
            case 'file':
                setState((prev) => ({
                    ...prev,
                    [formName]: [e.target.files[0]],
                }));
                break;
            default:
                console.log('formName ', formName);
        }
    };

    const shouldShowElement = (parentKey, childKey) => {
        if (parentKey && childKey) {
            return [childKey].includes(state[parentKey]);
        }
        return true;
    };

    return (
        <div>
            {formField.map((form, index) => {
                switch (form?.inputType) {
                    case 'title':
                        return <h4 className="mb-3">{form.title}</h4>;
                    case 'textarea':
                        return (
                            shouldShowElement(form?.parentKey, form?.childKey) && (
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
                                            style={{ fontWeight: 'bold' }}>{`* Please Enter ${form?.label}`}</p>
                                    )}
                                </div>
                            )
                        );
                    case 'text':
                        return (
                            shouldShowElement(form?.parentKey, form?.childKey) && (
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
                                        <p className="text-danger" style={{ fontWeight: 'bold' }}>
                                            {form.errorMsg
                                                ? form.errorMsg
                                                : `* Please Enter ${form?.label || 'Given Field'}`}
                                        </p>
                                    )}
                                </div>
                            )
                        );
                    case 'file':
                        return (
                            shouldShowElement(form?.parentKey, form?.childKey) && (
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
                                        type="file"
                                        name={form?.name}
                                        className="mb-1"
                                        placeholder={form?.placeholder}
                                        required={form?.require}
                                        disabled={form?.isDisabled}
                                        onFocus={form?.require ? () => removeHanldeErrors(form?.name) : null}
                                        onChange={(e) => {
                                            handleChange(e, 'file', form?.name);
                                        }}
                                    />
                                    {errors?.includes(form?.name) && (
                                        <p
                                            className="text-danger"
                                            style={{ fontWeight: 'bold' }}>{`* Please Enter ${form?.label}`}</p>
                                    )}
                                </div>
                            )
                        );
                    case 'number':
                        return (
                            shouldShowElement(form?.parentKey, form?.childKey) && (
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
                                            const value = e.target.value;
                                            // Check if the value exceeds the maxlength
                                            if (!form?.maxlength || value.length <= form?.maxlength) {
                                                handleChange(e, 'number', form?.name);
                                            }
                                        }}
                                    />
                                    {errors?.includes(form?.name) && (
                                        <p
                                            className="text-danger"
                                            style={{ fontWeight: 'bold' }}>{`* Please Enter ${form?.label}`}</p>
                                    )}
                                </div>
                            )
                        );
                    case 'date':
                        return (
                            shouldShowElement(form?.parentKey, form?.childKey) && (
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
                                            style={{ fontWeight: 'bold' }}>{`* Please Enter ${form?.label}`}</p>
                                    )}
                                </div>
                            )
                        );
                    case 'select':
                        return (
                            shouldShowElement(form?.parentKey, form?.childKey) && (
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
                                        required={form?.require}
                                        disabled={form?.isDisabled}
                                        onChange={(option) => {
                                            form.onChange
                                                ? onChangeCallBack[form.onChange](option, form.name)
                                                : handleChange(option[form.uniqueKey], 'select', form?.name);
                                        }}
                                        // getOptionLabel={(option) => option?.label}
                                        getOptionLabel={(option) =>
                                            form.displayKey ? option[form.displayKey] : option.label
                                        }
                                        getOptionValue={(option) => (form.uniqueKey ? option[form.uniqueKey] : option)}
                                        value={_.find(optionListState?.[form?.optionList], (option) =>
                                            _.isEqual(option[form.uniqueKey], state[form.name])
                                        )}
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
                                            style={{ fontWeight: 'bold' }}>{`* Please Enter ${form?.label}`}</p>
                                    )}
                                </div>
                            )
                        );
                    case 'multiple':
                        return (
                            shouldShowElement(form?.parentKey, form?.childKey) && (
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
                                        onChange={(option) => {
                                            form.onChange
                                                ? onChangeCallBack[form.onChange](option, form.name)
                                                : handleChange(option, 'multiple', form?.name);
                                        }}
                                        // getOptionLabel={(option) => option?.label}
                                        getOptionLabel={(option) =>
                                            form.displayKey ? option[form.displayKey] : option.label
                                        }
                                        getOptionValue={(option) => (form.uniqueKey ? option[form.uniqueKey] : option)}
                                        value={_.find(optionListState?.[form?.optionList], (option) =>
                                            _.isEqual(option[form.uniqueKey], state[form.name])
                                        )}
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
                                            style={{ fontWeight: 'bold' }}>{`* Please Enter ${form?.label}`}</p>
                                    )}
                                </div>
                            )
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
                                            {form?.label || ""}{' '}
                                            {form?.require ? (
                                                <span style={{ fontWeight: 'bold', color: 'red' }}>*</span>
                                            ) : null}
                                        </span>
                                    }
                                </p>
                                <div className='d-flex'>
                                {(optionListState?.[form?.optionList] || []).map((item, i) => {
                                    return (
                                        <Form.Check
                                            key={i}
                                            label={item[form.displayKey] || ""}
                                            type="radio"
                                            id={`basic-radio-${i}`}
                                            name={form?.name || ""}
                                            className={'mb-2 form-check-Primary mx-2'}
                                            defaultChecked={i === 0}
                                            value={state[form?.name]}
                                            onChange={(e) => {
                                                form.onChange ? onChangeCallBack[form.onChange](item, form.name) :
                                                    handleChange(item, 'radio', form?.name);
                                            }}
                                        />
                                    );
                                })}
                                </div>
                                
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
