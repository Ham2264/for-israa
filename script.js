/* ===================================
   Museum of Esraa
   Part 1
=================================== */

const loadingScreen = document.getElementById("loading-screen");
const museumDoors = document.getElementById("museum-doors");
const museum = document.getElementById("museum");

const typing = document.getElementById("typing");
const progressBar = document.getElementById("progress-bar");
const percent = document.getElementById("percent");

const typingMessage = document.getElementById("typingMessage");
const letterText = document.getElementById("letterText");

const enterBtn = document.getElementById("enterBtn");
const secretBtn = document.getElementById("secretBtn");
const secretScreen = document.getElementById("secretScreen");

const rose = document.querySelector(".rose");

const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 420;
canvas.height = 420;

let progress = 0;

const introTexts = [

"Loading Museum...",

"This place contains something priceless...",

"Preparing access..."

];

async function typeSentence(text){

typing.innerHTML="";

for(let i=0;i<text.length;i++){

typing.innerHTML += text[i];

await sleep(40);

}

}

function sleep(ms){

return new Promise(resolve=>setTimeout(resolve,ms));

}

async function intro(){

for(const t of introTexts){

await typeSentence(t);

await sleep(900);

}

loadingBar();

}

function loadingBar(){

const timer=setInterval(()=>{

progress++;

progressBar.style.width=progress+"%";

percent.innerHTML=progress+"%";

if(progress>=100){

clearInterval(timer);

setTimeout(openDoors,800);

}

},35);

}

function openDoors(){

loadingScreen.style.display="none";

museumDoors.style.display="block";

}

enterBtn.onclick=()=>{

museumDoors.classList.add("open");

setTimeout(()=>{

museumDoors.style.display="none";

museum.style.display="block";

window.scrollTo({

top:0,

behavior:"smooth"

});

startTyping();

drawHeart();

},2200);

};

intro();

/* ===================================
   كتابة الرسالة الثانية
=================================== */

const museumMessage=

`لأن بعض الأشخاص...

لا يمكن وصفهم...

بكلمات فقط...

بل يستحقون

مكانًا كاملاً.`;


async function startTyping(){

typingMessage.innerHTML="";

for(let i=0;i<museumMessage.length;i++){

typingMessage.innerHTML+=museumMessage[i];

await sleep(45);

}

writeLetter();

}

/* ===================================
   الرسالة الأخيرة
=================================== */

const finalMessage=

`إلى إسراء...

ما صنعت هذا الموقع

لأن هناك مناسبة.

بل لأنك

شخص يستحق

شيئًا مختلفًا.

أتمنى أن

يرسم هذا المكان

ابتسامة جميلة

على وجهك.

فوجودك...

له أثر

أكبر مما تتخيلين.

🤍`;

async function writeLetter(){

letterText.innerHTML="";

for(let i=0;i<finalMessage.length;i++){

letterText.innerHTML+=finalMessage[i];

await sleep(40);

}

}
/* ===================================
      رسم القلب
=================================== */

let t = 0;

function drawHeart(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.save();

ctx.translate(210,210);

ctx.scale(9,-9);

ctx.beginPath();

function animate(){

ctx.fillStyle="#ff69c8";

ctx.shadowBlur=20;

ctx.shadowColor="#ff4fb8";

for(let i=0;i<4;i++){

let x=16*Math.pow(Math.sin(t),3);

let y=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);

ctx.fillRect(x,-y,0.35,0.35);

t+=0.015;

if(t>=Math.PI*2){

heartFinished();

return;

}

}

requestAnimationFrame(animate);

}

animate();

}

/* ===================================
      بعد اكتمال القلب
=================================== */

function heartFinished(){

ctx.restore();

document.getElementById("heartName").style.opacity="1";

createParticles();

}

/* ===================================
      الجسيمات
=================================== */

function createParticles(){

const container=document.getElementById("particles");

setInterval(()=>{

const p=document.createElement("div");

p.className="particle";

p.style.left=Math.random()*100+"vw";

p.style.top="110vh";

p.style.width=(4+Math.random()*8)+"px";

p.style.height=p.style.width;

p.style.position="fixed";

p.style.borderRadius="50%";

p.style.background=`hsl(${320+Math.random()*40},100%,75%)`;

p.style.boxShadow="0 0 18px hotpink";

p.style.pointerEvents="none";

container.appendChild(p);

let y=window.innerHeight+50;

let speed=1+Math.random()*2;

function move(){

y-=speed;

p.style.transform=`translateY(${-(window.innerHeight+100-y)}px)`;

if(y>-50){

requestAnimationFrame(move);

}else{

p.remove();

}

}

move();

},120);

}

/* ===================================
      البطاقات
=================================== */

document.querySelectorAll(".flip-card").forEach(card=>{

card.addEventListener("click",()=>{

card.classList.toggle("active");

});

});

/* ===================================
      الوردة
=================================== */

rose.addEventListener("click",()=>{

rose.style.transform="scale(1.35) rotate(-15deg)";

rose.style.filter="drop-shadow(0 0 40px deeppink)";

for(let i=0;i<40;i++){

flowerParticle();

}

});

/* ===================================
      بتلات
=================================== */

function flowerParticle(){

const petal=document.createElement("div");

petal.innerHTML="🌸";

petal.style.position="fixed";

petal.style.left=(window.innerWidth/2)+"px";

petal.style.top=(window.innerHeight/2)+"px";

petal.style.fontSize=(20+Math.random()*18)+"px";

petal.style.pointerEvents="none";

document.body.appendChild(petal);

let x=(Math.random()-0.5)*700;

let y=(Math.random()-0.5)*700;

petal.animate([

{

transform:"translate(0,0) rotate(0deg)",

opacity:1

},

{

transform:`translate(${x}px,${y}px) rotate(${Math.random()*720}deg)`,

opacity:0

}

],{

duration:2500,

easing:"ease-out"

});

setTimeout(()=>{

petal.remove();

},2500);

}
/* ===================================
      نجوم متحركة
=================================== */

function createStars(){

const stars=document.getElementById("stars");

for(let i=0;i<120;i++){

const star=document.createElement("div");

star.className="star";

star.style.position="absolute";

star.style.left=Math.random()*100+"vw";

star.style.top=Math.random()*100+"vh";

star.style.width=(1+Math.random()*3)+"px";

star.style.height=star.style.width;

star.style.borderRadius="50%";

star.style.background="white";

star.style.boxShadow="0 0 12px white";

star.style.opacity=Math.random();

stars.appendChild(star);

blink(star);

}

}

function blink(star){

setInterval(()=>{

star.style.opacity=Math.random();

},500+Math.random()*1500);

}

createStars();

/* ===================================
      فراشات
=================================== */

function createButterfly(){

const b=document.createElement("div");

b.innerHTML="🦋";

b.style.position="fixed";

b.style.left="-40px";

b.style.top=Math.random()*window.innerHeight+"px";

b.style.fontSize=(18+Math.random()*18)+"px";

b.style.pointerEvents="none";

document.body.appendChild(b);

let x=-40;

let y=parseFloat(b.style.top);

function fly(){

x+=2+Math.random()*2;

y+=Math.sin(x/40);

b.style.left=x+"px";

b.style.top=y+"px";

if(x<window.innerWidth+60){

requestAnimationFrame(fly);

}else{

b.remove();

}

}

fly();

}

setInterval(createButterfly,3500);

/* ===================================
      نبض اسم إسراء
=================================== */

const heartName=document.getElementById("heartName");

setInterval(()=>{

heartName.animate([

{transform:"scale(1)"},

{transform:"scale(1.08)"},

{transform:"scale(1)"}

],{

duration:1200

});

},1400);

/* ===================================
      زر النهاية
=================================== */

secretBtn.addEventListener("click",()=>{

secretScreen.style.display="flex";

launchFinalEffect();

});

/* ===================================
      انفجار القلوب
=================================== */

function launchFinalEffect(){

for(let i=0;i<180;i++){

const h=document.createElement("div");

const items=["💖","✨","🌸","🦋","⭐"];

h.innerHTML=items[Math.floor(Math.random()*items.length)];

h.style.position="fixed";

h.style.left="50%";

h.style.top="50%";

h.style.fontSize=(18+Math.random()*25)+"px";

h.style.pointerEvents="none";

document.body.appendChild(h);

const x=(Math.random()-0.5)*1200;

const y=(Math.random()-0.5)*900;

h.animate([

{

transform:"translate(0,0) scale(1)",

opacity:1

},

{

transform:`translate(${x}px,${y}px) scale(.2)`,

opacity:0

}

],{

duration:3500,

easing:"ease-out"

});

setTimeout(()=>{

h.remove();

},3500);

}

}
/* ===================================
      Museum of Esraa
      Part 4 (Final)
=================================== */

/* أمطار ورود مستمرة */

const rainItems=[
"🌸",
"🌺",
"🌷",
"✨",
"💖"
];

function flowerRain(){

const item=document.createElement("div");

item.innerHTML=rainItems[
Math.floor(Math.random()*rainItems.length)
];

item.style.position="fixed";
item.style.left=Math.random()*100+"vw";
item.style.top="-40px";
item.style.fontSize=(18+Math.random()*18)+"px";
item.style.pointerEvents="none";
item.style.zIndex="999";

document.body.appendChild(item);

let y=-40;
let rotate=0;

function fall(){

y+=2+Math.random()*2;
rotate+=2;

item.style.top=y+"px";
item.style.transform=
`rotate(${rotate}deg)`;

if(y<window.innerHeight+50){

requestAnimationFrame(fall);

}else{

item.remove();

}

}

fall();

}

setInterval(flowerRain,250);

/* ===================================
      لمعان البطاقات
=================================== */

document.querySelectorAll(".glass-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

card.style.background=
`radial-gradient(circle at ${x}px ${y}px,
rgba(255,255,255,.28),
rgba(255,255,255,.08))`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="rgba(255,255,255,.08)";

});

});

/* ===================================
      لمعان زر الدخول
=================================== */

setInterval(()=>{

enterBtn.animate([

{
transform:"scale(1)"
},

{
transform:"scale(1.08)"
},

{
transform:"scale(1)"
}

],{

duration:1600

});

},1800);

/* ===================================
      توهج اسم إسراء
=================================== */

const esraa=document.querySelector(".esraa-name");

setInterval(()=>{

esraa.animate([

{

opacity:.7,

letterSpacing:"2px"

},

{

opacity:1,

letterSpacing:"6px"

},

{

opacity:.7,

letterSpacing:"2px"

}

],{

duration:2200

});

},2200);

/* ===================================
      رسالة النهاية
=================================== */

function finalGlow(){

document.body.animate([

{

filter:"brightness(1)"

},

{

filter:"brightness(1.2)"

},

{

filter:"brightness(1)"

}

],{

duration:2500

});

}

setInterval(finalGlow,3500);

/* ===================================
      شاشة النهاية
=================================== */

function showFinalWords(){

const div=document.createElement("div");

div.innerHTML=`

<div style="
position:fixed;
inset:0;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
background:rgba(5,5,10,.82);
backdrop-filter:blur(8px);
z-index:99999;
">

<h1 style="
font-size:48px;
color:#ff8bdd;
margin-bottom:20px;
">

إسراء

</h1>

<p style="
font-size:22px;
line-height:2;
text-align:center;
max-width:420px;
color:white;
padding:20px;
">

إذا كان هناك شخص

يستحق موقعًا

صُنع بكل هذا الاهتمام...

فهو أنتِ 🤍

</p>

</div>

`;

document.body.appendChild(div);

}

setTimeout(showFinalWords,120000);

/* ===================================
      Console Message
=================================== */

console.log("Museum Of Esraa Loaded Successfully ❤️");
