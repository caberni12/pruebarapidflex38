
/*! RapidFlex – Hero Background Carousel + Safe Captions (no autoplay por defecto) */
(function(){
  if (window.__HERO_CAROUSEL_INIT__) return;
  window.__HERO_CAROUSEL_INIT__ = true;

  var IMAGES = (window.HERO_IMAGES && Array.isArray(window.HERO_IMAGES) && window.HERO_IMAGES.length)
    ? window.HERO_IMAGES : ['banner.png'];

  var CAPTIONS = (window.HERO_CAPTIONS && Array.isArray(window.HERO_CAPTIONS))
    ? window.HERO_CAPTIONS : [];

  var AUTOPLAY_MS = (typeof window.HERO_AUTOPLAY_MS === 'number' && window.HERO_AUTOPLAY_MS >= 1500)
    ? window.HERO_AUTOPLAY_MS : null;

  var SELECTOR_HEADER = window.HERO_HEADER_SELECTOR || 'header';
  var SELECTOR_TEXT   = window.HERO_TEXT_SELECTOR   || 'header .hero-text';

  (function injectCssOnce(){
    if (document.getElementById('hero-ready-css')) return;
    var css = "header .hero-text{transition:opacity .3s ease;}"
            + "header.hero-pending .hero-text{opacity:0;visibility:hidden;pointer-events:none;}"
            + "header.hero-ready .hero-text{opacity:1;visibility:visible;}";
    var style = document.createElement('style');
    style.id = 'hero-ready-css'; style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  })();

  function $(s,r){return (r||document).querySelector(s)}
  function on(e,t,f){ if(e) e.addEventListener(t,f) }
  function preload(src, ok, err){ var i=new Image(); i.onload=function(){ok&&ok()}; i.onerror=function(){err&&err()}; i.src=src; }
  function setHeaderBg(h,src){ h.style.backgroundImage="url('"+src+"')"; h.style.backgroundSize="cover"; h.style.backgroundPosition="center"; h.style.backgroundRepeat="no-repeat"; }

  function init(){
    var header = $(SELECTOR_HEADER); if(!header) return;
    var heroTextEl = $(SELECTOR_TEXT);
    var ORIGINAL_HTML = heroTextEl ? heroTextEl.innerHTML : "";

    function computeCaption(i){
      var cap = (i < CAPTIONS.length) ? CAPTIONS[i] : undefined;
      if (typeof cap === 'string') { var t=cap.trim(); if(!t) return null; return cap; }
      if (cap === null) return null;
      return ORIGINAL_HTML; // default: keep original
    }

    var btnPrev = $('.hero-arrow-left');
    var btnNext = $('.hero-arrow-right');
    var images = IMAGES.slice(), total=images.length, index=0, timer=null;

    header.classList.add('hero-pending');

    function apply(i){
      i = (i + total) % total; var src = images[i];
      header.classList.add('hero-pending');
      preload(src, function(){
        setHeaderBg(header, src);
        header.classList.remove('hero-pending'); header.classList.add('hero-ready');
        index = i;
        if (heroTextEl) {
          var cap = computeCaption(i);
          if (cap === null) { heroTextEl.style.display='none'; }
          else { heroTextEl.innerHTML = cap; heroTextEl.style.display='block'; }
        }
      }, function(){
        header.classList.remove('hero-pending'); header.classList.add('hero-ready');
        index = i;
        if (heroTextEl) {
          var cap = computeCaption(i);
          if (cap === null) { heroTextEl.style.display='none'; }
          else { heroTextEl.innerHTML = cap; heroTextEl.style.display='block'; }
        }
      });
    }

    function next(){ apply(index+1) } function prev(){ apply(index-1) } function go(i){ apply(i) }
    apply(0);
    on(btnPrev,'click',prev); on(btnNext,'click',next);
    on(document,'keydown',function(e){ if(e.key==='ArrowLeft')prev(); if(e.key==='ArrowRight')next(); });

    function start(){ if(!AUTOPLAY_MS) return; stop(); timer=setInterval(next,AUTOPLAY_MS); }
    function stop(){ if(timer){ clearInterval(timer); timer=null; } }

    window.heroCarousel = { next:next, prev:prev, go:go, getIndex:function(){return index;}, getImages:function(){return images.slice();}, start:start, stop:stop };
    if (AUTOPLAY_MS) start();
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
