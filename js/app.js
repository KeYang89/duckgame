/***
 *      _           _                 _            _    
 *     | |         | |               | |          | |   
 *     | |__   ___ | |__   ___     __| |_   _  ___| | __
 *     | '_ \ / _ \| '_ \ / _ \   / _` | | | |/ __| |/ /
 *     | | | | (_) | |_) | (_) | | (_| | |_| | (__|   < 
 *     |_| |_|\___/|_.__/ \___/   \__,_|\__,_|\___|_|\_\
 *                                                      
 * I wish you like this game, or find the script useful in some wway. 
 * If you have any question, drop me a line: yangkecoy@gmail.com
 * Engjoy coding.                                                      
 */
// Cached selectors
const $moneyBag = $('#moneybag');
const $progressMessage = $(".progressmessage");
const $grass = $('.grass')[0];

let state = {
    hatchTime: 2100,
    bubbleTime: 2700,
    money: 25,
    ducklingWords: 0,
    rowNum: 0,
    hasRareFish: false,
    hasRareDuck: false,
    rareDuckNum: 0,
    duckNum: 2,
    sellNum: 0,
    vacantNum: 0,
    hatchNum: 0,
    duckPerRow: 14,
    levelUpDuckNum: 2,
    rareDuckMessage: true,
    ravenNum: 1,
    levelUp: false,
};

const directions = [90, -270, 270, 450, -450, -630];
const progressMessages = [
    'Thanks for the elixir! You now have a rare mutant duck!',
    'Wow, you are Level 2 now! You receive one silver coin!',
    'Wow, you are Level 3 now! You receive two gold coins!',
    'Congratulations! You are Level 4 now! You get three gold coins! Try the elixir!',
    'You got a pair of mutants! Feed them and check their eggs!',
    'Catch the rare fish before they leave! Rare fish can mutate your ducklings!',
];
const randomQuotes = [
    "It takes more than one rare duck to make rare eggs!",
    "When in doubt, mumble.",
    "I intend to live forever. So far, so good.",
    "AI is no match for natural stupidity.",
    "Change is inevitable, except from a vending machine.",
    "We never grow up; we learn to act in public.",
    "My creator thinks I'm too cute to be real.",
    "Laugh at your problems; everyone else does.",
    "A clear conscience is a sign of a bad memory.",
    "You're never too old to learn something stupid.",
    "He who smiles in a crisis found someone to blame.",
];

// Initialize money display
$moneyBag.html(state.money);

// Hide progress message initially
$progressMessage.hide();

// Grass generation
function generateGrass(num, nutrient) {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < num; i++) {
        let blade = document.createElement('div');
        let height = Math.floor(Math.random() * 20) + nutrient;
        let left = Math.floor(Math.random() * (window.innerWidth - 8));
        let rotation = Math.floor(Math.random() * 10) - 5;

        Object.assign(blade.style, {
            height: `${height + 10}px`,
            zIndex: height,
            opacity: height * 0.02,
            left: `${left}px`,
            transform: `rotate(${rotation}deg)`
        });

        fragment.appendChild(blade);
    }
    $grass.appendChild(fragment);
}
generateGrass(200, 0);

// Progress messages display
function showProgress(num) {
    $progressMessage.html(progressMessages[num]).fadeIn(300).fadeOut(4500);
}

// Egg holder function with better margin calculation
function createEggHolder(dirIndex) {
    const margin = `calc(50% ${directions[dirIndex] >= 0 ? '+' : '-'} ${Math.abs(directions[dirIndex])}px)`;
    const holderHTML = `
        <div class="holder newholder">
            <div class="floatingmaterial"></div>
            <div class="floatingmaterial fmbottomleft"></div>
            <div class="floatingmaterial fmbottomright"></div>
        </div>`;

    $(holderHTML).insertAfter('.current').css('margin-left', margin).removeClass('newholder');
}

// Event handlers with debouncing
function setupInfoPopup(selector) {
    const $info = $(selector);
    $info.show().fadeOut(3000);
}

function owlPurchase() {
    if (state.money >= 2) {
        state.money -= 2;
        $moneyBag.html(state.money);

        $('#wind').show();
        $('.raven, .owlwrap, .ravenAttack').hide();

        setTimeout(() => {
            $('#wind').hide();
            $('.raven').fadeIn();
            $('.owlwrap, .ravenAttack').fadeIn();
        }, 8000);
    } else {
        $('<div class="speakbubble small hint">Owl costs $2<br>Try something else!</div>').insertBefore('#moneybag');
    }
}

function growFish() {
    const randomSize = () => Math.floor(Math.random() * 20);
    $('.regularfish1').width((i, w) => w + randomSize());
    $('.regularfish2').width((i, w) => w + randomSize());
}

function purchaseShrimp() {
    if (state.money >= 5) {
        state.money -= 5;
        $moneyBag.html(state.money);

        $('.shrimpwrap').addClass('rotatebag');
        $('.shrimp').addClass('rotatedrop');

        setTimeout(() => {
            growFish();
            $('.shrimpwrap').removeClass('rotatebag');
            $('.shrimp').removeClass('rotatedrop');
        }, 1600);
    } else {
        $('<div class="speakbubble small hint">Shrimp costs $5<br>Try something else!</div>').insertBefore('#moneybag');
    }
}

function useElixir() {
    if (state.money >= 20) {
        state.money -= 20;
        state.hasRareFish = true;
        $moneyBag.html(state.money);

        $('#elixir').addClass('rotated');
        $('.bottle_top').addClass('rotatespin');
        $('.bottle_inner>.water').addClass('pour');

        setTimeout(() => {
            $('<div class="veryrarefish"></div>').appendTo('.fishgroup1');
            $('<div class="rarefish"></div>').appendTo('.fishgroup2');
        }, 3000);

        setTimeout(() => {
            $('.rarefish, .veryrarefish').remove();
        }, 30000);
    } else {
        $('<div class="speakbubble small hint">Elixir costs $20<br>Try something else!</div>').insertBefore('#moneybag');
    }
}

// Duck growth and animations optimized
function growDuck($duck) {
    if ($duck.width() < 112) {
        $duck.addClass("fleging").animate({ height: '+=25px', marginTop: '-=12px' }, 500);
        $('.newrow').animate({ marginTop: '-=6px' }, 500);
    } else {
        $duck.removeClass("fleging").addClass("mature");
        layEgg($duck);
    }
}

function layEgg($duck) {
    $('<div class="egg"></div>').insertAfter($duck);
}

// Optimized event listeners
$('.duckegg').on('click', function () {
    let $this = $(this);
    $this.replaceWith('<img src="img/break-egg.gif" class="hatched nofish">');
    state.hatchNum++;
});

