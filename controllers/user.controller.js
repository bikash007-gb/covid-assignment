const User = require("../model/user.model")
const asyncHandler = require("../middlewares/asyncHandler.middleware")
const ErrorResponse = require("../utils/errorResponse.util")
const CommonUtils = require("../utils/common")

/**
 * @description user entry in database
 * @route POST /user
 */
exports.userEntry = asyncHandler(async (req, res, next) => {
    req.body.ipAddress = req.ip
    const user = await User.create(req.body)
    res.status(201).json({
        success: true,
        message: "Successfully created user entry",
    })
})

/**
 * @description get vaccination report
 * @route GEt /user/:from/:to
 * @params {from} start date    {to} end date-----> Mandatory
 * @QueryString {location} state   {filter} grouping reports by daily,weekly,monthly,yearly------> Optional
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
    const from = req.params.from
    const to = req.params.to

    const condition = {
        createdAt: { $gte: parseInt(from), $lte: parseInt(to) },
    }
    if (req.query.location) {
        condition["location"] = req.query.location
    }

    let group = {}
    if (req.query.filter) {
        const arr = req.query.filter.split(",")
        group = _grouped(arr)
    }

    //using aggregate pipeline to calculate data
    const users = await User.aggregate([
        {
            $match: condition,
        },

        {
            $group: {
                _id: group,
                Total: { $sum: 1 },
            },
        },
    ])

    if (users.length === 0) {
        return next(new ErrorResponse("No users found", 404))
    }

    res.status(200).json({
        success: true,
        data: users,
    })
})

const _grouped = (arr) => {
    let d = {}
    if (arr.includes("yearly")) {
        d.year = { $year: { $toDate: "$createdAt" } }
    }
    if (arr.includes("monthly")) {
        d.month = { $month: { $toDate: "$createdAt" } }
    }
    if (arr.includes("weekly")) {
        d.week = { $week: { $toDate: "$createdAt" } }
    }
    if (arr.includes("daily")) {
        d.day = { $dayOfMonth: { $toDate: "$createdAt" } }
    }
    return d
}
