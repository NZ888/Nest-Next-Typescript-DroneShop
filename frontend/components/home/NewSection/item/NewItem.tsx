import React from 'react';
import styles from "./NewItem.module.css"
import Image from "next/image";
import Link from "next/link";
import {PAGES} from "@/config/pages.config";
import GhostButton from "@/components/ui/GhostBtn/GhostButton";
interface NewItemProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  price: number;
  slug: string;
}

const NewItem: React.FC<NewItemProps> = ({ imageUrl, slug, title, subtitle, price }) => {

  return (
          <div className={styles.container}>
              <div style={{ width: "100%", height: "50%", display:"flex", justifyContent: "center", position: "relative", bottom:"170px", cursor:"default" }}>
                  <Image src={imageUrl} alt={title} width={361} height={361} />
              </div>
                  <div className={styles.textInfo}>
                      <Link className={styles.a} href={PAGES.PRODUCT(slug)}>
                      <h3>{title}</h3>
                      <p>{subtitle}</p>
                      </Link>
                  </div>
              <div className={styles.priceAndBtn}>
                  <p>from to {price}</p>
                  <Link className={styles.a} href={PAGES.PRODUCT(slug)}>
                      <GhostButton className={styles.ghostBtnModify}>
                          <p>Купити</p>
                      </GhostButton>
                  </Link>
              </div>
          </div>
  );
};

export default NewItem;
