const { getUserView, getSocmedView, getPortfolioView, getWorkExpView } = require("../model/PortfolioViewModel");

const getPortfolioPageViewController = async (req, res) => {
    const id = req.params.id;
    
    try {
        const user_result = await getUserView(id);
        const sosmed_result = await getSocmedView(id);
        const portfolio_result = await getPortfolioView(id);
        const workexp_result = await getWorkExpView(id);
        
        return res.status(200).json({
            status: "success",
            message: "success get all portfolio by user",
            data: {
                user: user_result.rows,
                sosmed: sosmed_result.rows,
                portfolio: portfolio_result.rows,
                workexp: workexp_result.rows
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: "Bad request",
            message: "Failed to getting portfolio view"
        })
    }
}

module.exports = {getPortfolioPageViewController};