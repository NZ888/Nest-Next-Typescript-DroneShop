import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import {API} from "@/config/api";
import {handleResponse} from "@/lib/helpers";
import {ICategory, IFetchedProducts, IProduct} from "@/types/product"
import StoreClient from "@/components/store/StoreClient/StoreClient";
export default async function StorePage(){

    const res: Response = await fetch(API.routes.products.allProducts(1, 16), {
        next: {revalidate: 3600}
    })
    const fetchedProducts: IFetchedProducts = await handleResponse(res)
    const {data} = fetchedProducts
    const products: IProduct[] = Array.isArray(data.products) ? data.products : [data.products];

    const categoriesMap = new Map<
        string,
        { id: string; name: string; image: string, slug: string }
    >();

    for (const p of products) {
        const categories: ICategory[] = Array.isArray(p.categories)
            ? p.categories
            : p.categories
                ? [p.categories]
                : [];

        for (const c of categories) {
            categoriesMap.set(c.id, {
                id: c.id,
                name: c.name,
                image: c.image,
                slug: c.slug
            });
        }
    }

    const categories: ICategory[] = Array.from(categoriesMap.values());
    console.log(categories);
    return (
        <>
            <Header/>
            <StoreClient products={products} categories={categories}/>
            <Footer/>
        </>
    )
}