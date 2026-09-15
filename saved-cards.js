(()=>{
 const list=document.getElementById('savedCards'),status=document.getElementById('savedStatus'),refresh=document.getElementById('refreshSaved');
 const pattern=/^g10-edited-\d+-[a-f0-9]{8}\.html$/;
 async function loadSaved(){
  refresh.disabled=true;status.textContent='Looking for your published cards…';
  let names=[],fallback=false;
  try{const r=await fetch('https://api.github.com/repos/gurulinkindia-jpg/g10-educational-platform-Add/contents/',{cache:'no-store',signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error();const entries=await r.json();const files=new Set(entries.filter(e=>e.type==='file').map(e=>e.name));names=[...files].filter(n=>pattern.test(n)&&files.has(n.replace('.html','.png')));}catch{fallback=true;try{const r=await fetch('saved-cards.json',{cache:'no-store'});if(!r.ok)throw Error();names=(await r.json()).filter(n=>pattern.test(n));}catch{status.textContent='Could not load saved cards. Please try Refresh saved cards.';refresh.disabled=false;return;}}
  names.sort((a,b)=>Number(b.split('-')[2])-Number(a.split('-')[2]));
  const results=await Promise.allSettled(names.slice(0,50).map(async name=>{
   const r=await fetch(name,{cache:'no-store'});if(!r.ok)throw Error();const doc=new DOMParser().parseFromString(await r.text(),'text/html');
   const title=doc.querySelector('h1')?.textContent||'My edited card';
   const article=document.createElement('article');article.className='card';
   const image=document.createElement('img');image.src=name.replace('.html','.png');image.alt=title;image.loading='lazy';
   const body=document.createElement('div');body.className='body';const heading=document.createElement('h3');heading.textContent=title;
   const actions=document.createElement('div');actions.className='actions';
   function link(label,href){const a=document.createElement('a');a.textContent=label;a.href=href;actions.append(a);return a;}
   link('Open & share saved card',name);const dl=link('Download image',image.getAttribute('src'));dl.download=image.getAttribute('src');
   const fb=link('Facebook','https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(new URL(name,location.href).href));fb.target='_blank';fb.rel='noopener';fb.className='fb';
   const copy=document.createElement('button');copy.textContent='Copy card link';copy.onclick=async()=>{const url=new URL(name,location.href).href;try{await navigator.clipboard.writeText(url);status.textContent='Saved card link copied.';}catch{prompt('Copy your saved card link',url);}};actions.append(copy);
   body.append(heading,actions);article.append(image,body);return article;
  }));
  const cards=results.filter(r=>r.status==='fulfilled').map(r=>r.value);list.replaceChildren(...cards);
  status.textContent=cards.length?cards.length+' published card'+(cards.length===1?'':'s')+(fallback?' · Showing the saved list; GitHub discovery is temporarily unavailable.':'.'):'No published cards available yet. Upload both exported files, wait for deployment, then refresh.';
  if(results.some(r=>r.status==='rejected'))status.textContent+=' Some uploads are still deploying; refresh shortly.';
  refresh.disabled=false;
 }
 refresh.onclick=loadSaved;loadSaved();
})();
