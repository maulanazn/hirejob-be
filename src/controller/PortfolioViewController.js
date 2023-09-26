const { getPortfolioViewModel } = require("../model/PortfolioViewModel");

const getPortfolioPageViewController = async (req, res) => {
    const {id} = req.params;

    try {
        const result = await getPortfolioViewModel(id);

        return res.status(200).json({
            status: "Success",
            message: "Success getting portfolio view",
            data: result.rows
        });
    } catch (error) {
        return res.status(400).json({
            status: "Bad request",
            message: "Failed to getting portfolio view"
        })
    }
}

module.exports = {getPortfolioPageViewController};