const { GetPortfolioViewModel } = require("../model/PortfolioViewModel");

const GetPortfolioPageViewController = async (req, res) => {
    const {id} = req.params;

    try {
        const result = await GetPortfolioViewModel(id);

        return res.status(200).json({
            status: "Success",
            message: "Success getting portfolio view",
            data: result.rows
        });
    } catch (error) {
        return res.status(400).json({
            status: "Failed",
            message: "Failed to getting portfolio view"
        })
    }
}

module.exports = {GetPortfolioPageViewController};