import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Caption, CustomNavLink, PrimaryButton, Title , commonClassNameOfInput} from "../components/shared/Design";
import { setUser } from "../store/authSlice";
export const Login = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = location;

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(setUser(
      {
        name: "Test",
        email: "Test",
        isAdmin: e.target[2].checked
      }
    ));
    navigate(location.state?.from || '/');
  }

  return (
    <>
      <section className="regsiter pt-16 relative">
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute top-2/3"></div>
        {pathname === "/register" ?
          <form className="bg-white shadow-s3 w-1/3 m-auto my-16 p-8 rounded-xl">
          <div className="text-center text-black">
            <Title level={5}>Sign Up</Title>
          </div>
          <div className="py-5">
            <Caption className="mb-2">Username *</Caption>
            <input type="text" name="name" className={commonClassNameOfInput} placeholder="First Name" required />
          </div>
          <div className="py-5">
            <Caption className="mb-2">Enter Your Email *</Caption>
            <input type="email" name="email" className={commonClassNameOfInput} placeholder="Enter Your Email" required />
          </div>
          <div>
            <Caption className="mb-2">Password *</Caption>
            <input type="password" name="password" className={commonClassNameOfInput} placeholder="Enter Your Password" required />
          </div>
          <div>
            <Caption className="mb-2">Confirm Password *</Caption>
            <input type="password" name="confirmPassword" className={commonClassNameOfInput} placeholder="Confirm password" />
          </div>
          {/* <div className="flex items-center gap-2 py-4">
            <input type="checkbox" />
            <Caption>I agree to the Terms & Policy</Caption>
          </div> */}
          <PrimaryButton className="w-full rounded-none my-5">CREATE ACCOUNT</PrimaryButton>
          <p className="mt-2 text-lg text-black">
              Do you already have an account? <CustomNavLink href="/login">Log In Here</CustomNavLink>
            </p>
        </form> :
        <form className="bg-white shadow-s3 w-1/3 m-auto my-16 p-8 rounded-xl" onSubmit={loginHandler}>
          <div className="text-center text-black">
            <Title level={5}>Login</Title>
          </div>
          <div className="py-5 mt-8">
            <Caption className="mb-2">Enter Your Email *</Caption>
            <input type="email" name="email" className={commonClassNameOfInput} placeholder="Enter Your Email" required />
          </div>
          <div>
            <Caption className="mb-2">Password *</Caption>
            <input type="password" name="password" className={commonClassNameOfInput} placeholder="Enter Your Password" required />
          </div>
          <div>
            <Caption className="mb-2">Admin</Caption>
            <input type="checkbox" name="admin" className={commonClassNameOfInput} />
          </div>
          {/* <div className="flex items-center gap-2 py-4">
            <input type="checkbox" />
            <Caption>I agree to the Terms & Policy</Caption>
          </div> */}
          <PrimaryButton type="submit" className="w-full rounded-none my-5">LOGIN</PrimaryButton>
          <p className="mt-2 text-lg text-black">
              Do you already have an account? <CustomNavLink href="/register">Signup Here</CustomNavLink>
            </p>
        </form>}
      </section>
    </>
  );
};
