function renderSocialShares(container,url,title){
 container.replaceChildren();
 const caption=title+' — G10 Educational Platform\nView the card, courses and fees: '+url;
 const links=[['WhatsApp','https://wa.me/?text='+encodeURIComponent(caption)],['Telegram','https://t.me/share/url?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(title)],['LinkedIn','https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(url)],['X','https://twitter.com/intent/tweet?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(title)]];
 const style='display:inline-block;margin:6px 8px 6px 0;padding:12px 16px;border:1px solid #b5c8df;border-radius:8px;background:#fff;color:#17365c;text-decoration:none;font:15px Arial;cursor:pointer';
 for(const [label,href] of links){const a=document.createElement('a');a.textContent=label;a.href=href;a.target='_blank';a.rel='noopener';a.style.cssText=style;container.append(a);}
 async function copy(text){try{await navigator.clipboard.writeText(text);status.textContent='Copied.';}catch{prompt('Copy this text',text);}}
 const button=(label,action)=>{const b=document.createElement('button');b.textContent=label;b.style.cssText=style;b.onclick=action;container.append(b);return b;};
 button('Copy card link',()=>copy(url));button('Copy caption',()=>copy(caption));
 const help=document.createElement('div');help.hidden=true;
 const p=document.createElement('p');p.textContent='For Instagram: download this published image, upload it as a post, and copy the caption. Use your bio or a Story link sticker for the clickable card link.';
 const image=document.createElement('a');image.textContent='Download published image';image.href=url.replace(/\.html$/,'.png');image.download=url.split('/').pop().replace('.html','.png');image.style.cssText=style;
 const instagram=document.createElement('a');instagram.textContent='Open Instagram ↗';instagram.href='https://www.instagram.com/';instagram.target='_blank';instagram.rel='noopener';instagram.style.cssText=style;
 help.append(p,image,instagram);button('Instagram',()=>{help.hidden=!help.hidden;});
 const status=document.createElement('p');status.setAttribute('role','status');container.append(help,status);
}
const publicSocial=document.getElementById('publicSocial');
if(publicSocial){const url=document.querySelector('link[rel="canonical"]').href;renderSocialShares(publicSocial,url,document.querySelector('h1').textContent);}
