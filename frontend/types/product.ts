export interface INewProduct {
    mainImage: string;
    name: string;
    price: number;
    oldPrice?: number;
    slug: string;
    shortDesc: string;
}
export interface ICategory {
    id: number;
    name: string;
    slug: string;
    image: string;
}
export interface ISection{
    id: number;
    title: string;
    text: string,
    image?: string;
    video?: string;
    order:number
}
export interface IProduct {
    id: number;
    name: string;
    slug: string;
    price: number;
    oldPrice: number | "null" | null;
    shortDesc: string;
    mainImage: string;
    gallery: string[];
    videoUrl: string | "null" | null;
    specs: Record<string, string | number>;
    sections: ISection[];
    categories: ICategory[] | ICategory;
    createdAt: string;
    updatedAt: string;
}
export interface IFetchedProducts {
    message: string;
    status: number;
    pagination : {
        page: number;
        limit: number;
        total: number;
    };
    data: {
        products:IProduct | IProduct[];
    }
}