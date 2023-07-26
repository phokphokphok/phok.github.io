function handleEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        generateEmojis();
    }
}

function generateEmojis() {
    const emojiCountInput = document.getElementById('emojiCount');
    const emojiCount = parseInt(emojiCountInput.value) || 1;
    const emojisContainer = document.getElementById('emojisContainer');

    fetch('https://emoji-api.com/emojis?access_key=da6fced3f55ae9a7e5e53870d0877f467a583591')
        .then(response => response.json())
        .then(data => {
            const emojis = getRandomEmojis(data, emojiCount);
            emojisContainer.innerHTML = ''; // Clear previous content
            emojis.forEach(emoji => {
                const span = document.createElement('span');
                span.textContent = emoji.character;
                span.setAttribute('title', emoji.slug); // Set alt text as tooltip
                emojisContainer.appendChild(span);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getRandomEmojis(data, count) {
    const emojis = data.map(emoji => ({
        character: emoji.character,
        name: emoji.name
    }));
    const randomEmojis = [];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * emojis.length);
        randomEmojis.push(emojis[randomIndex]);
    }

    return randomEmojis;
}

function copyEmojis() {
    const emojisContainer = document.getElementById('emojisContainer');
    const emojisText = emojisContainer.textContent.trim();
    const copyButton = document.querySelector('.copy');

    if (emojisText) {
        navigator.clipboard.writeText(emojisText)
            .then(() => {
                const copiedSpan = document.createElement('span');
                copiedSpan.textContent = 'Copied';
                copyButton.appendChild(copiedSpan);
                setTimeout(() => {
                    copiedSpan.remove();
                }, 1000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        alert('No emojis to copy!');
    }
}

const themeSwitch = document.getElementById('themeSwitch');
const root = document.documentElement;

function toggleTheme() {
    if (themeSwitch.checked) {
        root.style.setProperty('--bg-color', '#222222');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--box-bg-color', '#333333');
        root.style.setProperty('--slider-color', '#cccccc');
        root.style.setProperty('--slider-color-checked', '#6b6b6b');

    } else {
        root.style.setProperty('--bg-color', '#008000');
        root.style.setProperty('--text-color', '#000000');
        root.style.setProperty('--box-bg-color', '#ffa500');
        root.style.setProperty('--slider-color', '#cccccc');
        root.style.setProperty('--slider-color-checked', '#6b6b6b');
    }
}

// Set the theme on initial load
toggleTheme();