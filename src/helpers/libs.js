const helpers = {};

helpers.randomNumber = () => {
    const possible = 'abcdefghijklmnñopqrstuvwxyz1234567890';
    let randomNumber = 0;
    for (let i = 0; i < 10; i++) {
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomNumber;
}

module.exports = helpers;