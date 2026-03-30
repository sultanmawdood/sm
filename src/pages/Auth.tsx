import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

interface FormData {
  email: string;
  password: string;
  name: string;
}

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success = false;
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        success = await signup(formData.email, formData.password, formData.name);
      }

      if (success) {
        navigate(from, { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6" viewBox="0 0 69 32" fill="#111">
            <path d="M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.96-3.36-1.36-2.16-.8-5.48t2.96-7.08q2-3.04 6.56-8-1.6 2.56-2.24 5.28-.64 2.56.16 4.4 1.04 2.4 3.6 2.4 2.72 0 7.6-2.24L68.56 4z"></path>
          </svg>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            {isLogin ? 'YOUR ACCOUNT FOR EVERYTHING KINGSPORTS' : 'BECOME A KINGSPORTS MEMBER'}
          </h2>
          <p className="text-secondary text-sm sm:text-base">
            {isLogin ? 'Sign in to access your account' : 'Create your KingSports profile'}
          </p>
        </div>

        <div className="bg-white">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:py-4 text-primary border border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm sm:text-base"
                  placeholder="Full Name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:py-4 text-primary border border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm sm:text-base"
                placeholder="Email address"
                required
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:py-4 text-primary border border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm sm:text-base"
                placeholder="Password"
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-secondary">Keep me signed in</span>
                </label>
                <a href="#" className="text-secondary hover:text-primary">
                  Forgot password?
                </a>
              </div>
            )}

            {!isLogin && (
              <div className="text-xs sm:text-sm text-secondary">
                <p className="mb-4">
                  By creating an account, you agree to KingSports's{' '}
                  <a href="#" className="underline hover:text-primary">Privacy Policy</a>
                  {' '}and{' '}
                  <a href="#" className="underline hover:text-primary">Terms of Use</a>.
                </p>
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full py-4 text-sm sm:text-base" disabled={isLoading}>
              {isLoading ? 'Please wait...' : isLogin ? 'SIGN IN' : 'JOIN US'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-secondary text-sm sm:text-base">
              {isLogin ? 'Not a Member?' : 'Already a Member?'}
              {' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary underline hover:text-secondary font-medium"
              >
                {isLogin ? 'Join Us' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
