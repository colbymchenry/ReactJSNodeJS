import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import InputGroupText from "../../components/InputGroupText";
import { useHistory } from "react-router-dom";

const LoginForm = (props) => {
  const { register, handleSubmit, watch, setError, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/login`,
        formData
      );

      if (response.status === 200) history.push('/home')
    } catch (err) {
      if (err?.response) {
        if (err?.response.status === 400) {
          setError(
            "username",
            { type: "focus", message: "Invalid username/password." },
            { shouldFocus: true }
          );
        }
      }
    }
  };

  useEffect(() => {}, [errors])

  let tabIndex = 1;

  return (
    <div className="container login-form">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Login</h5>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-3">
          <div className="mb-3">
            <InputGroupText
              placeholder="Username"
              name="username"
              tabIndex={tabIndex++}
              icon={"@"}
              errors={errors}
              ref={register({ required: true })}
            />
          </div>

          <div className="mb-3">
            <InputGroupText
              placeholder="Password"
              type="password"
              name="password"
              tabIndex={tabIndex++}
              errors={errors}
              ref={register({ required: true })}
            />
          </div>

          <div className="mb-3">
            <small>
              Don't have an account?{" "}
              <button
                type="button"
                className="btn-link"
                onClick={() => props.setShowRegister(true)}
              >
                Sign Up
              </button>
            </small>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            tabIndex={tabIndex++}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
