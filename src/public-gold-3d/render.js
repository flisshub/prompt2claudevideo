const {chromium}=require('playwright');const fs=require('fs');
const FPS=30,DUR=70.08,N=Math.ceil(DUR*FPS),W=4;
(async()=>{
  const b=await chromium.launch();fs.mkdirSync((process.env.OUT||'frames'),{recursive:true});
  const only=process.argv[2]?process.argv[2].split(',').map(Number):null;
  const frames=only||[...Array(N).keys()];
  const chunks=Array.from({length:W},(_,i)=>frames.filter((_,j)=>j%W===i));
  await Promise.all(chunks.map(async ch=>{
    const p=await b.newPage({viewport:{width:1080,height:1920}});
    p.on('pageerror',e=>console.log('ERR',e.message));
    await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(300);
    for(const f of ch){await p.evaluate(t=>render(t),f/FPS);
      await p.screenshot({path:`${process.env.OUT||'frames'}/f${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:92});}
    await p.close();
  }));
  await b.close();
})();
