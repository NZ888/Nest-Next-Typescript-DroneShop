class PagesConfig {
    HOME(){
        return "/";
    }
    STORE(){
        return "/store";
    }
    ABOUT(){
        return "/about";
    }
    CONTACTS(){
        return "/contacts";
    }
    DASHBOARD(uuid: string){
        return `/dashboard/${uuid}`;
    }
    PRODUCT(slug: string){
        return `/product/${slug}`;
    }
}

export const PAGES = new PagesConfig();