import React from 'react'
import harshiniFincorpLogo from '../../assets/images/Harsini_Fincorp.png';

function CompanyDetails(props) {
    const { fontSize, imgSize, classStyle } = props;
    return (
        <div className={classStyle}>
            <h3>
                <img
                    src={harshiniFincorpLogo}
                    alt="harshiniFincorpLogo"
                    style={{ width: imgSize }}
                />
            </h3>
            <div style={{ fontSize }}>
                Plot No: 11,
                Opposite District Collectorate,
                Thanthoni Malai,
                Karur - 639 007.
            </div>
            <div>
            <span style={{ fontSize }}>
            <i className={'fe-mail'}></i> support@harshinifincorp.com
            </span>
            <span style={{ fontSize }} className='mx-2'>
            <i className={'fe-mail'}></i> +91 9876543210 
            </span>
            </div>
        </div>
    )
}

export default CompanyDetails