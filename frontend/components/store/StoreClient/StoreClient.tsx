"use client";

import { useMemo, useState } from "react";
import { IProduct } from "@/types/product";
import { MainCatalogComponent } from "@/components/store/Catalog/MainCatalogComponent";
import { CategoriesBubbles } from "@/components/store/Categories/CategoriesBubbles";
import {toArray} from "@/lib/helpers";
import type {ICategory} from "@/types/product"

type Props = {
    products: IProduct[];
    categories: ICategory[];
};

export default function StoreClient({ products, categories }: Props) {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const filtered = useMemo(() => {
        if (!selectedCategoryId) return products;
        return products.filter((p) =>
            toArray(p.categories).some((c) => c.id === selectedCategoryId)
        );
    }, [products, selectedCategoryId]);
    console.log(products);
    return (
        <>
            <CategoriesBubbles
                categories={categories}
                selectedId={selectedCategoryId}
                onSelectAction={setSelectedCategoryId}
            />
            <MainCatalogComponent products={filtered} />
        </>
    );
}
