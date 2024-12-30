import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { login } from 'api/firebase';

import styles from './LoginForm.module.css';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required.'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required.'),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //@ts-ignore
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const user = await login(data.email, data.password);
      if (user) {
        toast.success('LOGIN SUCCESSFUL', { hideProgressBar: true });
        navigate('/');
      }
    } catch (e: any) {
      toast.error(e.message);
      console.error(e.message);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      action="/post"
      method="POST"
      className={styles.form}
    >
      <h1 className={styles.title}>Login</h1>
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
        <p className={styles.message}>
          Don't you have an account?
          <Link className={styles.link} to="/signup">
            Sign up
          </Link>
        </p>
      </div>
      <button className={styles.LoginBtn}>Login</button>
    </form>
  );
}
