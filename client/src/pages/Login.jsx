import { Link } from 'react-router-dom';
import { Logo, Formrow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <h4>Login </h4>
        <Formrow type="text" name="username" />
        <Formrow type="password" name="password" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        {/* if we want to navigate in our project we can use link */}
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
        {/* if you want to navigate to external websites u need to use href again*/}
        {/* <a href=''>hi its me</a> */}
      </form>
    </Wrapper>
  );
};
export default Login;
