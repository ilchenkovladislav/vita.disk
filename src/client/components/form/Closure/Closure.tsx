import styles from './Closure.module.scss';

type ClosureProps = {
  onClick: () => void;
};

export const Closure: React.FunctionComponent<ClosureProps> = ({ onClick }) => {
  return (
    <button className={styles.closure} onClick={onClick} type="button"></button>
  );
};
