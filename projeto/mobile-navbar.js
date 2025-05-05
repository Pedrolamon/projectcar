class mobileNavbar {
    constructor(mobilemenu, navList, navLinks) {
        this.mobilemenu = document.querySelector(mobilemenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeclass = "active"; 

        this.handleclick = this.handleclick.bind(this);
    }
    
  
    animatelinks() {
        this.navLinks.forEach((link) => {
         
            link.style.animation = link.style.animation 
                ? ""
                : "navlinkfade 0.5s ease forwards 0.3s"; 
        });
    }
    handleclick(event) {
        console.log("Elemento clicado:", event.target);
        if (event.target.tagName === "A") {
            return; 
        }
        console.log("Menu clicado, alternando classes");
        this.navList.classList.toggle(this.activeclass);
        this.mobilemenu.classList.toggle(this.activeclass);
        this.animatelinks();
    }

    /*
    handleclick() {
        // Corrigido o erro de digitação (activeclass)
        this.navList.classList.toggle(this.activeclass);
        this.mobilemenu.classList.toggle(this.activeclass);

        // Iterando sobre os links para adicionar/remover a classe "active" e animar
        this.navLinks.forEach(link => {
            link.classList.toggle(this.activeclass);
        });

        this.animatelinks(); // Chama a animação dos links após a alternância
    }*/

    addClickEvent() {
        this.mobilemenu.addEventListener("click", this.handleclick); 
    }

    init() { 
        if (this.mobilemenu) {
            this.addClickEvent(); 
        }
        return this;
    }
}


const mobileNavbarInstance = new mobileNavbar(
    ".mobile-menu", 
    ".nav-list",    
    ".nav-list li"  
);
mobileNavbarInstance.init(); 

