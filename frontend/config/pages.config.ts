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
}

export const PAGES = new PagesConfig();