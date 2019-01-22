(function testRunner(exports) {

    class TestError {
        constructor(message) {
            this.message = message
        }
        toString() {
            return `Test Failed: ${this.message}`;
        }
    }

    const describe = (message, callback) => {
        logToDocument(message);
        callback();
    }

    const it = (message, callback) => {
        try {
            callback();
            logToDocument(message, '2em');
        } catch (error) {
            logToDocument(message, '2em', 'red');
            if (error instanceof TestError) {
                logToDocument(error.toString(), '4em', 'red');
            } else {
                logToDocument(error.stack, '4em', 'red');
            }
        }
    }

    const expect = (code) => ({
        toEq: (expected) => {
            if (code !== expected) {
                throw new TestError(`expected ${code} to equal ${expected}`)
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

    const logToDocument = (text, padding = '0', color = 'green') => {
        const testDiv = document.getElementById('tests');
        const paragraph = document.createElement('p');
        paragraph.innerText = text;
        paragraph.style = `color: ${color}; padding-left: ${padding}`;
        testDiv.appendChild(paragraph);
    }

    exports.describe = describe;
    exports.it = it;
    exports.expect = expect;

}(this));