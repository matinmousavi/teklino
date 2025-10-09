import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import useAPI from '../../../hooks/useAPI';
import useNotification from '../../../hooks/useNotification';
import { useAuth } from '../../../context/AuthContext';
import styles from './OtpLoginPage.module.css';

const OtpLoginPage = () => {
  const [step, setStep] = useState('request');
  const [mobile, setMobile] = useState('');
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();
  const api = useAPI();
  const otpApi = useAPI();
  const { openNotification } = useNotification();
  const { setUser } = useAuth();
  const otpInputRef = useRef(null);
  const [verifyForm] = Form.useForm();

  useEffect(() => {
    let timer;
    if (step === 'verify' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  useEffect(() => {
    if (step === 'verify' && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [step]);

  const onRequestOtp = async (values) => {
    try {
      await api.post('/users/request-otp', values);
      setMobile(values.mobile);
      setStep('verify');
      setCountdown(30);
      verifyForm.setFieldsValue({ otp: '' });

      if (otpInputRef.current) {
        otpInputRef.current.focus();
      }

      openNotification('success', 'کد یکبار مصرف با موفقیت ارسال شد.');
    } catch (error) {
      openNotification('error', error?.error?.message || 'خطایی رخ داد.');
    }
  };

  const onVerifyOtp = async (values) => {
    try {
      const loggedInUser = await otpApi.post('/users/verify-otp', { mobile, otp: values.otp });
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      navigate('/');
    } catch (error) {
      openNotification('error', error?.error?.message || 'خطایی رخ داد.');
    }
  };

  return (
    <div className={styles['page-container']}>
      <div className={styles['form-container']}>
        {step === 'request' ? (
          <>
            <h1 className={styles['form-container__title']}>ورود با کد یکبار مصرف</h1>
            <Form name="request_otp" onFinish={onRequestOtp} layout="vertical">
              <Form.Item label="شماره موبایل" name="mobile" rules={[{ required: true, message: 'لطفا شماره موبایل را وارد کنید!' }]}>
                <Input placeholder="مثال: 09123456789" size="large" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" loading={api.isLoading}>
                  ارسال کد
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <h1 className={styles['form-container__title']}>تایید کد</h1>
            <p className={styles['form-container__subtitle']}>کد ۴ رقمی ارسال شده به شماره {mobile} را وارد کنید.</p>
            <Form form={verifyForm} name="verify_otp" onFinish={onVerifyOtp} layout="vertical">
              <Form.Item
                label="کد تایید"
                name="otp"
                rules={[{ required: true, message: 'لطفا کد تایید را وارد کنید!' }]}
                className={styles['otp-item']}
              >
                <Input.OTP ref={otpInputRef} length={4} size="large" style={{ direction: 'ltr' }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" loading={otpApi.isLoading}>
                  ورود
                </Button>
              </Form.Item>
            </Form>
            <div className={styles['resend-container']}>
              {countdown > 0 ? (
                <span>ارسال مجدد کد تا {countdown} ثانیه دیگر</span>
              ) : (
                <Button type="link" onClick={() => onRequestOtp({ mobile })} loading={api.isLoading}>
                  ارسال مجدد کد
                </Button>
              )}
            </div>
          </>
        )}
        <div className={styles['form-container__footer']}>
          <Link to="/login">ورود با رمز عبور</Link>
        </div>
      </div>
    </div>
  );
};

export default OtpLoginPage;