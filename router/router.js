class Router{
    constructor(){
        this.routes={};
        this.currentUrl='';
        window.addEventListener('load',this.refresh,false);
        window.addEventListener('hashchange',this.refresh,false);
    }

    route(path,callback){
        this.routes[path]=callback || function(){};
    }

    refresh(){
        this.currentUrl = location.hash.slice(1) || '/';
        this.routes[this.currentUrl]();
    }
}