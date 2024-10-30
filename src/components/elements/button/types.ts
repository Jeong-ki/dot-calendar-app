export interface IButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  width?: number;
  text?: string;
}
