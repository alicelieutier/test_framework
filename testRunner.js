(function testRunner(exports) {
    const testDiv = document.getElementById('tests');

    class TestError {
        constructor(message) {
            this.message = message
        }
        toString() {
            return `Test Failed: ${this.message}`;
        }
    }

    const describe = (message, callback) => {
        display(message);
        callback();
    }

    const it = (message, callback) => {
        try {
            callback();
            display(message, '2em');
        } catch (error) {
            display(message, '2em', 'red');
            if (error instanceof TestError) {
                display(error.toString(), '4em', 'red');
            } else {
                display(error.stack, '4em', 'red');
            }
        }
    }

    const expect = (code) => ({
        toEq: (expected) => {
            if (code !== expected) {
                throw new TestError(`expected ${code} to equal ${expected}`)
            }
        },
        toContain: (expectedString) => {
            if (code.search(expectedString) < 0) {
                throw new TestError(`expected ${code} to contain "${expectedString}"`);
            }
        },
        toBeEmpty: () => {
            if (code.trim() !== '') {
                throw new TestError(`expected ${code} to be an empty string`);
            }
        },
        toThrow: (expectedErrorMessage) => {
            let codeContent = code.toString().match('.*{(.*)}')[1];
            try {
                code();    
            } catch (error) {
                if (error.message !== expectedErrorMessage) {
                    throw new TestError(`expected ${codeContent} to throw "${expectedErrorMessage}" but instead threw: \n${error.stack}`);
                }
                return;
            }
            throw new TestError(`expected ${codeContent} to throw an error`);
        },
        notToThrow: () => {
            code();
        }
    })

    const display = (text, padding = '0', color = 'green') => {
        const paragraph = document.createElement('p');
        paragraph.innerText = text;
        paragraph.style = `color: ${color}; padding-left: ${padding}`;
        testDiv.appendChild(paragraph);
    }

    exports.describe = describe;
    exports.it = it;
    exports.expect = expect;

})(this);