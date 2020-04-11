const queries = {};

queries.get = {
    rid: /*[staff_id]*/
        `SELECT usr_id as staff_id, res_id as rid FROM RestaurantStaffs WHERE usr_id = $1`,
    profile: /*[res_id]*/
        `SELECT * FROM Restaurants WHERE res_id = $1`,
    allMenuItems: /*[res_id]*/
        `SELECT * FROM MenuItems NATURAL JOIN FoodItems WHERE res_id = $1`,
    allFoodCategories:
        `SELECT * FROM FoodCategories`,
    foodItem: /*[food_id]*/
        `SELECT * FROM MenuItems NATURAL JOIN FoodItems WHERE food_id = $1`,
    allReviews: /*[res_id]*/
        `SELECT order_id, usr_id, listOfItems, food_rev, delivery_rating FROM Reviews NATURAL JOIN Orders WHERE res_id = $1`,
    allIncompleteOrders: /*[res_id]*/
        `SELECT * FROM Orders WHERE res_id = $1 AND status <> 'complete'`,
    allCompletedOrders: /*[res_id]*/
        `SELECT * FROM Orders WHERE res_id = $1 AND status = 'complete'`,
    allOrders:
        `SELECT * FROM Orders WHERE res_id = $1`,
    allPromos: /*[res_id]*/
        `SELECT * FROM Promotions WHERE res_id = $1`,
    allCurrentOrFuturePromos: /*[res_id, now_timestamp]*/
        `SELECT * FROM Promotions WHERE res_id = $1 AND end_day > $2`
}

queries.update = {
    profile: `CALL updateRestaurantProfile($1, $2, $3, $4)`, /*res_id, rname, address, min_amt*/
    foodItem: `CALL updateRestaurantFoodItem($1, $2, $3, $4, $5, $6, $7)`, /*fid, price, dailyLmt, name, desc, imgpath, category*/
    foodItemCategory: `CALL updateCategoryOf($1, $2)`, /*fid, cat*/
    dailySoldFoodItemCount: `CALL incrementSoldFoodItem($1)`, /*fid*/
    resetDailySells: `CALL resetDailySellsForFoodItem($1)`, /*fid*/
    promo: `CALL updateRestaurantPromo($1, $2, $3, $4)` /*pid, desc, startDay, endDay*/
}

queries.add = {
    menuItem: `CALL addRestaurantMenuItem($1, $2, $3, $4, $5, $6, $7, $8)`, /*res_id, food_id, fname, fdesc, price, daily_limit, fimgPath, fcategory*/
    promo: `CALL addRestaurantPromo($1, $2, $3, $4, $5)` /*pid, rid, desc, startday, endday*/
}

queries.del = {
    foodItem: `CALL deleteFoodItem($1)` /*fid*/
}

module.exports = queries;

