import { Card, Col, Row, Form } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import React, { useState, useEffect } from 'react';
import { emiCalculation, calculateTotalInterestPayable, numberWithCommas } from '../../utils/AllFunction';
import Statistics from '../../pages/dashboards/DashBoard1/Statistics';


const Index = () => {
    const apexOpts = {
        chart: {
            type: 'donut',
        },
        plotOptions: {
            pie: {
                expandOnClick: true,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            formatter: (val) => val,
                            offsetY: 4,
                            color: '#98a6ad',
                        },
                        value: {
                            show: true,
                            formatter: (val) => val,
                            color: '#98a6ad',
                        },
                    },
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#6658dd', '#ff8acc'],
        legend: {
            show: true,
            position: 'bottom',
            height: 40,
            labels: {
                useSeriesColors: true,
            },
        },
        labels: ['Loan Amount', 'Total Interest'],
        tooltip: {
            enabled: false,
        },
    };

    const [chartValue, setChartValue] = useState({
        principalPer: 50,
        interestPer: 50,
    });

    const apexData = [parseFloat(chartValue.principalPer), parseFloat(chartValue.interestPer)];

    const [state, setState] = useState({
        loanAmount: 0,
        interestRate: 0,
        loanTenure: 0,
    });

    const [emiValue, setEmiValue] = useState({
        loanEmi: 0,
        interestPayable: 0,
        totalPayment: 0,
    });

    useEffect(() => {
        const { loanAmount, interestRate, loanTenure } = state;

        if (loanAmount > 0 && interestRate > 0 && loanTenure > 0) {
            const emi = emiCalculation(loanAmount, interestRate, loanTenure);
            const interest = calculateTotalInterestPayable(loanAmount, interestRate, loanTenure);
            const totalPayment = loanAmount + parseFloat(interest);

            const principalAmtPer = (loanAmount / totalPayment) * 100;
            const interestPer = (interest / totalPayment) * 100;

            setEmiValue({
                loanEmi: parseFloat(emi).toFixed(2),
                interestPayable: parseFloat(interest).toFixed(2),
                totalPayment: parseFloat(totalPayment).toFixed(2),
            });

            setChartValue({
                principalPer: parseFloat(principalAmtPer).toFixed(1),
                interestPer: parseFloat(interestPer).toFixed(1),
            });
        }
    }, [state]);

    const onChange = (event) => {
        const { value, name } = event.target;
        setState({
            ...state,
            [name]: parseFloat(value) || 0,
        });
    };


    return (
        <React.Fragment>
            <Statistics />
            <Card>
                <Card.Body>
                    <h4 className="header-title mt-0">EMI Calculator</h4>

                    <Row className="mt-3">
                        <Col xs={12} md={6}>
                            <div className="mb-2">
                                <Form.Label>Loan Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="loanAmount"
                                    className="mb-1"
                                    placeholder="Enter Loan Amount"
                                    onChange={onChange}
                                />
                            </div>
                            <div className="mb-2">
                                <Form.Label>Interest Rate</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="interestRate"
                                    className="mb-1"
                                    placeholder="Enter Interest Rate"
                                    onChange={onChange}
                                />
                            </div>
                            <div className="mb-2">
                                <Form.Label>Loan Tenure (in years)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="loanTenure"
                                    className="mb-1"
                                    placeholder="Enter Loan Tenure"
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mt-5 d-flex justify-content-center">
                                <div>
                                    <h3>Loan EMI</h3>
                                    <p className="text-center" style={{ fontSize: '18px' }}>
                                        <strong>{numberWithCommas(emiValue.loanEmi)}</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div>
                                    <h3>Total Interest Payable</h3>
                                    <p className="text-center" style={{ fontSize: '18px' }}>
                                        <strong>{numberWithCommas(emiValue.interestPayable)}</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div>
                                    <h3>Total Payment</h3>
                                    <h5>{"(Principal + Interest)"}</h5>
                                    <p className="text-center" style={{ fontSize: '18px' }}>
                                        <strong>{numberWithCommas(emiValue.totalPayment)}</strong>
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col xs={12} md={6}>
                            <div dir="ltr">
                                <Chart
                                    options={apexOpts}
                                    series={apexData}
                                    type="donut"
                                    height={302}
                                    className="apex-charts mt-2"
                                />
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default Index;

