import styles from "./Button.module.scss";

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
  width?: string;
  disabled?: boolean;
  kind: "primary" | "secondary" | "tertiary";
}

const Button: React.FC<Props> = ({ children, onClick, disabled, kind }) => {
  return (
    <button
      className={`${styles.button} ${styles[kind]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
