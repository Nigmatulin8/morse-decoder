const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

const NEW_MORSE = newMorse(MORSE_TABLE);

function decode(expr) {
    let decoded = '';
    let letter = '';

    for(let i = 0, length = expr.length; i < length; i++) {
        if(expr[i] === '*') {
            decoded += ' ';
            letter = '';
            i += 9;
        }

        else {
            letter += expr[i];

            if (letter.length === 10) {
                decoded += NEW_MORSE[letter];
                letter = '';
            }
        }
    }

    return decoded;
}


function newMorse(morse) {
    let digital_morse = {};
    let rev_digital_morse = {};
    let counter = 0;

    for(let key in morse) {
        if(morse.hasOwnProperty(key)) {
            digital_morse[morse[key]] = '';
            for(let i = 0; i < key.length; i++) {
                if(key[i] === '.') {
                    digital_morse[morse[key]] += '10';
                }

                else if (key[i] === '-') {
                    digital_morse[morse[key]] += '11';
                }
            }
        }

        let errLen = digital_morse[morse[key]].length
        if(errLen < 10) {

            let add = Array.from(Array(10 - errLen), () => 0);
            digital_morse[morse[key]] = add.toString().replace(/[,]/g,"") + 
                                                                    digital_morse[morse[key]];
        }
    }

    for(let key in digital_morse) {
        if(digital_morse.hasOwnProperty(key)) {
            rev_digital_morse[digital_morse[key]] = key;
        }
    }

    return rev_digital_morse;
}

module.exports = {
    decode
}