import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import InputGroupText from "../../components/InputGroupText";
import zxcvbn from "zxcvbn";

const SignupForm = (props) => {
  const { register, handleSubmit, watch, errors, setError } = useForm();
  const watchPassword = watch("password");

  const onSubmit = async (formData) => {
    if (formData?.password !== formData?.confirm_password) {
      setError(
        "confirm_password",
        { type: "focus", message: "Passwords do not match." },
        { shouldFocus: true }
      );
      return;
    }

    const regex = /\W|_/g;

    if (formData.username.length < 4) {
      setError(
        "username",
        {
          type: "focus",
          message: "Usernames must contain at least 4 letters.",
        },
        { shouldFocus: true }
      );
    }

    if (formData.username.match(regex)) {
      setError(
        "username",
        {
          type: "focus",
          message: "Usernames cannot contain any special characters.",
        },
        { shouldFocus: true }
      );
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/signup`,
        formData
      );

      if (response.status === 200) props.setShowRegister(false);
    } catch (err) {
      if (err?.response) {
        if (err?.response.status === 400) {
          setError(
            "username",
            { type: "focus", message: "Username taken." },
            { shouldFocus: true }
          );
        }
      }
    }
  };

  const renderPasswordStrengthMeter = () => {
    const score = zxcvbn(watchPassword ? watchPassword : "").score;
    let width = 0;
    let color = "red";
    let label = "";

    if (!watchPassword) {
      width = 0;
    } else if (score > 3) {
      width = 100;
      color = "bg-success";
      label = "Strong";
    } else if (score > 2) {
      width = 50;
      color = "bg-warning";
      label = "Good";
    } else {
      width = 25;
      color = "bg-danger";
      label = "Weak";
    }

    return (
      <div className="progress">
        <div
          className={`progress-bar ${color}`}
          role="progressbar"
          style={{ width: `${width}%` }}
          aria-valuenow={width}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {label}
        </div>
      </div>
    );
  };

  useEffect(() => {}, [errors, watchPassword]);

  let tabIndex = 1;

  return (
    <div className="container login-form">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Register</h5>
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
            <br />
            <label>Password Strength</label>
            {renderPasswordStrengthMeter()}
          </div>

          <div className="mb-3">
            <InputGroupText
              placeholder="Confirm Password"
              type="password"
              name="confirm_password"
              tabIndex={tabIndex++}
              errors={errors}
              ref={register({ required: true })}
            />
          </div>

          <div className="mb-3">
            <small>
              Already have an account?{" "}
              <button
                type="button"
                className="btn-link"
                onClick={() => props.setShowRegister(false)}
              >
                Login
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

export default SignupForm;
