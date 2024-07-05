import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';
const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <img src={img} alt="not found" />
        <h3>ohh! page not found</h3>
        <p>we cant seem to find the page you are looking for </p>
        <Link to="/dashboard">back home</Link>
      </Wrapper>
    );
  }
  return (
    <div>
      <h3>something went wrong</h3>
    </div>
  );
};
export default Error;
