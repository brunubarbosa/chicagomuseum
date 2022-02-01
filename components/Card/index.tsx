import styles from "./Card.module.scss";
import Image from "next/image";
interface CardProps {
  image: string;
  title?: string;
  description?: string;
}

export const Card = ({ image, title, description }: CardProps) => {
  return (
    <div className={styles.wrapper}>
      <Image width={300} height={300} src={image} alt={title} />
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Card;
