import { useEffect, useState } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Navigate, Link, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import LogoDark from '../../assets/images/Harsini_Fincorp.png';
import { APICore } from '../../helpers/api/apiCore';

// hooks
import { useRedux } from '../../hooks/';

// actions
import { resetAuth, loginUser, getEmployeeLoginRequest, resetGetEmployeeLogin } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/form/';
import Loader from '../../components/Loader';

import AuthLayout from './AuthLayout';

type LocationState = {
    from?: Location;
};

type UserData = {
    email: string;
    password: string;
};

/* bottom links */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col xs={12} className="text-center">
                <p className="text-muted text-light">
                    <Link to="/auth/forget-password" className="text-muted ms-1">
                        <i className="fa fa-lock me-1"></i>
                        {t('Forgot your password?')}
                    </Link>
                </p>
                {/* <p className="text-muted">
                    {t("Don't have an account?")}{' '}
                    <Link to={'/auth/register'} className="text-dark ms-1">
                        <b>{t('Sign Up')}</b>
                    </Link>
                </p> */}
            </Col>
        </Row>
    );
};

const Login = () => {
    const { t } = useTranslation();
    const { dispatch, appSelector } = useRedux();
    const [loading, setLoading] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    // const { user, userLoggedIn, loading, error } = appSelector((state) => ({
    //     user: state.Auth.user,
    //     loading: state.Auth.loading,
    //     error: state.Auth.error,
    //     userLoggedIn: state.Auth.userLoggedIn,
    // }));

    const {
        getEmployeeLoginSuccess, getEmployeeLoginList, getEmployeeLoginFailure, error

    } = appSelector((state) => ({
        getEmployeeLoginSuccess: state.loginReducer.getEmployeeLoginSuccess,
        getEmployeeLoginList: state.loginReducer.getEmployeeLoginList,
        getEmployeeLoginFailure: state.loginReducer.getEmployeeLoginFailure,

        error: state.loginReducer.errorMessage,
    }));

    useEffect(() => {
        localStorage.clear();
        dispatch(resetGetEmployeeLogin())
    }, [dispatch]);

    useEffect(() => {
        if (getEmployeeLoginSuccess) {
            setUserLoggedIn(true)
            setLoading(false)
            sessionStorage.setItem("loginInfo", JSON.stringify(getEmployeeLoginList));
        } else if (getEmployeeLoginFailure) {
            dispatch(resetGetEmployeeLogin())
        }
    }, [getEmployeeLoginSuccess, getEmployeeLoginFailure]);

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Please enter Email')).email(t('Please enter valid Email')),
            password: yup.string().required(t('Please enter Password')),
        })
    );

    /*
    handle form submission
    */
    const onSubmit = (formData: UserData) => {
        const sumbitReq={
            userName : formData['email'],
            password : formData['password']
        }
        setLoading(true)
        dispatch(getEmployeeLoginRequest(sumbitReq))
    };

    const location = useLocation();
    let redirectUrl = '/';

    if (location.state) {
        const { from } = location.state as LocationState;
        redirectUrl = from ? from.pathname : '/home';
    }

    return (
        <>
            {userLoggedIn && <Navigate to={redirectUrl} replace />}

            <AuthLayout bottomLinks={<BottomLink />}>
                <div className="text-center mb-4">
                    {/* <h4 className="text-uppercase mt-0">{t('Sign In')}</h4> */}
                    <Link to="/" className="logo logo-dark text-center">
                        <span className="logo-lg">
                            <img src={LogoDark} alt="" width="150" />
                        </span>
                    </Link>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}
                {loading && <Loader />}

                <VerticalForm<UserData>
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ email: 'suki@harshinifincop.com', password: '123456' }}
                >
                    <FormInput
                        type="email"
                        name="email"
                        label={t('User Name')}
                        placeholder={t('hello@coderthemes.com')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        containerClass={'mb-3'}
                    ></FormInput>

                    <FormInput
                        type="checkbox"
                        name="checkbox"
                        label={t('Remember me')}
                        containerClass={'mb-3'}
                        defaultChecked
                    />

                    <div className="text-center d-grid mb-3">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Log In')}
                        </Button>
                    </div>
                </VerticalForm>
            </AuthLayout>
        </>
    );
};

export default Login;
