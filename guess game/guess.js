let gamename="guess game";
document.title=gamename;
document.querySelector("h1").innerHTML=gamename;
document.querySelector("footer").innerHTML=m=`${gamename} created by Ali Khaled`;

let numberoftries=5;
let numberofletters=6;
let count=1;
let numberofhints=2;
let guessword="";
const randomWords = ["planet","forest","castle","animal","bridge","danger","follow","garden","hunter","injury","jungle","kitten","legend","mellow","nobody","object","people","quartz","rocket","silver","tunnel","upbeat","vacuum","wealth","yellow","zenith","absent","bucket","circle","drawer","empire","fabric","gentle","hammer","island","jester","keeper","lawyer","magnet","nature","office","pickle","quaint","reveal","school","ticket","unfold","valley","window","xenial","yellow","abroad","border","carbon","design","effort","flight","gather","honest","ignite","jungle","kidnap","launch","modern","native","option","profit","quiver","refund","spirit","temple","unison","visual","wealth","abound","broken","charge","demand","estate","flower","glance","hazard","impact","joyful","kidney","lament","margin","napkin","object","placid","quench","rescue","stream","thrive","united","vacant","wander","yogurt","zodiac"];


let mymsg=document.querySelector(".message");
const icontainer=document.querySelector(".inputs");
  let hint=document.querySelector(".hint");
  document.querySelector(".hint span").innerHTML=numberofhints;
  hint.addEventListener("click",hintfunc);
function generateguess(){
  

  for(let i=1;i<=numberoftries;i++){
    const trydiv=document.createElement("div");
    trydiv.classList.add(`Try-${i}`);
    trydiv.innerHTML=`<span>Try ${i}</span>`;
    if(i!==1)trydiv.classList.add("hidden");
    for(j=1;j<=numberofletters;j++){
      const input=document.createElement("input");
      input.id=`guess-${i}-letter-${j}`;
      input.setAttribute("type","text");
      input.setAttribute("maxlength","1");
      trydiv.appendChild(input);

    }
  
    
  icontainer.appendChild(trydiv);

  }
  icontainer.children[0].children[1].focus();
  const hiddeninputs=document.querySelectorAll(".hidden input");
  hiddeninputs.forEach((input) =>(input.disabled=true));
  const focusinputs=document.querySelectorAll("input");
  focusinputs.forEach((input,index)=>{
    input.addEventListener("input",function(){
      this.value=this.value.toUpperCase();
      const nextinput=focusinputs[index+1];
      if(nextinput) nextinput.focus();
    });
  });
}
const guessletter=document.querySelector(".chek");
guessletter.addEventListener("click",handelguess);
const randomIndex = Math.floor(Math.random() * randomWords.length);
guessword = randomWords[randomIndex];
console.log(guessword);
function handelguess(){
  let success=true;
  for(let i=1;i<=numberofletters;i++){
    const inputfeild=document.querySelector(`#guess-${count}-letter-${i}`);
    const letter=inputfeild.value.toLowerCase();
    const word=guessword[i-1];
    if(letter===word){
      inputfeild.classList.add("yes-in-place")
    }
    else if(guessword.includes(letter)&&letter!==""){
      inputfeild.classList.add("not-in-place");
      success=false;
    }
    else{
      inputfeild.classList.add("not-the-word");
      success=false;
    }
  }
  if (success){
    mymsg.innerHTML=`YOU WIN THE WORD IS <span> ${guessword.toUpperCase()}</span>`;
    console.log("you win");
    window.scrollBy({
      top: 300,
      left: 0,
      behavior: "smooth"
    });
    let inpdiv=document.querySelectorAll(".inputs >div")
    inpdiv.forEach((trydiv) =>trydiv.classList.add("hidden")) ;
    guessletter.disabled=true;
    hint.disabled=true;
  }else{
    document.querySelector(`.Try-${count}`).classList.add("hidden");
    const distry=document.querySelectorAll(`.Try-${count} input`);
    distry.forEach((input)=>(input.disabled=true));
    count++;
  
    const nextdis=document.querySelectorAll(`.Try-${count} input`);
    nextdis.forEach((input)=>(input.disabled=false));
    const el=document.querySelector(`.Try-${count}`);
    
    if (el){
        document.querySelector(`.Try-${count}`).classList.remove("hidden");
        console.log(el.children[1]);
        el.children[1].focus();
    }
    else{
      window.scrollBy({
        top: 300,
        left: 0,
        behavior: "smooth"
      });
      mymsg.innerHTML=`sorry you <p>LOST </p> the word is <span>${guessword.toUpperCase()}</span>`;
      guessletter.disabled=true;
      hint.disabled=true;
    }
  }


}
  function hintfunc(){
    if (numberofhints>0){
      numberofhints --;
      document.querySelector(".hint span").innerHTML=numberofhints;
    }
    if (numberofhints===0){
      hint.disabled=true;
    }
    let enabled=document.querySelectorAll("input:not([disabled])");
    let emptyenabled=Array.from(enabled).filter((input)=>input.value==="");
    if (emptyenabled.length>0){
      let rand=Math.floor(Math.random()*emptyenabled.length);
      let randinput=emptyenabled[rand];
      let indexfill=Array.from(enabled).indexOf(randinput);
      console.log(indexfill);
      console.log(randinput);
      if (indexfill!==-1){
        randinput.value=guessword[indexfill].toUpperCase();
      }
    }
  }
  function handelbackspace(event){
    if (event.key==="BackSpace"){
      let inputs =document.querySelectorAll("input:not([disabled])");
      let current=Array.from(inputs).indexOf(document.activeElement);
      if (current> 0){
        let valuecurrent=inputs[current];
        let prevcurrent=inputs[current-1];
        valuecurrent.value="";
      }
    }
  }
  function openwindow(){
    if (numberofhints>0){
      numberofhints --;
      document.querySelector(".hint span").innerHTML=numberofhints;
      window.open(
      "second.html",
      "secondwindow",
      "width=550,height=200,top=100,left=100,menubar=no,location=no,resizable=yes,scrollbars=yes,status=no"
    );
    }
    if (numberofhints===0){
      hint.disabled=true;
    }  
  
  }
  
  let restart=document.querySelector(".restart");
  restart.addEventListener("click",function(){
    window.location.reload();
  });
  document.addEventListener("keydown",handelbackspace);
window.onload=function(){
  
  generateguess();
};
