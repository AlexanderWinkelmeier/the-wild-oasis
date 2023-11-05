import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          fontSize: '10px',
        }}
      >
        <h3>Credentials</h3>
        <p>Email: test_user@gmail.com</p>
        <p>Password: 123456789</p>
      </div>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
