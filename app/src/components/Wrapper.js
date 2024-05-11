import React from "react";

const Wrapper = ({ children, ...rest }) => {
  return (
    <div className="p-8" {...rest}>
      {children}
    </div>
  );
};

export default Wrapper;
