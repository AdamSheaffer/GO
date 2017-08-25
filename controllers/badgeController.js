const User = require('../models/User');

exports.getBadges = async (req, res) => {
    const userId = req.params.userId;

    if (!userId) return res.json({ success: false, message: 'You must suplly a user id' });

    const { badges } = await User.findById(userId).populate('badges');

    return res.json({ success: true, badges });
}