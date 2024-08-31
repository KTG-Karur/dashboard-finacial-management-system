
// import React, { useEffect, useRef, useState } from 'react';
// import { loanTabs } from './formFieldData';
// import { Row, Col, Card, Button } from 'react-bootstrap';
// // component
// import FormLayout from '../../utils/formLayout';
// import { showConfirmationDialog } from '../../utils/AllFunction';
// import { useNavigate } from 'react-router-dom';
// import LoanPdf from '../../utils/loanPdf';

// function Index() {
//     // useStates
//     const [state, setState] = useState({});
//     const [errors, setErrors] = useState([]);
//     const errorHandle = useRef();
//     const [optionListState, setOptionListState] = useState({
//         applicant: [],
//         coApplicant: [],
//         guardiance: [],
//         category: [
//             { value: 'interest', label: 'Interest' },
//             { value: 'emi', label: 'EMI' },
//         ],
//         subCategory: [
//             { value: '1', label: 'Personal Loan' },
//             { value: '2', label: 'Business Loan' },
//             { value: '3', label: 'Car Loan' },
//             { value: '4', label: 'Home Loan' },
//         ],
//         ChargesType: [
//             { value: 'Document Charges', label: 'Document Charges' },
//             { value: 'Login Fees', label: 'Login Fees' },
//         ],
//         percentOrAmount: [
//             { value: '1', label: 'Percentage' },
//             { value: '2', label: 'Amount' },
//         ],
//         disbursedMethod: [
//             { value: 'cash', label: 'Cash' },
//             { value: 'bank', label: 'Bank' },
//         ],
//         tenurePeriod: [
//             { value: '1', label: '6 Months' },
//             { value: '2', label: '12 Months' },
//             { value: '3', label: '18 Months' },
//             { value: '4', label: '24 Months' },
//             { value: '5', label: '30 Months' },
//             { value: '6', label: '36 Months' },
//         ],
//     });
//     const [tabList, setTabList] = useState(loanTabs);
//     const navigate = useNavigate();

//     const copyApplicantList = {
//         applicant: [
//             { value: 'Surya', label: 'Surya-HF01' },
//             { value: 'Aravind', label: 'Aravind-HF02' },
//             { value: 'Velu', label: 'Velu-HF03' },
//             { value: 'Deena', label: 'Deena-HF04' },
//             { value: 'Syed', label: 'Syed-HF05' },
//         ],
//     };
 
//     // console.log('state');
//     // console.log(state);
//     // console.log(tabList);

//     useEffect(() => {
//         let datafromApplicant;
//         let datafromCoApplicant;
//         let datafromGuardiance;
//         if (state?.applicant != '') {
//             datafromCoApplicant = copyApplicantList.applicant.filter((item) => item.value !== state?.applicant);
//             setOptionListState({
//                 ...optionListState,
//                 coApplicant: datafromCoApplicant,
//                 guardiance: datafromGuardiance,
//             });
//         }
//         if (state?.coApplicant != '') {
//             datafromApplicant = copyApplicantList.applicant.filter((item) => item.value !== state?.coApplicant);
//             setOptionListState({
//                 ...optionListState,
//                 applicant: datafromApplicant,
//                 guardiance: datafromGuardiance,
//             });
//         }
//         if (state?.guardiance != '') {
//             datafromApplicant = copyApplicantList.applicant.filter((item) => item.value !== state?.guardiance);
//             setOptionListState({
//                 ...optionListState,
//                 applicant: datafromApplicant,
//                 coApplicant: datafromCoApplicant,
//             });
//         }

//         if (state?.applicant != '' && state?.coApplicant != '') {
//             datafromGuardiance = copyApplicantList.applicant.filter(
//                 (item) => item.value !== state?.applicant && item.value !== state?.coApplicant
//             );
//             setOptionListState({
//                 ...optionListState,
//                 applicant: datafromApplicant,
//                 coApplicant: datafromCoApplicant,
//                 guardiance: datafromGuardiance,
//             });
//         }
//         if (state?.applicant != '' && state?.guardiance != '') {
//             datafromCoApplicant = copyApplicantList.applicant.filter(
//                 (item) => item.value !== state?.applicant && item.value !== state?.guardiance
//             );
//             setOptionListState({
//                 ...optionListState,
//                 applicant: datafromApplicant,
//                 coApplicant: datafromCoApplicant,
//                 guardiance: datafromGuardiance,
//             });
//         }
//         if (state?.coApplicant != '' && state?.guardiance != '') {
//             datafromApplicant = copyApplicantList.applicant.filter(
//                 (item) => item.value !== state?.coApplicant && item.value !== state?.guardiance
//             );
//             setOptionListState({
//                 ...optionListState,
//                 applicant: datafromApplicant,
//                 coApplicant: datafromCoApplicant,
//                 guardiance: datafromGuardiance,
//             });
//         }
//     }, [state?.applicant, state?.coApplicant, state?.guardiance]);

//     const handleValidation = () => {
//         errorHandle.current.validateFormFields();
//     };

//     //handleClear
//     const handleClear = () => {
//         setState({
//             ...state,
//             applicant: '',
//             coApplicant: '',
//             guardiance: '',
//             category: '',
//             subCategory: '',
//             interest: '',
//             loanAmount: '',
//             ChargesType: '',
//             disbursedDate: '',
//             dueDate: '',
//             tenurePeriod: '',
//             deadLineDate: '',
//             disbursedMethod: '',
//             accountHolderName: '',
//             branch: '',
//             accountNo: '',
//             ifcs: '',
//         });
//     };

//     // handleSubmit
//     const handleSubmit = async () => {
//         navigate('/dashboard', { state: { state } });
//         console.log("handleSubmitted")
//     };
//     return (
//         <React.Fragment>
//             {/* <LoanPdf /> */}
//             <Card>
//                 <Card.Body>
//                     <Row>
//                         <Col xs={12}>
//                             <FormLayout
//                                 optionListState={optionListState}
//                                 dynamicForm={loanTabs}
//                                 handleSubmit={() => showConfirmationDialog(
//                                     "Do you want to create it?",
//                                     handleSubmit,
//                                     'Yes, Create it!'
//                                 )}
//                                 setState={setState}
//                                 state={state}
//                                 ref={errorHandle}
//                                 editData={state}
//                                 noOfColumns={4}
//                                 errors={errors}
//                                 setErrors={setErrors}
//                             />
//                         </Col>
//                     </Row>
//                     <div className="d-flex justify-content-end">
//                         <Button onClick={handleClear} className="mx-2" variant="secondary">
//                             Reset
//                         </Button>
//                         <Button onClick={handleValidation} variant="primary">
//                             Submit
//                         </Button>
//                     </div>
//                 </Card.Body>
//             </Card>
//         </React.Fragment>
//     );
// }

// export default Index;