const { Image, Comment } = require('../models');

const imagesCounter = async () => await Image.countDocuments();

const commentsCounter = async () => await Comment.countDocuments();

const imageTotalViewsCounter = async () => {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' }
        }
    }]);
    return result[0].viewsTotal;
}

const likesTotalCounter = async () => {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: { $sum: '$likes' }
        }
    }]);
    return result[0].likesTotal;
}

module.exports = async () => {
    const results = await Promise.all([
        imagesCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ]);
    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }
}