interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  label,
  secondary,
}) => {
  if (secondary) {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className="text-base bg-white border border-dark-blue text-dark-blue py-2 w-full  rounded-lg text-[14px]"
      >
        {label}
      </button>
    );
  }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="text-base bg-dark-blue py-2 w-full text-white rounded-lg text-[14px]"
    >
      {label}
    </button>
  );
};

export default Button;
