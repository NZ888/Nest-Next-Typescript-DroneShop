"use client";
import styles from "./CategoriesBubbles.module.css"
import Image from "next/image";
import type {ICategory} from "@/types/product"

type Props = {
    categories: ICategory[];
    selectedId: string | null;
    onSelectAction: (id: string | null) => void;
};

export function CategoriesBubbles({ categories, selectedId, onSelectAction }: Props) {
    return (
        <div className={styles.categoriesBubbles}>
            <button onClick={() => onSelectAction(null)} className={styles.categoryBubble} >
                Всі
            </button>

            {categories.map((c) => (
                <button
                    key={c.id}
                    onClick={() => onSelectAction(c.id)}
                    className={styles.categoryBubble}
                    title={c.name}
                >
                    <Image src={c.image} alt={c.name} width={50} height={50} draggable={false}/>
                </button>
            ))}
        </div>
    );
}
