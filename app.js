// import functions and grab DOM elements
import { renderMushroom, renderFriend, renderBerry } from './render-utils.js';

const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const berriesEl = document.querySelector('.berries');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.getElementById('add-friend-button');
// initialize state

let mushroomCount = 3;
let berryCount = 2;
const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
        preference: '🍓',
    },
    {
        name: 'Sarah',
        satisfaction: 3,
        preference: '🍄',
    },
    {
        name: 'Missael',
        satisfaction: 1,
        preference: '🍓',
    },
    {
        name: 'Soraya',
        satisfaction: 2,
        preference: '🍄',
    },
];

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        if (Math.random() > 0.5) {
            alert('found a mushroom!');

            mushroomCount++;
            displayMushrooms();
        } else {
            alert('no luck!');
        }
    } else {
        if (Math.random() > 0.5) {
            alert('found a berry!');

            berryCount++;
            displayBerries();
        } else {
            alert('no luck!');
        }
    }
});

addFriendButton.addEventListener('click', () => {
    // get the name from the input
    // create a new friend object
    const invitedFriend = friendInputEl.value;
    const friend = {
        name: invitedFriend || `rando #${Math.ceil(Math.random() * 100)}`,
        satisfaction: 1,
        preference: Math.random() > 0.5 ? '🍄' : '🍓',
    };
    // push it into the friends state array, passed in as an argument
    friendData.push(friend);
    // clear out the input element
    friendInputEl.value = '';
    // clear out and display all the friends (use a function here)
    displayFriends();
});

function displayFriends() {
    // clear out the friends in DOM
    friendsEl.textContent = '';
    // for each friend in state . . .
    for (let friend of friendData) {
        // use renderFriend to make a friendEl
        const friendEl = renderFriend(friend);

        // this is a clickable list, so . . .
        //     add an event listener to each friend
        friendEl.addEventListener('click', () => {
            // and if the friend's satisfaction level is below 3 and you have mushrooms left
            if (friend.preference === '🍄') {
                if (mushroomCount === 0) {
                    alert('Go foraging to find more mushrooms');
                }
                if (friend.satisfaction < 3 && mushroomCount > 0) {
                    friend.satisfaction++;
                    mushroomCount--;
                    // increment the friends satisfaction and decrement your mushrooms
                    // clear out and display the updated friends and mushrooms (hint: displayFriends, displayMushrooms)
                    displayFriends();
                    displayMushrooms();
                }
            } else if (friend.preference === '🍓') {
                if (berryCount === 0) {
                    alert('Go forging to find more berries');
                }
                if (friend.satisfaction < 3 && berryCount > 0) {
                    friend.satisfaction++;
                    berryCount--;
                    displayFriends();
                    displayBerries();
                }
            }
        });

        // append the friendEl to the friends list in DOM
        friendsEl.append(friendEl);
    }
}
function displayMushrooms() {
    // clear out the mushroom div
    mushroomsEl.textContent = '';
    for (let i = 0; i < mushroomCount; i++) {
        // for each mushroom in your mushroom state, render and append a mushroom
        const mushroomEl = renderMushroom();
        mushroomsEl.append(mushroomEl);
    }
}
function displayBerries() {
    berriesEl.textContent = '';
    for (let i = 0; i < berryCount; i++) {
        const berryEl = renderBerry();
        berriesEl.append(berryEl);
    }
}

displayFriends();
displayMushrooms();
displayBerries();
