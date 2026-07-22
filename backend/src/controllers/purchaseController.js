const Purchase = require('../models/Purchase');

// GET /api/purchases - get all purchases (admin)
const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate('vehicle', 'make model price images')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/purchases/my - get logged in user's purchases
const getMyPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user.id })
      .populate('vehicle', 'make model price images')
      .sort({ createdAt: -1 });

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/purchases/stats - get purchase stats for dashboard
const getPurchaseStats = async (req, res) => {
  try {
    const totalPurchases = await Purchase.countDocuments();

    // get purchases for last 7 days grouped by day
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyPurchases = await Purchase.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({ totalPurchases, dailyPurchases });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllPurchases, getMyPurchases, getPurchaseStats };