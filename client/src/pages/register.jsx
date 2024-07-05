import { Link } from 'react-router-dom';
import { Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Formrow } from '../components';
const register = () => {
  return (
    <Wrapper>
      <form>
        <h4>Register</h4>
        <Formrow type="text" name="name" />
        <Formrow type="text" name="lastName" labelText="last name" />
        <Formrow type="text" name="username" />

        <Formrow type="password" name="password" />

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default register;
