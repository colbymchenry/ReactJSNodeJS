import React from "react";

const InputGroupText = React.forwardRef((props, ref) => {
  console.log(props.errors)
  return (
    <div className="input-group has-validation">
      {props?.icon ? (
        <span className="input-group-text">{props?.icon}</span>
      ) : (
        ""
      )}
      <input
        ref={ref}
        className={`form-control ${
          props?.name in props?.errors ? "is-invalid" : ""
        } ${props?.className ? props.className : ""}`}
        type={props.type ? props.type : "text"}
        name={props.name}
        id={props.id}
        tabIndex={props.tabIndex}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        disabled={props.disabled || props.readOnly}
        onChange={props.onChange}
        value={props.value}
        data-cleanup={props.cleanup}
        maxlength={props?.maxlength}
        autoComplete={"off-off"}
      />
      <div class="invalid-feedback">
        {props?.name in props?.errors ? props.errors[props.name]?.types?.message : ''}
      </div>
    </div>
  );
});

export default React.memo(InputGroupText);
