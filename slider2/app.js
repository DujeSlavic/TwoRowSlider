var prev = document.getElementById('prev'),
    next = document.getElementById('next');
//stavljaj slike oba reda posebno u itemse
let items1 = document.querySelector(".slides-1");
let items2 = document.querySelector(".slides-2");
//pomak za .slides u CSS... zadnja klonirana slika u nizu, tj. originalna prva
var zadnji = document.querySelector('.slides-1 #slika1');
var zadnji2 = document.querySelector('.slides-2 #slika1');
document.querySelector('.slides-1').style.left = -9200 + zadnji.clientWidth + 'px';
document.querySelector('.slides-2').style.left = -9400 + zadnji2.clientWidth + 'px';

//funkcija uklanjanja 1 slike i trimanje #text
let trimText = (items, direction) => {
  if(direction == 1){
    while(items.firstChild.nodeName == '#text'){
      items.removeChild(items.firstChild);
    }
    items.removeChild(items.firstChild);
  }
  else{
    while(items.lastChild.nodeName == '#text'){
      items.removeChild(items.lastChild);
    }
    items.removeChild(items.lastChild);
  }
}
//var za broj slike
let k = 9;

//pomocna funkcija
let firstFunc = (items) => {
    let children = [...items.childNodes];
    children.forEach(node=>{
      if(node.nodeName === '#text') node.remove();
    });
    
//kloniranje prve i zadnje slike    
var clone1 = items.firstChild.cloneNode(true),
    clone2 = items.lastChild.cloneNode(true);
  
    items.appendChild(clone1);
    items.insertBefore(clone2, items.firstChild);
}

firstFunc(items1);
firstFunc(items2);

//glavna funkcije-----------------------------------------------------
function f(items, dir, classname){

  //klik na ikone kretanja
  if (dir === 1) shiftSlide(1);
  else shiftSlide(-1);
  
 //POMAK funkcija *****************************************************************************
  function shiftSlide(dir){
    items.classList.add('shifting');
    //pocetna pozicija ruba
      posInitial = items.offsetLeft;
      
      //DESNO
      if(dir == 1){
        //broj slike 
        k = k % 9 + 1;
        //nova slika u fokusu
        let fokus = document.querySelector(`.${classname} #slika`+ String(k));

        //pomak za duljinu slike u fokusu
        var pomak = (posInitial - fokus.clientWidth);
        items.style.left = pomak +'px';

        //pauza za animaciju tranzicije
        setTimeout(function(){  
            //blokada pomaka
            items.classList.add('notransition');
              
            //broj slike 
            k1 = k % 9 + 1;
            //nova slika u fokusu
            fokus = document.querySelector(`.${classname} #slika`+ String(k1));
        
            //kloniraj sliku u fokusu i dodaj na kraj
            items.appendChild(fokus.cloneNode(true));
            
            trimText(items, dir);
            //pomak za .slides u CSS
            items.style.left = pomak + items.lastChild.clientWidth +'px';

            //skini blokadu
            items.offsetHeight;
            items.classList.remove('notransition');
        }, 100);        
      }
      
      //LIJEVO
        else if(dir == - 1){
        
        //fokuss
        k = (k % 9 == 0) ? (9) : (k % 9);
        fokus = document.querySelector(`.${classname} #slika`+ String(k));
        
        //pomak za fokus
        var pomak = (posInitial + fokus.clientWidth);
        items.style.left = pomak +'px';
        k = (k == 1) ? (9) : (k - 1);
        
        //pauza za animaciju tranzicije
        setTimeout(function(){  
          //blokada pomaka
          items.classList.add('notransition');
          //za sliku prije 
                   
          items.style.left = (pomak - items.lastChild.clientWidth) +'px';
          trimText(items, dir);
          //items.style.left = -9200 + items.lastChild.clientWidth;
          //kloniraj sliku na pocetak
          cloneFokus2 = document.querySelector(`.${classname} #slika`+ String(k)).cloneNode(true);
          items.insertBefore(cloneFokus2, items.firstChild);
          //pomak za .slides u CSS
          
          //skini blokadu
          items.offsetHeight;
          items.classList.remove('notransition');
        }, 100);
        
      }  
  }
}

prev.addEventListener("click", () => {
  f(items1, -1, "slides-1");
  k += 1;
  if (k === 0) k = 9;
  
  f(items2, -1, "slides-2");
  
})
next.addEventListener("click", () => {
  f(items1, 1, "slides-1");
  k -= 1;
  if (k === 0) k = 9;
  f(items2, 1, "slides-2");
})

