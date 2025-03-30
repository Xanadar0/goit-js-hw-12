import{a as y,S as b,i as o}from"./assets/vendor-BJQmnyJ4.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();y.defaults.baseURL="https://pixabay.com/api/";const p=(t,s)=>{const a={params:{key:"49462102-62c5bd388bb9085ad52d727ed",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15}};return y.get("",a)},f=t=>`<li class="gallery-item">
  <a class="gallery-link" href="${t.largeImageURL}">
    <img
      class="gallery-img"
      src="${t.webformatURL}"
      alt="${t.tags}"
      loading="lazy"
    />
  </a>
  <ul class="gallery-info">
    <li class="gallery-info-item">
      <p class="gallery-info-title">Likes</p>
      <p class="gallery-info-text">${t.likes}</p>
    </li>
    <li class="gallery-info-item">
      <p class="gallery-info-title">Views</p>
      <p class="gallery-info-text">${t.views}</p>
    </li>
    <li class="gallery-info-item">
      <p class="gallery-info-title">Comments</p>
      <p class="gallery-info-text">${t.comments}</p>
    </li>
    <li class="gallery-info-item">
      <p class="gallery-info-title">Downloads</p>
      <p class="gallery-info-text">${t.downloads}</p>
    </li>
  </ul>
</li>`,g=document.querySelector(".form-search"),n=document.querySelector(".gallery"),c=document.querySelector(".loader"),l=document.querySelector(".load-more-btn"),L=new b(".gallery a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt",overlayOpacity:1});let d=1,h="",u=0;const v=async t=>{try{if(t.preventDefault(),h=g.elements["search-text"].value.trim(),h===""){o.warning({message:"Please enter a search query.",position:"bottomRight"});return}n.innerHTML="",u=0,l.classList.add("is-hidden"),c.classList.remove("is-hidden"),d=1;const s=await p(h,d),a=s.data;if(!a.hits||a.hits.length===0){o.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}),n.innerHTML="",g.reset(),c.classList.add("is-hidden"),l.classList.add("is-hidden");return}const i=a.hits.map(e=>f(e)).join("");n.innerHTML=i,L.refresh(),l.classList.remove("is-hidden"),g.reset(),u+=s.data.hits.length}catch(s){console.log(s),o.error({message:"An error occurred. Please try again later.",position:"bottomRight"})}finally{c.classList.add("is-hidden")}},w=async()=>{try{c.classList.remove("is-hidden"),d++;const t=await p(h,d),s=t.data;if(!s.hits||s.hits.length===0){o.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),l.classList.add("is-hidden");return}const a=s.hits.map(r=>f(r)).join("");n.insertAdjacentHTML("beforeend",a),L.refresh();const i=n.firstElementChild,{height:e}=i.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"}),u+=t.data.hits.length,Math.ceil(s.totalHits/15)===d&&(o.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),l.classList.add("is-hidden"))}catch(t){console.log(t)}finally{c.classList.add("is-hidden")}};g.addEventListener("submit",v);l.addEventListener("click",w);
//# sourceMappingURL=index.js.map
