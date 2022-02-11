const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let countMatches = 0;
let countFlips = 0;

//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    countFlips++;
    checkForMatch();

    if (countMatches == 6) {
        setTimeout(() => {
            var resultado = confirm(`Parabéns\nVocê finalizaou o jogo em ${countFlips} jogadas. Deseja jogar novamente?`)
            if (resultado === true) {
                startGame();
            }
        }, 1000);
    }
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        countMatches++;
        disableCards();
        return;
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
};

function startGame() {

    countFlips = 0;
    countMatches = 0;

    resetBoard();

    cards.forEach((card) => {
        card.classList.remove('flip');
    });

    setTimeout(() => {
        shuffle();
    }, 500);

    cards.forEach((card) => {
        //adiciona evento de clique na carta
        card.addEventListener('click', flipCard)
    });

}

startGame();