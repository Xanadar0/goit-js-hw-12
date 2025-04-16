import{a as q,S as E,i}from"./assets/vendor-bbAy8n95.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const P="49462102-62c5bd388bb9085ad52d727ed",x="https://pixabay.com/api/";async function g(r,e){return(await q.get(x,{params:{key:P,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})).data}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),p=document.querySelector(".load-more-btn"),b=r=>{const e=r.map(({webformatURL:s,largeImageURL:n,tags:t,likes:o,views:a,comments:v,downloads:S})=>`<li class="gallery-item">
      <a class="gallery-link" href="${n}">
        <img
          class="gallery-img"
          src="${s}"
          alt="${t}"
          loading="lazy"
        />
      </a>
      <ul class="gallery-info">
        <li class="gallery-info-item">
          <p class="gallery-info-title">Likes</p>
          <p class="gallery-info-text">${o}</p>
        </li>
        <li class="gallery-info-item">
          <p class="gallery-info-title">Views</p>
          <p class="gallery-info-text">${a}</p>
        </li>
        <li class="gallery-info-item">
          <p class="gallery-info-title">Comments</p>
          <p class="gallery-info-text">${v}</p>
        </li>
        <li class="gallery-info-item">
          <p class="gallery-info-title">Downloads</p>
          <p class="gallery-info-text">${S}</p>
        </li>
      </ul>
    </li>`).join("");f.insertAdjacentHTML("beforeend",e),B.refresh()},B=new E(".gallery a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt",overlayOpacity:1});function M(){f.innerHTML=""}function L(){m.classList.remove("is-hidden")}function w(){m.classList.add("is-hidden")}function $(){p.classList.remove("is-hidden")}function u(){p.classList.add("is-hidden")}const c=document.querySelector(".form-search"),O=document.querySelector(".gallery"),R=document.querySelector(".load-more-btn");let y=1,d="",l=0,h=0;const A=async r=>{if(r.preventDefault(),d=c.elements["search-text"].value.trim(),d===""){i.warning({message:"Please enter a search query.",position:"bottomRight"});return}l=0,y=1,M(),u(),L();try{const e=await g(d,y);if(!e||!e.hits||e.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}),c.reset();return}h=e.totalHits,b(e.hits),l+=e.hits.length,l<h?$():u(),c.reset()}catch(e){console.log(e),i.error({message:"An error occurred. Please try again later.",position:"bottomRight"})}finally{w()}},C=async()=>{try{L(),y++;const r=await g(d,y);if(!r||!r.hits||r.hits.length===0){i.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),u();return}b(r.hits);const e=O.firstElementChild,{height:s}=e.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"}),l+=r.hits.length,l>=h&&(i.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),u())}catch(r){console.log(r)}finally{w()}};c.addEventListener("submit",A);R.addEventListener("click",C);
//# sourceMappingURL=index.js.map
