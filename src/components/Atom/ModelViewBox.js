import React from 'react';
import { VerticalForm } from '../form';
import { Modal, Button } from 'react-bootstrap';

function ModelViewBox(props) {
    const { modal, toggle, children, modelHeader, modelSize, handleSubmit, isEdit } = props;

    return (
        <React.Fragment>
            <Modal show={modal} onHide={toggle} centered size={modelSize}>
                <Modal.Header closeButton>
                    <Modal.Title as="h4">{`${isEdit ? 'Edit ' : 'Add'} ${modelHeader}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <VerticalForm onSubmit={() => {}} defaultValues={{}}>
                        {children}

                        <div className='d-flex justify-content-end'>
                            <Button
                                variant="primary"
                                className="waves-effect waves-light me-1"
                                type="button"
                                onClick={handleSubmit}>
                                {`${isEdit ? 'Update' : 'Save'}`}
                            </Button>
                            <Button variant="danger" className="waves-effect waves-light" onClick={toggle}>
                                Cancel
                            </Button>
                        </div>
                    </VerticalForm>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default ModelViewBox;
