import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../../../components/ui/loading/Loading';
import styles from './Login.module.css';
import useAuthStore from '../../../store/AuthStore';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const loginUser = useAuthStore((s) => s.loginUser);
  const error = useAuthStore((s) => s.error);
  const loading = useAuthStore((s) => s.loading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(form.email, form.password);
    if (success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Welcome Back</h2>
        <p className={styles.authSubtitle}>Sign in to access your notes</p>

        {error && <div className={styles.authError} role="alert">{error}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className={styles.authBtn} disabled={loading}>
            {loading ? <Spinner /> : 'Sign In'}
          </button>
        </form>

        <p className={styles.authFooter}>
          Don't have an account? <Link to="/Signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;