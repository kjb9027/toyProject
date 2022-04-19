// 전역변수를 선언하지 않기 위해 괄호 안에 작성
(()=>{
    // 엘리먼트 태그들에게 data- 속성 추가해주기
    const graphicElems = document.querySelectorAll('.graphic-item');
    const stepElems = document.querySelectorAll('.step');
    // 현재 활성화 된 graphicElem(visible클래스가 붙은)
    let currentItem;
    for(let i = 0; i < graphicElems.length; i++){
        graphicElems[i].dataset.idx = i;
        stepElems[i].dataset.idx = i;
    }
    window.addEventListener('scroll',()=>{
        let step;
        let boundingRect;
        // console.log(window.innerHeight * 0.1);
        // console.log(window.innerHeight * 0.8);
        // console.log(stepElems[0].getBoundingClientRect());
        for(let i = 0; i < graphicElems.length; i++){
            step = stepElems[i];
            boundingRect = step.getBoundingClientRect();
            if(boundingRect.top > window.innerHeight * 0.1 && 
               boundingRect.top < window.innerHeight * 0.8 ){
                   if(currentItem){
                       currentItem.classList.remove('visible');
                   }
                currentItem = graphicElems[step.dataset.idx];
                currentItem.classList.add('visible');
            }
        }
    })
})();
