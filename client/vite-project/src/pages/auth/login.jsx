import { loginForm } from "@/config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { toast } from "sonner";
function AuthLogin() {
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data.payload.success) {
        toast(data.payload.message);
      } else toast(data.payload.message);
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="items-center">
        <h1 className="text-4xl font-bold ">Sign in to your account</h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="ml-2 text-blue-400 font-semibold hover:underline"
            to="/auth/register"
          >
            Create New Account
          </Link>
        </p>
      </div>
      <CommonForm
        formData={formData}
        setFormData={setFormData}
        buttonText={"Sign In"}
        onSubmit={onSubmit}
        formControls={loginForm}
      />
    </div>
  );
}

export default AuthLogin;
