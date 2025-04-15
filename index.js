import{a as v,S,i as l}from"./assets/vendor-bbAy8n95.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const q="49462102-62c5bd388bb9085ad52d727ed";async function m(s,t){const r=new URLSearchParams({key:q,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t});return await v(`https://pixabay.com/api/?${r}`)}const E=document.querySelector(".gallery"),g=document.querySelector(".loader"),p=document.querySelector(".load-more-btn"),f=s=>s.map(({webformatURL:t,largeImageURL:r,tags:a,likes:e,views:o,comments:i,downloads:P})=>`<li class="gallery-item">
      <a class="gallery-link" href="${r}">
        <img
          class="gallery-img"
          src="${t}"
          alt="${a}"
          loading="lazy"
        />
      </a>
      <ul class="gallery-info">
        <li class="gallery-info-item">
          <p class="gallery-info-title">Likes</p>
          <p class="gallery-info-text">${e}</p>
        </li>
        <li class="gallery-info-item">
          <p class="gallery-info-title">Views</p>
          <p class="gallery-info-text">${o}</p>
        </li>
        <li class="gallery-info-item">
          <p class="gallery-info-title">Comments</p>
          <p class="gallery-info-text">${i}</p>
        </li>
        <li class="gallery-info-item">
          <p class="gallery-info-title">Downloads</p>
          <p class="gallery-info-text">${P}</p>
        </li>
      </ul>
    </li>`).join(""),M=()=>{E.innerHTML=""},L=()=>{g.classList.remove("is-hidden")},b=()=>{g.classList.add("is-hidden")},x=()=>{p.classList.remove("is-hidden")},h=()=>{p.classList.add("is-hidden")},c=document.querySelector(".form-search"),u=document.querySelector(".gallery"),$=document.querySelector(".load-more-btn");let n=1,d="",y=0;const w=new S(".gallery a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt",overlayOpacity:1}),O=async s=>{if(s.preventDefault(),d=c.elements["search-text"].value.trim(),d===""){l.warning({message:"Please enter a search query.",position:"bottomRight"});return}M(),y=0,h(),L(),n=1;try{const r=(await m(d,n)).data;if(!r||!r.hits||r.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}),c.reset();return}const a=f(r.hits);u.innerHTML=a,w.refresh(),x(),c.reset(),y+=r.hits.length}catch(t){console.log(t),l.error({message:"An error occurred. Please try again later.",position:"bottomRight"})}finally{b()}},R=async()=>{try{L(),n++;const t=(await m(d,n)).data;if(!t.hits||t.hits.length===0){l.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),h();return}const r=f(t.hits);u.insertAdjacentHTML("beforeend",r),w.refresh();const a=u.firstElementChild,{height:e}=a.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"}),y+=t.hits.length,Math.ceil(t.totalHits/15)===n&&(l.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),h())}catch(s){console.log(s)}finally{b()}};c.addEventListener("submit",O);$.addEventListener("click",R);
//# sourceMappingURL=index.js.map
