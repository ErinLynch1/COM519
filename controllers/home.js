const records = require('../models/records');

exports.list = async (req, res) => {
    console.log(req.session);
    try {

        const totalRecords= await Records.find({}).count();
        const userCountSummaryRef = await users.aggregate(
            [
                { $match: { user_firstname: { $ne: null } } },
                {
                    $group: {
                        _id: "$user_id",
                        total: { $sum: 1 }
                    }
                }]);

        const userCountSummary = userCountSummaryRef.map(t => ({ name: t._id, total: t.total }));
        res.render("index", { userCountSummary: userCountSummary, totalRecords: totalRecords});

    } catch (e) {
        res.status(404).send({
            message: `error rendering page`,
        });
    }
}