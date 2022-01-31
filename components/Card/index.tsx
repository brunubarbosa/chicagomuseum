import styles from "./Card.module.scss";
import Image from "next/image";
import defaultImage from "../../default-image.jpg";
interface CardProps {
  image: string;
  title?: string;
  description?: string;
}

export const Card = ({ image, title, description }: CardProps) => {
  return (
    <div className={styles.wrapper}>
      <Image
        width={300}
        height={300}
        src={image || defaultImage}
        alt={"TODO"}
      />
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Card;