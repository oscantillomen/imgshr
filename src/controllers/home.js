const { Image } = require('../models');
const sidebar = require('../helpers/sidebar');

const ctrl = {};

ctrl.index = async (req, res) => {
    const images = await Image.find().sort({ 'timestamp': -1 });
    let viewModel = { images: {} };
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    res.render('index', viewModel);
};

ctrl.login = (req, res) => {
    res.render('login')
}

ctrl.signup = (req, res) => {
    res.render('signup')
}

module.exports = ctrl;