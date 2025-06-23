import CommonForm from "@/components/common/form";
import { registrationForm } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const initialState = {
  userName: "",
  email: "",
  password: "",
};
function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data.payload.success) {
        toast(data.payload.message);
        navigate("/auth/login");
      } else {
        toast(data.payload.message);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="items-center">
        <h1 className="text-4xl font-bold ">Create new account</h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="ml-2 text-blue-400 font-semibold hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formData={formData}
        setFormData={setFormData}
        buttonText={"Sign Up"}
        onSubmit={onSubmit}
        formControls={registrationForm}
      />
    </div>
  );
}

export default AuthRegister;
