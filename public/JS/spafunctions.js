// object
const app = {
    pages: [], // property to save pages in
    show: new Event('show'),
    init: function() {
        app.pages = document.querySelectorAll('.page');
        //listener for show event, calling function
        app.pages.forEach((pg)=> {
            pg.addEventListener('show', app.pageShown);
        })

        //listener for click event, calling function
        document.querySelectorAll('.nav-link').forEach((link)=>{
            link.addEventListener('click', app.nav);
        })
        // showing on which page we are in the tab (not quite working)
         history.replaceState({}, 'Home', '#home');
        // handling the "back" button
         window.addEventListener('popstate', app.poppin);
    },

    nav: function(ev){
        ev.preventDefault();
        let currentPage = ev.currentTarget.getAttribute('data-target');
         document.querySelector('.selected').classList.remove('selected');
         document.getElementById(currentPage).classList.add('selected');
    },
    pageShown: function(ev){
        console.log('Page', ev.target.id, 'just shown');
    },
     poppin: function(ev){
         console.log(location.hash, 'popstate event');
     }
}

// call the "app"
document.addEventListener('DOMContentLoaded', app.init);