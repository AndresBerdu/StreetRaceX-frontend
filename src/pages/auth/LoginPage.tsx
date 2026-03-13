import { MdOutlineDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className="bg-primary">
      <div className="container-auth">
        <div className="bg-[url(/images/vehicle-login.jpg)] w-full bg-cover bg-center bg-no-repeat rounded-sm"></div>
        <div className="md:flex md:flex-col md:justify-center md:items-center md:mx-5 md:w-150">
          <h1 className="capitalize text-center text-slate-100 text-3xl font-light">
            welcome back
          </h1>
          <h3 className="capitalize text-center text-gray-400 mt-1">
            please enter your details to sign in,
          </h3>
          <form>
            <div className="input-auth">
              <label className="primary-label">email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="primary-input"
              />
            </div>
            <div className="input-auth">
              <label className="primary-label">password</label>
              <input
                type="password"
                placeholder="your password"
                className="primary-input"
              />
            </div>
            <div className="flex items-center justify-between mt-6">
              <div>
                <input
                  type="checkbox"
                  className="mr-2 outline-second-blue bg-transparent accent-primary-blue"
                />
                <span className="capitalize text-gray-100 text-[16px]">
                  remember me
                </span>
              </div>
              <Link
                to="/perfil"
                className="bg-linear-to-b from-button-one to-button-two rounded-xl p-3"
              >
                <span>
                  <MdOutlineDoubleArrow
                    size={20}
                    className="text-primary-blue"
                  />
                </span>
              </Link>
            </div>
            <h2 className="text-center text-slate-500 mt-4">
              don't you have account?,{" "}
              <Link
                to="/register"
                className="capitalize text-button-one underline underline-offset-6"
              >
                register here
              </Link>
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};
