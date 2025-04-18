import{a as C,S as M,i as u}from"./assets/vendor-BjRz3xa9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const p="data:image/svg+xml,",$="49626853-35a7cc777388834eb6e89d08d";async function g(r,t){const o=new URLSearchParams({key:$,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t});return await C(`https://pixabay.com/api/?${o}`)}const h=document.querySelector(".gallery"),y=document.querySelector(".loader-js"),L=document.querySelector(".btn.visually-hidden");function v(r){const t=r.map(({webformatURL:o,largeImageURL:n,tags:e,likes:s,views:c,comments:q,downloads:x})=>`<li class="gallery-item">
  <a class="item-link" href="${n}">
    <img class="img" src="${o}" alt="${e}" />
    <ul class="statistic-list">
      <li class="statistic-item">
        <p class="statistic-text">Likes</p>
        <p class="statistic-value">${s}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-text">Views</p>
        <p class="statistic-value">${c}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-text">Comments</p>
        <p class="statistic-value">${q}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-text">Downloads</p>
        <p class="statistic-value">${x}</p>
      </li>
    </ul></a
  >
</li>`).join("");h.insertAdjacentHTML("beforeend",t),P.refresh()}const P=new M(".gallery li a",{captionsData:"alt",captionDelay:250});function b(){h.innerHTML=""}function w(){y.classList.add("loader")}function a(){y.classList.remove("loader")}function B(){L.classList.replace("visually-hidden","load-more-btn")}function S(){L.classList.replace("load-more-btn","visually-hidden")}document.querySelector(".span").classList.remove("loader");const d=document.querySelector(".form"),E=document.querySelector(".btn.visually-hidden");let i=1,l,m;const f={message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#ffffff",iconUrl:p,iconColor:"#ffffff",backgroundColor:"#B51B1B"},O={title:"ERROR",titleColor:"#ffffff",message:"Error connecting to server",messageColor:"#ffffff",iconUrl:p,iconColor:"#ffffff",backgroundColor:"#B51B1B"};d.addEventListener("submit",D);E.addEventListener("click",H);function D(r){if(r.preventDefault(),S(),b(),i=1,l=r.target.elements.text.value.trim(),!l||l===" "){u.show(f),d.reset();return}w(),g(l,i).then(t=>{const o=t.data.hits;if(m=Math.ceil(t.data.totalHits/o.length),!o.length){R();return}a(),v(o),i<m&&B()}).catch(t=>{console.log(t.message),a(),u.show(O)}),d.reset()}function R(){u.show(f),b(),a()}async function H(){S(),w(),i++;try{const r=await g(l,i);v(r.data.hits),a();const o=document.querySelector(".gallery-item").getBoundingClientRect().height;if(window.scrollBy({left:0,top:o*2,behavior:"smooth"}),i>=m){f.message="We're sorry, but you've reached the end of search results.",u.show(f),a();return}B()}catch(r){alert(r.message),a()}}
//# sourceMappingURL=index.js.map
