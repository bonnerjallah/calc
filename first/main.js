(function(){
    let screen = document.querySelector(".screen");
    let buttons = document.querySelectorAll(".btn");
    let clear = document.querySelector(".btn-clear");
    let equal = document.querySelector(".btn-equal");
    let del = document.querySelector(".delete");


    buttons.forEach(function(button){
        button.addEventListener("click", (e)=> {
            let value = e.target.dataset.num;
            screen.value += button.innerText;
        })
    })

    equal.addEventListener("click", (e)=>{
        if(screen.value === ""){
            screen.value = "";
        } else {
            let answer = eval(screen.value);
            screen.value = answer;
        }
    })

    clear.addEventListener("click", (e)=>{
        screen.value = "";
    })

    del.addEventListener("click", (e) => {
        let currentValue = screen.value.toString();
        if (currentValue.length > 0) {
          screen.value = currentValue.slice(0, -1);
        }
      });


})();