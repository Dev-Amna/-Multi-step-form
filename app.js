// selecting the elements
let linkBtns = document.querySelectorAll(".btn");
let allForm = document.querySelectorAll('.main-form > div');
let nextBtn = document.querySelectorAll('.next-btn');
let backBtn = document.querySelectorAll('.back-btn');
let confirmBtn = document.querySelector(".confirm-btn")
let thanks = document.querySelector(".step-five");

// side bar btn
function sideBarBtn(currBtn){
    linkBtns.forEach((btn,idx)=>{
        if(idx === currBtn){
            btn.classList.add("act");
        }else{
            btn.classList.remove("act");
        }
    })
}
// functiontly
allForm.forEach((content, idx)=>{
    if(idx !== 0){
        content.style.display = "none";
    }
})

linkBtns.forEach((btns, idx)=>{
    btns.addEventListener("click", function(){
        allForm.forEach(content =>{
        content.style.display = "none";
    })

    allForm[idx].style.display = "block";
    sideBarBtn(idx);
    })

})



// next step
nextBtn.forEach((btns ,idx)=>{
    btns.addEventListener("click", function(){
        let input = allForm[idx].querySelectorAll("input");
        let filled = true;

        input.forEach(inp => {
            let value = inp.value.trim();
            let type = inp.type;

            // Check if empty
            if (value === "") {
                filled = false;
                inp.style.border = "1px solid red";
            }
            // Email validation
            else if (type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
                filled = false;
                inp.style.border = "1px solid red";
            }
            // Phone number: only digits & max 11 characters
            else if (inp.name === "phone" && !/^\d{1,11}$/.test(value)) {
                filled = false;
                inp.style.border = "1px solid red";
 
            }
            // If all okay
            else {
                inp.style.border = "1px solid hsl(229, 24%, 87%)";
            }

            // Reset on input
            inp.addEventListener("input", function(){
                inp.style.border = "1px solid hsl(229, 24%, 87%)";
            });
        });

        if(filled){
            allForm[idx].style.display = "none";
            if(idx < allForm.length - 1){
                allForm[idx + 1].style.display = "block";
                sideBarBtn(idx + 1);
            }
        }
    });
});


 // back step
backBtn.forEach((btns)=>{
    btns.addEventListener("click", function(){
        let currtIdx ;
        allForm.forEach((form, index)=>{
            if(form.style.display  !==  "none"){
                currtIdx = index;
            }
        })
        if(currtIdx > 0){
        allForm[currtIdx].style.display = "none";
        allForm[currtIdx - 1].style.display = "block";
         sideBarBtn(currtIdx - 1);
        }
    })
})

   // Confirm Button

confirmBtn.addEventListener("click", function () {
    allForm.forEach((form)=>{
        form.style.display = "none"
    })
    thanks.style.display = "flex";  
    
});
