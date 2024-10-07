import { Button, Card, Col, Row, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useRedux } from '../../hooks';
import CompanyDetails from '../../components/Atom/CompanyDetails';
// import cardImg from '../../../assets/images/gallery/6.jpg';
import hundrendRuppee from '../../assets/images/currency/100_ruppee.jpg'
import tenRuppee from '../../assets/images/currency/10_ruppee.jpg'
import oneRuppee from '../../assets/images/currency/1_ruppee.jpg'
import twoThousandRuppee from '../../assets/images/currency/2000_ruppee.jpg'
import twohundrendRuppee from '../../assets/images/currency/200_ruppee.jpg'
import twentyRuppee from '../../assets/images/currency/20_ruppee.jpg'
import twoRuppee from '../../assets/images/currency/2_ruppee.jpg'
import fiveHundredRuppee from '../../assets/images/currency/500_ruppee.jpg'
import fivityRuppee from '../../assets/images/currency/50_ruppee.jpg'
import fiveRuppee from '../../assets/images/currency/5_ruppee.jpg'
import { amountFormat, dateConversion } from '../../utils/AllFunction';
import Table from '../../components/Table';

const ContraDetails = () => {
    const { dispatch } = useRedux();
    const location = useLocation();
    const { contraDetails, contraHistory, selectedData } = location.state || false;

    useEffect(() => {
        console.log(contraHistory)
    }, []);

    const columns = [
        {
            cardImg: twoThousandRuppee,
            count: "twoThousCount",
            amount: "2000"
        },
        {
            cardImg: fiveHundredRuppee,
            count: "fiveHundCount",
            amount: "500"
        },
        {
            cardImg: twohundrendRuppee,
            count: "twoHund",
            amount: "200"
        },
        {
            cardImg: hundrendRuppee,
            count: "hundCount",
            amount: "100"
        },
        {
            cardImg: fivityRuppee,
            count: "fivtycount",
            amount: "50"
        },
        {
            cardImg: twentyRuppee,
            count: "twentycount",
            amount: "20"
        },
        {
            cardImg: tenRuppee,
            count: "tencount",
            amount: "10"
        },
        {
            cardImg: fiveRuppee,
            count: "fiveCoinCount",
            amount: "5"
        },
        {
            cardImg: twoRuppee,
            count: "twocoincount",
            amount: "2"
        },
        {
            cardImg: oneRuppee,
            count: "onecoincount",
            amount: "1"
        },
    ]

    const tableColumns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        // {
        //     Header: 'Created Date',
        //     accessor: 'createdAt',
        //     sort: true,
        //     Cell: (row) => <div>{dateConversion(row.original.createdAt, "DD-MM-YYYY") }</div>,
        // },
        {
            Header: 'Created Date',
            accessor: 'createdAt',
            Cell: ({ row }) => {
                return (
                    <div>
                       {dateConversion(row.original.createdAt, "DD-MM-YYYY") }
                    </div>
                )
            },
        },
        {
            Header: 'Amount',
            accessor: 'amount',
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'isCredit',
            Cell: ({ row }) => (
                <div>
                    {row?.original?.isCredit ? (
                        <Badge bg={'success'}>Credit</Badge>
                    ) : (
                        <Badge bg={'danger'}>Debit</Badge>
                    )}
                </div>
            ),
        },
    ];

    const onSearchDate = () => {
    }

    return (
        <Row>
            <Col md={12}>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <div>
                            <Link to={'/accounts/contra'}>
                                <Button className='mb-2'>
                                    Back
                                    <span className="cursor-pointer ms-1">
                                        <i className={'fe-arrow-right'}></i>
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <div className="panel-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="">
                                    <CompanyDetails fontSize="12px" imgSize="200px" />
                                </div>
                                <div className="">
                                    <h4>Type : {selectedData.contraId != 1 ? "NEFT" : "CASH"} </h4>
                                    <h4>Balance Amount : {amountFormat(contraDetails[0]?.totalAmount || 0)} </h4>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <Row>
                            {
                                columns.map((item, index) => (
                                    <Col xl={4} lg={4} md={6} sm={6} key={index}>
                                        <Card className="text-white">
                                            <Card.Img src={item?.cardImg || ""} alt="" />
                                            <Card.ImgOverlay>
                                                <Card.Title className="text-white text-decoration-underline text-muted" style={{ letterSpacing: '2px' }}>{item?.amount || ""}'s</Card.Title>

                                                <Card.Text className='mx-2' style={{ fontSize: "17px" }}>
                                                    Count : {contraDetails[0][item.count] || 0} <br />
                                                    Total : {amountFormat(parseInt(contraDetails[0][item.count] || 0) * parseInt(item.amount))}
                                                </Card.Text>
                                            </Card.ImgOverlay>
                                        </Card>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Card.Body>
                    <Table
                        columns={tableColumns}
                        Title={'Contra History'}
                        data={contraHistory || []}
                        pageSize={25}
                        // toggle={createModel}
                        // btnName={'Transfer'}
                    />

                    <div className='d-flex justify-content-end mb-5 mx-2'>
                        <Button
                            variant="primary"
                            className="waves-effect waves-light"
                            onClick={onSearchDate}>
                            <i className={`mdi mdi-clipboard-text-search mx-1 `}></i>
                            {"Cash History >>"}
                        </Button>
                    </div>

                </Card>

            </Col>
        </Row>
    );
};

export default ContraDetails;
