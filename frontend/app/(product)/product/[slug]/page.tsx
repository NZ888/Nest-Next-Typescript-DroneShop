import ProductPage from "@/components/product/ProductPage";

interface Props {
    params: {
        slug: string;
    }
}

export default async function Product({params}: Props){
    const {slug} = await params;
    return (
        <ProductPage slug={slug}/>
    )
}