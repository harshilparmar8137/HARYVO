const products=[
["HARYVO S2","HARYVO-000001","2 Channel Smart Controller","Compact smart automation for essential appliances.","assets/products/HARYVO-000001.webp"],
["HARYVO S4","HARYVO-000002","4 Channel Smart Controller","Balanced multi-channel control for homes and offices.","assets/products/HARYVO-000002.webp"],
["HARYVO S8","HARYVO-000003","8 Channel Smart Controller","Advanced multi-channel controller for larger automation.","assets/products/HARYVO-000003.webp"],
["HARYVO S12","HARYVO-000004","12 Channel Smart Controller","Expanded control for larger installations.","assets/products/HARYVO-000004.webp"],
["HARYVO S18","HARYVO-000005","18 Channel Smart Controller","High-capacity control for advanced installations.","assets/products/HARYVO-000005.webp"],
["HARYVO Premium White Controller","HARYVO-000006","Premium Smart Controller","Premium finish and modern smart control.","assets/products/HARYVO-000006.webp"],
["HARYVO Premium Black Controller","HARYVO-000007","Premium Smart Controller","Premium dark finish for modern interiors.","assets/products/HARYVO-000007.webp"],
["HARYVO Water Level Controller","HARYVO-000008","Water Level Automation","Smart pump and water-level automation solution.","assets/products/HARYVO-000008.webp"],
["HARYVO Smart Door Lock","HARYVO-000009","Smart Security","Connected access control for smart spaces.","assets/products/HARYVO-000009.webp"],
["HARYVO Door & Window Sensor","HARYVO-000010","Security Sensor","Smart open/close monitoring for doors and windows.","assets/products/HARYVO-000010.webp"],
["HARYVO Motion Sensor","HARYVO-000011","Security Sensor","Motion detection for connected security automation.","assets/products/HARYVO-000011.webp"],
["HARYVO Security Alarm","HARYVO-000012","Security System","Alert-focused automation for connected spaces.","assets/products/HARYVO-000012.webp"],
["HARYVO Gas Safety Sensor","HARYVO-000013","Safety Sensor","Gas safety monitoring for smart environments.","assets/products/HARYVO-000013.webp"],
["HARYVO Fire Safety Sensor","HARYVO-000014","Safety Sensor","Fire/safety monitoring for connected protection.","assets/products/HARYVO-000014.webp"],
["HARYVO Environment Monitor","HARYVO-000015","Environment Monitoring","Monitor important indoor environmental conditions.","assets/products/HARYVO-000015.webp"],
["HARYVO Smart Ventilation Controller","HARYVO-000016","Climate Automation","Smart ventilation control for healthier spaces.","assets/products/HARYVO-000016.webp"],
["HARYVO Energy Monitor","HARYVO-000017","Energy Intelligence","Monitor and understand energy usage.","assets/products/HARYVO-000017.webp"],
["HARYVO Smart Curtain Controller","HARYVO-000018","Smart Living","Automated curtain and window treatment control.","assets/products/HARYVO-000018.webp"],
["HARYVO Smart Doorbell","HARYVO-000019","Smart Security","Connected visitor awareness and door monitoring.","assets/products/HARYVO-000019.webp"],
["HARYVO Smart Home Hub","HARYVO-000020","Smart Hub","Central ecosystem control for compatible devices.","assets/products/HARYVO-000020.webp"],
["HARYVO Local Hub","HARYVO-000021","Local Automation","Local-first hub concept for connected automation.","assets/products/HARYVO-000021.webp"],
["HARYVO Salt Level Monitor","HARYVO-000022","Utility Monitoring","Monitor salt levels for practical maintenance.","assets/products/HARYVO-000022.webp"],
["HARYVO Smart Security Camera","HARYVO-000023","Smart Security","Connected camera solution for smart-space monitoring.","assets/products/HARYVO-000023.webp"],
["HARYVO HVAC Monitor","HARYVO-000024","Climate Monitoring","Monitor HVAC-related conditions and performance.","assets/products/HARYVO-000024.webp"]
];

const productDetails={
"HARYVO-000001":{price:"₹1,299",mrp:"₹1,499",features:["2-channel smart control","Compact automation controller","Product code HARYVO-000001"],specs:["Technical specifications: To be finalized","Final installation limits: To be finalized"],applications:["Home automation","Essential appliance control"],box:"To be finalized",installation:"Professional installation recommended for mains wiring.",compatibility:"Final compatibility list to be finalized.",safety:"Follow applicable electrical safety practices; mains installation should be handled by a qualified person.",warranty:"Warranty terms to be finalized."},
"HARYVO-000002":{price:"₹1,999",mrp:"₹2,499",features:["4-channel smart control","Suitable for home and office automation","Product code HARYVO-000002"],specs:["Technical specifications: To be finalized","Final installation limits: To be finalized"],applications:["Home automation","Office automation","Small automation panels"],box:"To be finalized",installation:"Professional installation recommended for mains wiring.",compatibility:"Final compatibility list to be finalized.",safety:"Follow applicable electrical safety practices; mains installation should be handled by a qualified person.",warranty:"Warranty terms to be finalized."},
"HARYVO-000003":{price:"Price to be finalized",mrp:"—",features:["8 channel relay output","Wi‑Fi 2.4 GHz","Bluetooth","Manual/dry-contact input support","Mobile/app-oriented smart control","Timer & schedule support","Power-failure recovery"],specs:["Input: 230 VAC, 50/60 Hz","Relay: 8 channels, 230 VAC / 10A each resistive load","Communication: Wi‑Fi 2.4 GHz 802.11 b/g/n + Bluetooth 4.2","Controller: ESP32‑WROOM‑32E","Power consumption: < 2.5 W","Operating temperature: 0°C to 55°C","Enclosure: ABS, fire retardant","Dimensions: 220 × 150 × 55 mm","PCB: 180 × 105 mm; 2-layer FR-4, 1.6 mm"],applications:["Home automation","Office automation","Larger multi-channel installations"],box:"Final box contents to be confirmed.",installation:"Wall mount / DIN-rail option; mains wiring should be performed by a qualified person.",compatibility:"Wi‑Fi 2.4 GHz and compatible HARYVO control ecosystem; final app/device compatibility to be confirmed.",safety:"Mains-voltage product. Isolate power before installation and follow applicable electrical standards.",warranty:"Warranty terms to be finalized."}
};
const genericDetail={price:"Price to be finalized",mrp:"—",features:["Smart HARYVO product","Connected automation use case","Product-specific control/monitoring"],specs:["Technical specifications: To be finalized","Electrical ratings: To be finalized","Dimensions: To be finalized"],applications:["Smart home","Office / commercial automation","Custom projects where applicable"],box:"To be finalized",installation:"Installation information to be finalized for this model. Mains wiring should be performed by a qualified person.",compatibility:"Final compatibility list to be finalized.",safety:"Follow applicable electrical and product safety instructions.",warranty:"Warranty terms to be finalized."};
function getDetail(code){return productDetails[code]||genericDetail}
function esc(v){return String(v).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m]))}
function openProduct(i){const p=products[i],d=getDetail(p[1]);document.getElementById("detailImage").src=p[4];document.getElementById("detailImage").alt=p[0];document.getElementById("detailCode").textContent=p[1];document.getElementById("detailSr").textContent=`SR NO. ${String(i+1).padStart(2,"0")}`;document.getElementById("detailType").textContent=p[2];document.getElementById("detailName").textContent=p[0];document.getElementById("detailDesc").textContent=p[3];document.getElementById("detailPrice").textContent=d.price;document.getElementById("detailMrp").textContent=d.mrp==="—"?"":`MRP ${d.mrp}`;document.getElementById("detailFeatures").innerHTML=d.features.map(x=>`<div class="detail-item"><b>Feature</b><span>${esc(x)}</span></div>`).join("");document.getElementById("detailSpecs").innerHTML=d.specs.map(x=>`<div class="detail-item"><b>Specification</b><span>${esc(x)}</span></div>`).join("");document.getElementById("detailApps").innerHTML=d.applications.map(x=>`<div class="detail-item"><b>Application</b><span>${esc(x)}</span></div>`).join("");document.getElementById("detailBox").textContent=d.box;document.getElementById("detailInstall").textContent=d.installation;document.getElementById("detailCompat").textContent=d.compatibility;document.getElementById("detailSafety").textContent=d.safety;document.getElementById("detailWarranty").textContent=d.warranty;document.getElementById("detailBuy").onclick=()=>buyProduct(i);document.getElementById("detailCart").onclick=()=>{addToCart(p[0]);};document.getElementById("detailWhatsApp").href=`https://wa.me/919512800320?text=${encodeURIComponent("HARYVO enquiry: "+p[0]+" ("+p[1]+")")}`;document.getElementById("detailAsk").onclick=()=>{closeProduct();askBot(`Tell me about ${p[0]} ${p[1]}`)};document.getElementById("productDetailModal").classList.add("show");document.body.style.overflow="hidden"}
function closeProduct(){document.getElementById("productDetailModal").classList.remove("show");document.body.style.overflow=""}

const grid=document.getElementById("productGrid");
products.forEach((p,i)=>{
 const card=document.createElement("article"); card.className="product reveal"; card.tabIndex=0; card.setAttribute("role","button"); card.setAttribute("aria-label",`Open full details for ${p[0]}`);
 card.onclick=()=>openProduct(i); card.onkeydown=(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProduct(i)}};
 card.innerHTML=`<div class="product-img"><img src="${p[4]}" alt="${p[0]}" loading="lazy"><span class="code">${p[1]}</span><span class="ad">TAP FOR FULL PRODUCT DETAILS</span></div>
 <div class="product-body"><div class="type">${p[2]}</div><h3>${p[0]}</h3><p>${p[3]}</p><div class="product-actions">
 <button class="mini" onclick="event.stopPropagation();askBot('Tell me about ${p[0]}')"><i class="bi bi-robot"></i> Ask AI</button>
 <button class="mini gold" onclick="event.stopPropagation();buyProduct(${i})"><i class="bi bi-cart-plus"></i> Buy Now</button></div></div>`;
 grid.appendChild(card);
});

let cart=0;
function addToCart(name){cart++;document.getElementById("cartCount").textContent=cart;addMsg(name+" added to cart.","bot");toggleChat(true)}
function toggleChat(forceOpen){const c=document.getElementById("chat");if(forceOpen===true)c.classList.add("open");else c.classList.toggle("open");if(c.classList.contains("open"))setTimeout(()=>document.getElementById("chatInput").focus(),100)}
function addMsg(text,type){const d=document.createElement("div");d.className="msg "+type;d.textContent=text;document.getElementById("messages").appendChild(d);document.getElementById("messages").scrollTop=99999}
async function sendChat(){const i=document.getElementById("chatInput"),q=i.value.trim();if(!q)return;i.value="";addMsg(q,"user");addMsg("Thinking…","bot");const t=document.getElementById("messages").lastElementChild;try{const r=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:q})});const d=await r.json();if(!r.ok)throw Error();t.textContent=d.reply||botReply(q)}catch(e){t.textContent=botReply(q)}}


let authMode="login";
function openAuth(){document.getElementById("authModal").classList.add("show");showAuth("login")}
function closeAuth(){document.getElementById("authModal").classList.remove("show")}
function showAuth(m){authMode=m;document.getElementById("authTitle").textContent=m==="login"?"Login to HARYVO":"Create your HARYVO account";document.getElementById("authSubmit").textContent=m==="login"?"Login":"Create Account";document.getElementById("authName").style.display=m==="register"?"block":"none";document.getElementById("authName").required=m==="register";document.getElementById("loginTab").classList.toggle("active",m==="login");document.getElementById("registerTab").classList.toggle("active",m==="register")}
async function submitAuth(e){e.preventDefault();const s=document.getElementById("authStatus"),body={email:authEmail.value.trim(),password:authPassword.value};if(authMode==="register")body.name=authName.value.trim();s.textContent="Please wait…";try{const r=await fetch("/api/"+authMode,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}),d=await r.json();if(!r.ok)throw Error(d.error||"Request failed");s.textContent=d.message||"Success";loadSession();setTimeout(closeAuth,500)}catch(e){s.textContent=e.message}}
async function loadSession(){try{const r=await fetch("/api/me");if(!r.ok)return;const u=await r.json();document.getElementById("accountLabel").textContent=u.name||"Account"}catch(e){}}
async function buyProduct(i){
 const p=products[i];
 try{
  const r=await fetch("/api/create-order",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify({productCode:p[1]})
  });
  const d=await r.json().catch(()=>({}));
  if(!r.ok) throw Error(d.error||"Checkout unavailable");

  if(!d.order_id||!d.key_id||!d.amount) throw Error("Invalid checkout response from server.");

  const options={
   key:d.key_id,
   amount:d.amount,
   currency:d.currency||"INR",
   name:"HARYVO",
   description:p[0],
   order_id:d.order_id,
   prefill:{name:"",email:""},
   theme:{color:"#d9a83f"},
   handler:async function(response){
    try{
     const verify=await fetch("/api/verify-payment",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
       razorpay_payment_id:response.razorpay_payment_id,
       razorpay_order_id:response.razorpay_order_id,
       razorpay_signature:response.razorpay_signature
      })
     });
     const result=await verify.json().catch(()=>({}));
     if(!verify.ok||!result.verified) throw Error(result.error||"Payment verification failed.");
     alert("Payment verified successfully. Thank you for your HARYVO order!");
    }catch(err){
     alert(err.message||"Payment verification failed. Please contact HARYVO support.");
    }
   },
   modal:{
    ondismiss:function(){
     console.log("Razorpay checkout dismissed by customer.");
    }
   }
  };

  const checkout=new Razorpay(options);
  checkout.on("payment.failed",function(response){
   const msg=response?.error?.description||"Payment failed. Please try again.";
   alert(msg);
  });
  checkout.open();
 }catch(e){
  alert(e.message||"Please login and configure the HARYVO payment server.");
 }
}
loadSession();
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeProduct()});

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.10});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));
