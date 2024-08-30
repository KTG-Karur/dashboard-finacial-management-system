// types
import { PricingPlan, Invoice } from './types';

const pricingPlans: PricingPlan[] = [
    {
        id: 1,
        name: 'Basic',
        price: 19,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: false,
    },
    {
        id: 1,
        name: 'Premium',
        price: 29,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: true,
    },
    {
        id: 2,
        name: 'Developer',
        price: 39,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: false,
    },
    {
        id: 3,
        name: 'Business',
        price: 49,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: false,
    },
];

const pricingPlans2: PricingPlan[] = [
    {
        id: 1,
        name: 'Basic',
        price: 19,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: false,
    },
    {
        id: 1,
        name: 'Premium',
        price: 29,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: true,
    },
    {
        id: 2,
        name: 'Developer',
        price: 39,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: false,
    },
];

const invoiceDetails: Invoice = {
    invoice_id: '2016-04-23654789',
    customer: 'YUVARAJ K',
    notes: 'Thanks a lot because you keep purchasing our products. Our company promises to provide high quality products for you as well as outstanding customer service for every transaction.',
    order_date: ' Jan 17, 2016',
    order_status: 'Pending',
    order_id: '#123456',
    address: {
        owner: 'NO 48, THUMBIVADI',
        line_1: '5',
        city: 'San Francisco',
        state: 'CA',
        zip: 94107,
        phone: '(123) 456-7890',
    },
    items: [
        {
            id: 1,
            name: 'LCD',
            description: 'Lorem ipsum dolor sit amet.',
            quantity: 1,
            unit_cost: '$380',
            total: '$380',
        },
        {
            id: 2,
            name: 'Mobile',
            description: 'Lorem ipsum dolor sit amet.',
            quantity: 5,
            unit_cost: '$50',
            total: '$250',
        },
        {
            id: 3,
            name: 'LED',
            description: 'Lorem ipsum dolor sit amet.',
            quantity: 2,
            unit_cost: '$500',
            total: '$1000',
        },
        {
            id: 4,
            name: 'LCD',
            description: 'Lorem ipsum dolor sit amet.',
            quantity: 3,
            unit_cost: '$300',
            total: '$900',
        },
        {
            id: 5,
            name: 'Mobile',
            description: 'Lorem ipsum dolor sit amet.',
            quantity: 5,
            unit_cost: '$80',
            total: '$400',
        },
    ],
    sub_total: 2930.0,
    discount: 12.9,
    vat: 12.9,
    total: 2930.0,
};

const WelcomeDetails = {
    customer: 'YUVARAJ K',
    phone: '93877 59353',
    toDate: ' Jan 17, 2016',
    address: {
        location: 'NO 48, THUMBIVADI',
        city: 'Karur',
        state: 'TAMILNADU',
        country: 'India',
        pincode: 639001,
    },
    headerDescription:
        'We thank you for choosing our Company for your financial requirements and giving us an opportunity to serve you.',
    headerSubDescripion: 'We Wish to list Loan details which are as follows: ',
    loanNo: 'HFLN03',
    loanAmount: '1300000',
    Tenure: '156 months',
    dateofAgreement: '24/11/2023',
    firstInstallment: '15/12/2023',
    lastInstallment: '15/11/2027',
    footerDescription:
        'We request you to make the Monthly payment as per the Agreement. The Monthly Installment Schedule is attached herewith',
    footersubDescription: 'You Mobile No. as per our records is +91 1234567890 Please inform us,',
    footersubDescription2: 'if there is a change in your Mobile No.',
    footersubDescription3: 'Please update your AADHAAR Number with our branch, if no yet updated.',
    footersubDescription4:
        'If you require any futher details, please contact us at our Branch Office address given below:',
    officeAddress: {
        companyName: 'SHRIRAM FINANCE LIMI',
        companyAddress:'108 ANNAMALAI COMPLEX 2ND FLR KOVAI MAIN ROAD',
        companyDistrict:'ERODE',
        companyPincode:639002,
        companyState:'TAMILNADU',
        companyCountry:'INDIA',
    },
    thankyou:'Thanking you',
    termsandCondition:{
        NoOne:'Please quote your Loan No mentioned above for all your future communications.',
        NoTwo:'Please collect proper receipt on payment of cash/cheque.',
        NoThree:'Please register your Mobile Number(ignore if already registered), at our branch office, to receive SMS regarding new schemes and confirmation of receipt of installments within 3 working days of payment.',
    }
    
};

export { pricingPlans, pricingPlans2, invoiceDetails, WelcomeDetails };
