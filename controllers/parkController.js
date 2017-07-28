exports.getParks = (req, res) => {
    return res.json({
        success: true,
        parks: ['Park 1', 'Park 2']
    });
}