import React from 'react'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// component
import { VerticalForm,  } from '../form';
import { Modal,Button } from 'react-bootstrap';
// form validation schema
const schemaResolver = yupResolver(
    yup.object().shape({
        name: yup.string().required('Please enter name'),
        position: yup.string().required('Please enter your position'),
        company: yup.string().required('Please enter your company name'),
        email: yup.string().required('Please enter Email address').email('Enter valid email'),
    })
);
function ModelViewBox(props) {
    const {modal,toggle,children,modelHeader,modelSize } = props;
    return (
        <React.Fragment>
            <Modal show={modal} onHide={toggle} centered size={modelSize}>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">{modelHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <VerticalForm onSubmit={() => { }} resolver={schemaResolver} defaultValues={{}}>

                        {children}
                        {/* <FormInput
                            label={'Name'}
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            containerClass={'mb-3'}
                        />

                        <FormInput
                            label={'Position'}
                            type="text"
                            name="position"
                            placeholder="Enter position"
                            containerClass={'mb-3'}
                        />

                        <FormInput
                            label={'Company'}
                            type="text"
                            name="company"
                            placeholder="Enter company"
                            containerClass={'mb-3'}
                        />

                        <FormInput
                            label={'Email address'}
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            containerClass={'mb-3'}
                        /> */}

                        <Button variant="light" className="waves-effect waves-light me-1" type="submit">
                            Save
                        </Button>
                        <Button variant="danger" className="waves-effect waves-light" onClick={toggle}>
                            Cancel
                        </Button>
                    </VerticalForm>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default ModelViewBox;