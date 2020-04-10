const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const fc = require('../function');
module.exports =  async (req, res,next) => {
    console.log(req.user);
    var out= [];
    const data = await pool.query(sql.customer.queries.get_orders, [req.user.usr_id])
    for (const d of data.rows) {
        const x = await fc.foodItemConvert(d);
        // console.log(x);
        const output = {
            order_id:d.order_id,
            res_id:d.res_id,
            rname:d.rname,
            listofitems:x,
            total: d.total,
            payment: d.payment,
            status: d.status
        }
        out.push(output);
    }     


    res.send(out);
    
}
