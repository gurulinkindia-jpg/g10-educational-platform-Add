(()=>{
 const repo='gurulinkindia-jpg/g10-educational-platform-Add',api='https://api.github.com/repos/'+repo;
 const tokenStorageKey='g10-github-publish-token';
 let token='',busy=false;
 try{token=sessionStorage.getItem(tokenStorageKey)||'';}catch{}
 const connectionIntro=document.querySelector('#githubConnection>p');
 if(connectionIntro)connectionIntro.innerHTML='Connect to <strong>'+repo+'</strong> to publish both files with one button. The token is sent only to GitHub, is kept only in this browser tab, and is restored automatically if this page reloads.';
 async function request(path,method='GET',body){
  const r=await fetch(api+path,{method,headers:{Accept:'application/vnd.github+json',Authorization:'Bearer '+token,'Content-Type':'application/json','X-GitHub-Api-Version':'2022-11-28'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(45000)});
  if(!r.ok){const e=new Error(r.status===401?'Token rejected. Connect again with a valid token.':r.status===403?'GitHub refused access. Check Contents: Read and write permission and token expiry.':r.status===404?'Repository access was not granted to this token.':'GitHub request failed ('+r.status+'). Your existing files are unchanged.');e.status=r.status;throw e;}return r.json();
 }
 async function connect(value,restoring=false){
  if(busy)return;if(!value){$('githubStatus').textContent='The token field is empty. Paste your GitHub token above, then click Connect GitHub.';return;}
  busy=true;token=value;$('githubConnect').disabled=true;
  $('githubStatus').textContent=restoring?'Restoring your GitHub connection…':'Connecting to GitHub…';
  try{const data=await request('');if(data.permissions&&data.permissions.push===false)throw new Error('This GitHub account does not have write access to this repository.');await request('/git/ref/heads/main');try{sessionStorage.setItem(tokenStorageKey,token);}catch{}$('githubStatus').textContent='Connected to '+repo+'. You can publish your edited card.';$('githubPublish').disabled=false;$('githubDisconnect').disabled=false;$('prepareGithub').hidden=true;}
  catch(e){token='';try{sessionStorage.removeItem(tokenStorageKey);}catch{}$('prepareGithub').hidden=false;$('githubPublish').disabled=true;$('githubDisconnect').disabled=true;$('githubStatus').textContent=e.message;}
  finally{busy=false;$('githubConnect').disabled=false;}
 }
 $('githubConnect').onclick=async()=>{
  if(busy)return;const value=$('githubToken').value.trim()||token;$('githubToken').value='';await connect(value);
 };
 $('githubDisconnect').onclick=()=>{if(busy)return;token='';try{sessionStorage.removeItem(tokenStorageKey);}catch{}$('prepareGithub').hidden=false;$('githubToken').value='';$('githubPublish').disabled=true;$('githubDisconnect').disabled=true;$('githubStatus').textContent='Disconnected. Token cleared from this tab.';};
 function base64(buffer){const bytes=new Uint8Array(buffer);let s='';for(let i=0;i<bytes.length;i+=8192)s+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(s);}
 async function commitCard(card){
  const png=await request('/git/blobs','POST',{content:base64(await card.image.arrayBuffer()),encoding:'base64'});
  const html=await request('/git/blobs','POST',{content:await card.html.text(),encoding:'utf-8'});
  for(let attempt=0;attempt<3;attempt++){
   const ref=await request('/git/ref/heads/main'),parent=await request('/git/commits/'+ref.object.sha);
   const tree=await request('/git/trees','POST',{base_tree:parent.tree.sha,tree:[{path:card.id+'.png',mode:'100644',type:'blob',sha:png.sha},{path:card.id+'.html',mode:'100644',type:'blob',sha:html.sha}]});
   const commit=await request('/git/commits','POST',{message:'Publish edited G10 card '+card.id,tree:tree.sha,parents:[ref.object.sha]});
   try{await request('/git/refs/heads/main','PATCH',{sha:commit.sha,force:false});return;}
   catch(e){if((e.status===409||e.status===422)&&attempt<2)continue;throw e;}
  }
 }
 $('githubPublish').onclick=async()=>{
  if(busy||!token)return;busy=true;$('githubPublish').disabled=true;$('githubConnect').disabled=true;$('githubDisconnect').disabled=true;
  try{
   await logo.decode();const previous=preparedCard;$('prepareGithub').click();const card=preparedCard;if(!card||card===previous)throw new Error('Could not prepare your image. Try again after it loads.');
   card.automatic=true;$('manualPublishSteps').hidden=true;$('publishStatus').textContent='Publishing your edited card…';$('githubStatus').textContent='Uploading your edited image and webpage…';await commitCard(card);
   $('githubStatus').textContent='Saved to GitHub. Waiting for the public card to deploy…';
   for(let i=0;i<20;i++){
    if(preparedCard!==card)break;
    await new Promise(resolve=>setTimeout(resolve,10000));await $('checkPublished').onclick();
    if(!$('publishedFacebook').hidden){$('githubStatus').textContent='Published! Choose a social sharing button below.';return;}
   }
   $('githubStatus').textContent='Saved to GitHub. Deployment is still processing; use Check published card shortly. No need to upload again.';
  }catch(e){$('githubStatus').textContent=e.message+' If the connection was interrupted, check My published cards before trying again.';}
  finally{busy=false;$('githubPublish').disabled=!token;$('githubConnect').disabled=false;$('githubDisconnect').disabled=!token;}
 };
 if(token)setTimeout(()=>connect(token,true));
})();
