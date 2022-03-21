import React from "react";
import clsx from "clsx";

const CustomIcon = (props) => {
  const {
    src,
    color,
    hoverColor,
    size = "16",
    className,
    cursor = "default",
    ...rest
  } = props;

  return (
    <>
      {!!color ? (
        <>
          <style jsx>{`
            .iconStyle {
              cursor: ${cursor};
              width: ${size}px;
              height: ${size}px;
              background: ${color};
              mask-image: url(${src});
              // mask-box-image: url(${src});
              // webkit-mask-box-image: url(${src});
              mask-repeat: no-repeat;
              webkit-mask-repeat: no-repeat;
              mask-size: contain;
              webkit-mask-size: contain;
              object-fit: cover;
              display: inline-block;
              transition: 0.2s ease;
            }
            .iconStyle:hover {
              background: ${hoverColor};
            }
          `}</style>
          <i className={clsx("iconStyle", className)} {...rest} />
        </>
      ) : (
        <img
          src={src}
          width={size}
          height={size}
          className={className}
          {...rest}
        />
      )}
    </>
  );
};

export default CustomIcon;
