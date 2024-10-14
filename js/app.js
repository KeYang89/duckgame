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
const $ballooninfo = $('#ballooninfo')

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
    ducksWithFish: new Set(), // Track ducks with fish in their mouths
};

const directions = [90, -270, 270, 450, -450, -630];

// Initialize money display
$moneyBag.html(state.money);
$progressMessage.hide();

// Show #ballooninfo with a fade-in effect over 0.5 seconds
$ballooninfo.fadeIn(500);  

// Generate Grass
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

// Duck feeding logic: Feed another duck if carrying fish
function feedOtherDuck(duckWithFish) {
    const $targetDuck = findNearbyDuck(duckWithFish);
    if (!$targetDuck) return; // No other duck nearby

    // Initiate feeding animation and logic
    $targetDuck.addClass('eating').html('<div class="fish-icon"></div>');
    setTimeout(() => {
        $targetDuck.removeClass('eating');
        growDuck($targetDuck);
    }, 2000); // Feeding animation lasts 2 seconds

    // Remove fish from the original duck
    duckWithFish.removeClass('carrying-fish');
    state.ducksWithFish.delete(duckWithFish);
}

// Find a nearby duck within a certain distance
function findNearbyDuck($duck) {
    const position = $duck.position();
    const nearbyDuck = $('.duck').not($duck).filter(function () {
        const otherPos = $(this).position();
        const distance = Math.hypot(otherPos.left - position.left, otherPos.top - position.top);
        return distance < 100; // Only ducks within 100px can feed each other
    }).first();
    return nearbyDuck.length ? nearbyDuck : null;
}

// Allow a duck to carry fish in its mouth
function giveFishToDuck($duck) {
    $duck.addClass('carrying-fish');
    state.ducksWithFish.add($duck);

    // Attempt to feed another duck after carrying fish
    setTimeout(() => feedOtherDuck($duck), 3000); // Duck tries feeding after 3 seconds
}

// Duck growth function
function growDuck($duck) {
    if ($duck.width() < 112) {
        $duck.addClass("fledgling").animate({ height: '+=25px', marginTop: '-=12px' }, 500);
        $('.newrow').animate({ marginTop: '-=6px' }, 500);
    } else {
        $duck.removeClass("fledgling").addClass("mature");
        layEgg($duck);
    }
}

// Lay egg function
function layEgg($duck) {
    $('<div class="egg"></div>').insertAfter($duck);
}

// Handle duck click to give it fish if available
$('.duck').on('click', function () {
    const $this = $(this);
    if (state.money >= 3 && !$this.hasClass('carrying-fish')) {
        state.money -= 3;
        $moneyBag.html(state.money);
        giveFishToDuck($this);
    }
});

// Egg hatching
$('.duckegg').on('click', function () {
    const $this = $(this);
    $this.replaceWith('<img src="img/break-egg.gif" class="hatched nofish">');
    state.hatchNum++;
});

// Purchase Shrimp function
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

// Fish growth function
function growFish() {
    const randomSize = () => Math.floor(Math.random() * 20);
    $('.regularfish1').width((i, w) => w + randomSize());
    $('.regularfish2').width((i, w) => w + randomSize());
}

// Owl purchase
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
// Duck deceased
function die($duck) {
    $duck.addClass('dead-duck');  // Apply gray-white effect
    
    // Remove or hide the duck after a while (if needed)
    setTimeout(() => {
        $duck.fadeOut(2000, () => $duck.remove());
    }, 5000); // Duck fades out after 5 seconds
}
