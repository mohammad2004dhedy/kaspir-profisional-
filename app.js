let toggler=document.querySelector(".toggler-menu");
let navList=document.querySelector('header .container nav ul');
let Toggler_mode=false;
toggler.addEventListener("click",()=>{
    if(Toggler_mode==false){
        navList.classList.add("active");
        Toggler_mode=true;
    }else
    if(Toggler_mode==true){
        navList.classList.remove("active");
        Toggler_mode=false;
    }
});
let NavListItems=document.querySelectorAll("header .container nav ul li a");
NavListItems.forEach((item)=>{
    item.addEventListener('click',()=>{
        NavListItems.forEach((item2)=>{
            item2.classList.remove("active");
        })
        item.classList.add('active');
    })
})
// slides 
let currenSlide=0;
let slides=document.querySelectorAll('.landing .slide');
let slidesArray=Array.from(slides);
let bulits=document.querySelectorAll('.landing .builts li');
let prev=document.querySelector('.prev');
let next=document.querySelector('.next');


prev.addEventListener("click",()=>{
    currenSlide--;
    theChecker();
    
})
next.addEventListener("click",()=>{
    currenSlide++;
    theChecker();
})

bulits.forEach((bulit1)=>{
    bulit1.onclick=()=>{
        currenSlide=bulit1.getAttribute('data-target');
        theChecker();
    }
})
    
function theChecker(){
    removeActive();
    setCurrentSlide();
    slidesArray[currenSlide].classList.add('active');
    bulits[currenSlide].classList.add('active');
}

function removeActive(){
    slidesArray.forEach((slide)=>{
        slide.classList.remove('active');
    })
    bulits.forEach((bulit)=>{
        bulit.classList.remove('active');
    })
}

function setCurrentSlide(){
    if(currenSlide<0){
        currenSlide=slides.length-1;
    }
    else if(currenSlide>=slides.length){
        currenSlide=0;
    }
}
//page progress line start
let timeLine = document.querySelector(".timeLine");
function updateTimeline() {
  let scrollTop = document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrollPercent = (scrollTop / height) * 100;
  timeLine.style.width = `${scrollPercent}%`;
}
window.addEventListener('scroll', updateTimeline);
let upBtn=document.querySelector('.up');
window.addEventListener('scroll',()=>{
  let scroll_Y=scrollY;
  if(scroll_Y>=400){
    upBtn.classList.add("active");
  }
  else{
    upBtn.classList.remove('active');
  }
})
upBtn.onclick=()=>{
    scroll({
    top:0,
    left:0,
    behavior:"smooth"
    })
  }
//  portfolio boxes 
let shuffels=Array.from(document.querySelectorAll('.portfolio .shuffle li'));
let boxes=Array.from(document.querySelectorAll(".portfolio .gallery .box"));

shuffels.forEach((shuffle)=>{
    shuffle.addEventListener('click',()=>{
        removeActiveForPortfolioSection();
        shuffle.classList.add('active');
        
        boxes.forEach((box)=>{
            if(shuffle.getAttribute('data-reference')==="all"){
                box.classList.add('active');
            }else if(box.getAttribute("data-reference") === shuffle.getAttribute("data-reference")){
            box.classList.add('active');
            }
        })
    })
})
function removeActiveForPortfolioSection(){
    shuffels.forEach((S)=>{
        S.classList.remove("active");
    })
    boxes.forEach((B)=>{
        B.classList.remove('active');
    })
}
// stats section part
let stats_Section=document.querySelector('.stats');
let boxesNumbers=document.querySelectorAll(".stats .container .box .number");
let functionOn=false;
window.addEventListener('scroll',()=>{
    if(scrollY>=stats_Section.offsetTop - 500){
        if(functionOn!=true){
                boxesNumbers.forEach((box)=>{
                numberCounter(box);
                });
        functionOn=true;
        }
    }
})
function numberCounter(box){
    let goal=parseInt(box.dataset.goal);
let count=setInterval(() => {
    box.textContent++;
    if(box.textContent==goal){
        clearInterval(count);
    }
},0.002);
}
// our skills part of js start
let Progress_spans=document.querySelectorAll(".ourSkills .container .skills .prog-holder .prog span");
let skillsSection=document.querySelector(".ourSkills");
window.addEventListener("scroll",()=>{
    if( scrollY >=skillsSection.offsetTop-200){
        Progress_spans.forEach((span)=>{
            span.style.width=span.dataset.width;
        })
    }
})
let testiSlides=document.querySelectorAll('.ourSkills .testimonials .Skillslides .testi_slide');
let skillsBuilts=document.querySelectorAll(".ourSkills .testimonials .bullets li");
skillsBuilts.forEach((skill)=>{
    skill.onclick=()=>{
        removeActiveFromSkills();
        skill.classList.add('active');
        let currentSkill=skill.getAttribute('data-target');
        testiSlides[currentSkill].classList.add('active');
    }
})
function removeActiveFromSkills(){
    testiSlides.forEach((testi)=>{
         testi.classList.remove('active');
    })
    skillsBuilts.forEach((skillB)=>{
        skillB.classList.remove('active');
    })
}
// text area validation part
let textAreaInput=document.querySelector(".contact .content form .message textarea");
let charCounter=document.querySelector(".contact .content form .message .Charlimit");
let charProgressBar=document.querySelector(".contact .content form .message .CharProgress");
let inputMaxLength=textAreaInput.getAttribute('maxlength');
let submitBtn=document.querySelector('.contact .submitBtn')
charCounter.innerHTML=inputMaxLength;
textAreaInput.addEventListener('input',()=>{
    let CurrentInputLength=textAreaInput.value.length;
    charCounter.innerHTML=inputMaxLength-CurrentInputLength;
    charProgressBar.style.width=`${(CurrentInputLength/inputMaxLength)*100}%`;
    if(charCounter.innerHTML==0){
        charCounter.classList.add('zero');
        charProgressBar.style.backgroundColor='red';
        submitBtn.style.cursor="not-allowed";
        submitBtn.setAttribute('title',"you have reached the limit :(");
    }
    else{
        charCounter.classList.remove('zero');
        charProgressBar.style.backgroundColor='var(--main-color)';
        submitBtn.style.cursor="pointer";
        submitBtn.setAttribute('title',"");
    }
})

