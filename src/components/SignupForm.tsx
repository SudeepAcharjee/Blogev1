import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { signup } from 'api/firebase';

import styles from './SignupForm.module.css';

const singupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required.'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required.'),
  retypePassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password does not match.')
    .required('Password confirmation is required.')
    .min(8, 'Password must be at least 8 characters'),
});

export default function SignupForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    //@ts-ignore
    resolver: yupResolver(singupSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const user = await signup(data.email, data.password);
      if (user) {
        toast(`🎉 Welcome to the Blog`, { theme: 'light' });
        navigate('/');
      }
    } catch (e: any) {
      toast.error(e.message);
      console.error(e.message);
    }
  });

  const password = watch('password');
  const confirmPassword = watch('retypePassword');

  useEffect(() => {
    if (!confirmPassword?.length) {
      return;
    }
    trigger('retypePassword');
  }, [confirmPassword, password, trigger]);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h1 className={styles.title}>Sign up</h1>
      <div className={styles.block}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          required
          {...register('email', { required: true })}
        />
        {errors?.email?.message && (
          <p className={styles.error}>{String(errors.email.message)}</p>
        )}
      </div>
      <div className={styles.block}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          required
          {...register('password', { required: true })}
        />
        {errors?.password?.message && (
          <p className={styles.error}>{String(errors.password.message)}</p>
        )}
      </div>
      <div className={styles.block}>
        <label htmlFor="retypePassword">Retype Password</label>
        <input
          type="password"
          id="retypePassword"
          required
          {...register('retypePassword', { required: true })}
        />
        {errors?.retypePassword?.message && (
          <p className={styles.error}>
            {String(errors.retypePassword.message)}
          </p>
        )}
      </div>
      <div className={styles.block}>
        <p className={styles.message}>
          Already have an account?{' '}
          <Link className={styles.link} to="/login">
            Login
          </Link>
        </p>
      </div>
      <button className={styles.LoginBtn}>Sign up</button>
    </form>
  );
}
