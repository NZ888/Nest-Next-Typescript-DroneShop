import {API} from "@/config/api";
import {handleResponse} from "@/lib/helpers";
import { type IProduct} from "@/types/product"
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import IntroProductSection from "@/components/product/IntroProductSection/IntroProductSection";
export default async function ProductPage({slug}: {slug: string}) {
    const res = await fetch(API.routes.products.getProduct(slug), {
        method: "GET",
        next: {revalidate: 60}
    });
    const product: IProduct = await handleResponse(res)

    console.log(product);

    return (
        <>
            <Header/>
            <IntroProductSection slug={product.slug} name={product.name} price={product.price} oldPrice={product.oldPrice} mainImage={product.mainImage} shortDesc={product.shortDesc} />
            <Footer/>
        </>
    )
}