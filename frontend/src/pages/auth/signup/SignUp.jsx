import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../../../components/ui/loading/Loading';
import styles from './SignUp.module.css';
import useAuthStore from '../../../store/AuthStore';

const MIN_PASSWORD_LENGTH = 6;

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();

  const signUp = useAuthStore((s) => s.signUp);
  const error = useAuthStore((s) => s.error);
  const loading = useAuthStore((s) => s.loading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (form.password.length < MIN_PASSWORD_LENGTH) {
      setLocalError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      return;
    }

    await signUp(form.name, form.email, form.password);
    
    // Check if the store now has a token or is free of errors
    const { token, error: authError } = useAuthStore.getState();
    if (token && !authError) {
      navigate('/', { replace: true });
    }
  };

  const displayError = localError || error;

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Create Account</h2>
        <p className={styles.authSubtitle}>Start taking notes effortlessly</p>

        {displayError && (
          <div className={styles.authError} role="alert">{displayError}</div>
        )}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="johndoe"
              autoComplete="username"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

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
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className={styles.authBtn} disabled={loading}>
            {loading ? <Spinner /> : 'Create Account'}
          </button>
        </form>

        <p className={styles.authFooter}>
          Already have an account? <Link to="/Login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;