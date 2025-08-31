import {ButtonStyles, type ButtonProps} from "../constants/constant";

export const ButtonComponent = ({ handleClick, styleType, disabled, children}: ButtonProps) => {

  const handleButtonClick = () => {
    if (handleClick) {
      handleClick();
    }
  }

  return (
    <button
          className={ButtonStyles[disabled ? "disabled" : styleType]}
          disabled={disabled}
          onClick={handleButtonClick}
        >
            {children}
        </button>
  );
};
