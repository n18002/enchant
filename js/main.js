(function(){
    var button = document.getElementById('start');
    button.onclick = function(){
        start();
    }
    function start() {
        var cards = [],
            CARD_NUM = document.getElementById('mode').value,
            currentNum,
            openedCard,
            correctNum = 0,
            enableFlip = true,
            score = 0,
            timerId;
        button.style.display = 'none';
        function flip(card) {
            if(!enableFlip){
                return;
            }
            if(card.value != '?'){
                return;
            }
            card.value = card.dataset.num;
            card.src = './img/'+card.dataset.num+'.png';
            if (typeof currentNum === 'undefined') {
                openedCard = card;
                currentNum = card.dataset.num;
            }else{
                judge(card);
                currentNum = undefined;
            }
        }
        function judge(card) {
            if (currentNum == card.dataset.num) {
                correctNum++;
                if (correctNum == CARD_NUM /2) {
                    clearTimeout(timerId);
                    alert("Your score is " + document.getElementById('score').innerHTML);
                    button.style.display = 'inline-block';
                    button.innerHTML = "Restart";
                }
            }else{
                enableFlip = false;
                setTimeout(function() {
                    openedCard.value = '?';
                    openedCard.src = './img/hatena.png';
                    card.value = '?';
                    card.src = './img/hatena.png';
                    enableFlip = true;
                }, 200);
            }
        }
        function initCards() {
            var num,
                cardIndex,
                i,
                stage = document.getElementById('stage');
            
            var chiledNum = stage.childNodes.length;
            for(i = 0; i < chiledNum; i++){
                stage.removeChild(stage.firstChild);
            }
            for (i = 0; i < CARD_NUM; i++) {
                num = Math.floor(i /2);
                do{
                    cardIndex = Math.floor(Math.random() * CARD_NUM);    
                } while(typeof cards[cardIndex] !== 'undefined');
                cards[cardIndex] = createCard(num);
            }
            for (var i = 0; i < CARD_NUM; i++) {
                stage.appendChild(cards[i]);
                if(i % Math.sqrt(CARD_NUM) == (Math.sqrt(CARD_NUM) - 1)){
                    stage.appendChild(document.createElement('br'));
                }
            }
        }
        function runTimer(){
            document.getElementById('score').innerHTML = score++;
            timerId = setTimeout(function (){
                runTimer();
            }, 10);
        }
        function createCard(num) {
            var card = document.createElement('input');
            card.type = 'image';
            card.value = '?';
            card.src = './img/hatena.png';
            card.dataset.num = num;
            card.onclick = function() {
                flip(this);
            };
            return card;
        }
         initCards();
        runTimer();
    }
})(); 