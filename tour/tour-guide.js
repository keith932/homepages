/* Guided route follows actual graph edges, returning from every branch. */
(()=>{
 const style=document.createElement('style');style.textContent='button{white-space:nowrap}@media(max-width:650px){header{flex-wrap:wrap;justify-content:space-between}.brand{max-width:38%}.brand small{letter-spacing:1px}.controls{margin-left:auto;max-width:100%}.controls select{max-width:110px}.pnlm-controls-container{top:125px!important}}';document.head.append(style);
 const nodes=window.TOUR_NODES,byId=Object.fromEntries(nodes.map(n=>[n.id,n]));
 const route=['entry'],seen=new Set(['entry']);
 function visit(id){for(const next of byId[id].links){if(seen.has(next))continue;seen.add(next);route.push(next);visit(next);route.push(id)}}visit('entry');
 let timer=null,index=0,loadedAt=null,expected=null;
 const button=document.createElement('button');button.id='guide';button.textContent='自动导览';document.querySelector('.controls').prepend(button);
 function stop(){clearInterval(timer);timer=null;loadedAt=null;button.textContent='自动导览';window.tourGuideRunning=false;window.tourViewer?.stopAutoRotate()}
 function step(){expected=route[index];loadedAt=null;window.goScene(expected)}
 function start(){stop();index=0;window.tourGuideRunning=true;button.textContent='暂停导览';step();timer=setInterval(()=>{if(window.currentScene!==expected||!window.tourViewer?.isLoaded())return;if(!loadedAt){loadedAt=Date.now();window.tourViewer.startAutoRotate(4)}if(Date.now()-loadedAt>=10000){window.tourViewer.stopAutoRotate();if(++index>=route.length){stop();return}step()}},250)}
 button.onclick=()=>timer?stop():start();
 document.getElementById('panorama').addEventListener('pointerdown',stop);
 document.getElementById('panorama').addEventListener('wheel',stop,{passive:true});
 document.getElementById('rooms').addEventListener('change',stop);
 document.getElementById('links').addEventListener('click',stop);
 document.getElementById('about').addEventListener('click',stop);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
 window.tourGuideRoute=route;window.stopTourGuide=stop;
})();
