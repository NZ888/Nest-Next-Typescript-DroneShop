import React from 'react';
import styles from './NotFound.module.css'
import notFoundImage from "../../public/images/404/404.jpg"
import Image from "next/image";
type NotFoundProps = object

const NotFound: React.FC<NotFoundProps> = ({  }) => {
  return (
    <div className={styles.container}>
        <Image src={notFoundImage} alt="not found image" priority draggable={false} onDragStart={(e)=>{e.preventDefault();}}/>
    </div>
  );
};

export default NotFound;
