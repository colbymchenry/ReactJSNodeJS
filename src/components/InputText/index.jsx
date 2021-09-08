import React from "react";

const InputText = React.forwardRef((props, ref) => {
  return (
    <>
      <input
        ref={ref}
        className={props?.className ? props.className : "form-control"}
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
    </>
  );
});

export default React.memo(InputText);
