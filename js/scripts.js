/*!
* Start Bootstrap - Shop Homepage v5.0.4 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// Desenvolvido por Thyagolu / TyluWeb



async function fetchData() {
    const response = await fetch('data/data5.json');
    const news = await response.json();
    return news;
    
}

function GenerateAt(title,description,thumbnail,articlesUrl,publishedAt,hash){

let date = new Date(publishedAt);  
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; 
let publishedAtDate = date.toLocaleDateString('pt-BR', options);
let btnSaveArr = getSave();
let btnSave = 'btn btn-outline-dark mt-auto';
let btnSaveText = '<i class="bi-save me-1"></i>Salvar</a>';

for (let index = 0; index < btnSaveArr.length; index++) {
  
   if( btnSaveArr[index] == hash){
    btnSave = 'btn btn-outline-success mt-auto';
    btnSaveText = '<i class="bi-archive me-1"></i>Salvo';
   }
    
}

let card = 
'<!-- news card-->'+
'<div class="col mb-5" >'+
   ' <div class="card h-100">'+
       ' <!-- News image-->'+
       '<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">'+publishedAtDate+'</div>'+
        '<img class="card-img-top" src="'+thumbnail+'" width="450px" height="300px" alt="..." />'+
       ' <!-- News details-->'+
        '<div class="card-body p-4">'+
            '<div class="text-center">'+
               ' <!-- News title-->'+
               ' <h5 class="fw-bolder">'+title+'</h5>'+
              
                '<!-- News description-->'+
                '<p>'+description+'</p>'+
           ' </div>'+
        '</div>'+
        '<!-- News actions-->'+
        '<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">'+
            '<div class="text-center">'+
                '<a class="'+btnSave+'" style="margin:10px 0px" hash="'+hash+'" onclick="save(this)">'+btnSaveText+'</a>'+
                '<a class="btn btn-outline-dark mt-auto" style="margin:10px 10px" href="'+articlesUrl+'" target="_blank"> <i class="bi-globe me-1"></i>Acessar</a>'+
            '</div>'+
        '</div>'+
        
    '</div>'+
'</div>'+
'<!-- end news card-->';

return card;

}

function updateCount(action,value){

    let count = document.getElementById('count');
   
    if(action == "add"){

        count.innerHTML = parseInt(count.innerHTML) + value;

    }
    else if(action == "remove"){
    
        count.innerHTML = parseInt(count.innerHTML) - value;

    }else{
      
        count.innerHTML = parseInt(0); 

    }
 
   
}
 
function getSave(){

    let arr = [...new Set(JSON.parse(localStorage.getItem('save_news')))];
    
    return arr;
}

function save(element){

    let hash = element.getAttribute("hash");
    let arr = [];
    arr = getSave();
    let newArr =[];
      
    if(element.getAttribute("class","btn btn-outline-dark mt-auto") &&  element.getAttribute("class","btn btn-outline-dark mt-auto") != "btn btn-outline-success mt-auto"){
       
        element.setAttribute("class","btn btn-outline-success mt-auto");
        element.innerHTML = '';
        element.innerHTML = '<i class="bi-archive me-1"></i>Salvo';
        
                    if(arr){

                        if(arr.length > 0){
                            for (let index = 0; index < arr.length; index++) {
                            
                                newArr.push(arr[index]);

                            }
                        }

                    newArr.push(hash);
                    localStorage.setItem('save_news', JSON.stringify(newArr));
                    updateCount("add",1);

                    }else{

                    localStorage.setItem('save_news', JSON.stringify([hash]));
                    updateCount("add",1);
                    }
                    

    }else{
    
        element.setAttribute("class","btn btn-outline-dark mt-auto");
        element.innerHTML = '';
        element.innerHTML = '<i class="bi-save me-1"></i>Salvar';
        let cleanArr = [];
        
        if(arr.length > 0){
            for (let index = 0; index < arr.length; index++) {
                
                if(arr[index] == hash){
                //ignore
                }else{
                cleanArr.push(arr[index]);
                }
                
            }
        }

        localStorage.setItem('save_news', JSON.stringify(cleanArr));
        updateCount("remove",1)
        
    }

}

function listItems(items, currentPage, limitItems){  
    let result = [];
    let totalPage = Math.ceil( items.length / limitItems );
    let count = ( currentPage * limitItems ) - limitItems;
    let delimiter = count + limitItems;
    
    if(currentPage <= totalPage){ 
        for(let i=count; i<delimiter; i++){   
             if(items[i] != null){
                  result.push(items[i]); 

                }count++; }}
                
    return result; 

};

function getPageList(totalPages, page, maxLength) {
    if (maxLength < 5) throw "maxLength must be at least 5";

    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start); 
    }

    let sideWidth = maxLength < 9 ? 1 : 2;
    let leftWidth = (maxLength - sideWidth*2 - 3) >> 1;
    let rightWidth = (maxLength - sideWidth*2 - 2) >> 1;
    if (totalPages <= maxLength) {
        // no breaks in list
        return range(1, totalPages);
    }
    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        // no break on left of page
        return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    }
    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        // no break on right of page
        return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }
    // Breaks on both sides
    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth),0, range(totalPages - sideWidth + 1, totalPages));
}
       
function paginationClick(element){

    let currentPage = parseInt(element.getAttribute("next"));
    let totalPage = parseInt(element.getAttribute("totalPage"));
    let location = element.parentNode.getAttribute("location");
    let active = element.parentNode.getAttribute("class","active");

    if(currentPage <= totalPage  && active != 'page-item active' && location==='home'){
        news(currentPage);
    }
    else if(currentPage <= totalPage  && active != 'page-item active' && location==='save'){
        showSave(currentPage);
    }
    else{
        return false;
    } 

}

function pagination(news,currentPage,limitItems,location){

    let totalPage = Math.ceil( news.length / limitItems );
    let pagination = document.getElementById('pagination');
    let ArraypageList =getPageList(news.length, currentPage, limitItems);
   
    pagination.innerHTML = "";

    if(currentPage >1){
        pagination.innerHTML += '<li class="page-item" location="'+location+'"> <a id="prev_link" class="page-link" totalPage="'+totalPage+'"  next="'+(currentPage-1)+'" onclick="paginationClick(this)" tabindex="-1"><strong><</strong></a></li>';
    }else{
        pagination.innerHTML += '<li class="page-item disabled" location="'+location+'"> <a class="page-link" href="#" tabindex="-1"><strong><</strong></a></li>';
    }

    ArraypageList.forEach( item => {
        
        if(item === currentPage){
            pagination.innerHTML += '<li class="page-item active" location="'+location+'"><a class="page-link " totalPage="'+totalPage+'" next="'+(item)+'" onclick="paginationClick(this)" >'+(item)+'</a></li>';
        }else if(item > totalPage){
            return false;
        }
        else{
            pagination.innerHTML += '<li class="page-item '+(item ? currentPage : "disabled")+'"  location="'+location+'"><a class="page-link " totalPage="'+totalPage+'" next="'+(item)+'" onclick="paginationClick(this)" >'+(item || "...")+'</a></li>';
        }

        });

        if(currentPage < totalPage){
            pagination.innerHTML += '<li class="page-item" location="'+location+'"> <a id="next_link" class="page-link" totalPage="'+totalPage+'"  next="'+(currentPage+1)+'" onclick="paginationClick(this)"><strong>></strong></a></li>';
        }else{
            pagination.innerHTML += '<li class="page-item disabled" location="'+location+'"> <a class="page-link" href="#"><strong>></strong></a></li>';
        }

}    

function showSave(currentPage){

    fetchData().then(news => {
        let newsCard = document.getElementById('news-card');
        let arr = getSave();
        let newArr = [];
        
        for (let index = 0; index < arr.length; index++) {
            newArr.push(result = news.articles.find( url => url.url === atob(arr[index]) )); 
        }
    
        if(!currentPage) {
            currentPage = 1;
        }
        
        if(newArr.length >0){

            newsCard.innerHTML = '<div class="loading" width="350px"><br><br><br><br></div>';
            const limitItems = 7;
            let articles = listItems(newArr, currentPage, limitItems);
            pagination(newArr,currentPage,limitItems,'save');
            newsCard.innerHTML = "";
        
            for (let index = 0; index < articles.length; index++) {
            
            let title = articles[index].title;
            let description = articles[index].description
            let thumbnail =  articles[index].urlToImage
            let articlesUrl = articles[index].url;
            let publishedAt = articles[index].publishedAt;
            let hash = btoa(articlesUrl);
    
            newsCard.innerHTML += GenerateAt(title,description,thumbnail,articlesUrl,publishedAt,hash);
            document.getElementById('header').setAttribute("class","bg-success py-5");
            document.getElementById('count').setAttribute("class","badge bg-success text-white ms-1 rounded-pill");
            
            }

        }else{
            return false;
        }
    
    });
  
}

function news(currentPage){

    fetchData().then(news => {

        let newsCard = document.getElementById('news-card');
        newsCard.innerHTML = '<div class="loading" width="350px"><br><br><br><br></div>';
    
        if(!currentPage) {   
            currentPage = 1;
        }
       
        const limitItems = 7;
        let articles = listItems(news.articles, currentPage, limitItems);
        

        document.getElementById("divCount").addEventListener("click", function(e) {
            
            showSave(1);
    
        });
       
        pagination(news.articles,currentPage,limitItems,'home');
        newsCard.innerHTML = "";
    
        for (let index = 0; index < articles.length; index++) {
        
        let title = articles[index].title;
        let description = articles[index].description
        let thumbnail =  articles[index].urlToImage
        let articlesUrl = articles[index].url;
        let publishedAt = articles[index].publishedAt;
        let hash = btoa(articlesUrl);
    
        newsCard.innerHTML += GenerateAt(title,description,thumbnail,articlesUrl,publishedAt,hash);
        
            
        }
        updateCount("",getSave().length);
        updateCount("add",getSave().length);
    
      });
   
}

news();