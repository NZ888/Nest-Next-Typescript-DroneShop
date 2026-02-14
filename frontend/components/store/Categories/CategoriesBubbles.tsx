"use client";
import styles from "./CategoriesBubbles.module.css"
type Category = { id: string; name: string; image?: string };

type Props = {
    categories: Category[];
    selectedId: string | null;
    onSelect: (id: string | null) => void;
};

export function CategoriesBubbles({ categories, selectedId, onSelect }: Props) {
    return (
        <div className={styles.categoriesBubbles}>
            <button onClick={() => onSelect(null)} className={styles.categoryBubble} >
                Всі
            </button>

            {categories.map((c) => (
                <button
                    key={c.id}
                    onClick={() => onSelect(c.id)}
                    className={styles.categoryBubble}
                    title={c.name}
                >
                    {c.name.slice(0, 2)}
                </button>
            ))}
        </div>
    );
}
