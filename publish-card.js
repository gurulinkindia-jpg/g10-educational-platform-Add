/* Export an immutable edited card without putting GitHub credentials in the site. */
const publishRoot='https://gurulinkindia-jpg.github.io/g10-educational-platform-Add/';
let preparedCard=null;
function escapeCardText(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function publishedCardHtml(id,title,width,height){
 const url=publishRoot+id+'.html',image=publishRoot+id+'.png',safe=escapeCardText(title);
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${safe} | G10</title><meta name="g10-card-id" content="${id}"><meta property="og:type" content="website"><meta property="og:title" content="${safe} | G10 Educational Platform"><meta property="og:description" content="Explore G10 courses, fees and admission details."><meta property="og:url" content="${url}"><meta property="og:image" content="${image}"><meta property="og:image:width" content="${width}"><meta property="og:image:height" content="${height}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${image}"><link rel="canonical" href="${url}"><style>body{margin:0;background:#eef3fa;color:#112d50;font:18px Arial}main{max-width:900px;margin:30px auto;padding:16px}img{display:block;max-width:100%;max-height:80vh;margin:auto;height:auto}a.button{display:inline-block;background:#1265e8;color:white;padding:16px 24px;margin:16px 8px 0 0;border-radius:8px;text-decoration:none}p{line-height:1.6}</style></head><body><main><h1>${safe}</h1><a href="${admissionUrl}"><img src="${id}.png" width="${width}" height="${height}" alt="${safe} — G10 admission card"></a><a class="button" href="${admissionUrl}">View Fee Structure →</a><a class="button" href="https://wa.me/919706380357">Ask about admission</a><p>G10 Educational Platform · Guwahati<br>Call / WhatsApp: +91 97063 80357</p></main></body></html>`;
}
function downloadPrepared(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}
function showPrepared(){
 $('publishPanel').hidden=false;$('publishedFacebook').hidden=true;
 $('publishFiles').textContent=preparedCard.id+'.png and '+preparedCard.id+'.html';
 $('publishUrl').value=publishRoot+preparedCard.id+'.html';
 $('publishStatus').textContent='Files prepared from your current edits. They are not on GitHub yet.';
 $('publishPanel').scrollIntoView({behavior:'smooth',block:'nearest'});
}
$('prepareGithub').onclick=()=>{try{
 const image=editedFile(),id='g10-edited-'+Date.now()+'-'+crypto.randomUUID().slice(0,8);
 preparedCard={id,image,html:new Blob([publishedCardHtml(id,state.text.headline,canvas.width,canvas.height)],{type:'text/html;charset=utf-8'})};showPrepared();
}catch{$('status').textContent='Wait for the images to finish loading, then try again.';}};
$('publishPng').onclick=()=>{if(preparedCard)downloadPrepared(preparedCard.image,preparedCard.id+'.png');};
$('publishHtml').onclick=()=>{if(preparedCard)downloadPrepared(preparedCard.html,preparedCard.id+'.html');};
$('checkPublished').onclick=async()=>{
 if(!preparedCard)return;const snapshot=preparedCard,id=snapshot.id,url=publishRoot+id+'.html';
 $('checkPublished').disabled=true;$('publishStatus').textContent='Checking the webpage and edited image…';
 try{
  const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error('Page not live');const html=await response.text();
  if(!html.includes('content="'+id+'"'))throw new Error('Different page');
  await new Promise((resolve,reject)=>{const img=new Image(),timer=setTimeout(()=>reject(new Error('Image timeout')),15000);img.onload=()=>{clearTimeout(timer);resolve();};img.onerror=()=>{clearTimeout(timer);reject(new Error('Image not live'));};img.src=publishRoot+id+'.png';});
  if(preparedCard!==snapshot)return;
  $('publishedFacebook').href='https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url);$('publishedFacebook').hidden=false;
  $('publishStatus').textContent='Your edited card is live. Share this version on Facebook using the button below.';
 }catch{if(preparedCard===snapshot)$('publishStatus').textContent='Not live yet. Upload BOTH files to the repository root, click Commit changes, wait for GitHub Pages to deploy, then check again.';}
 finally{$('checkPublished').disabled=false;}
};
