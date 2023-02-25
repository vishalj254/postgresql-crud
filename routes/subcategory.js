const pool = require("./api/pool");
const { queryPostData, queryUpdateData } = require("./api/helpers");

const router = require("express").Router();

router.get("/", function (req, res) {
  pool.query(
    "select S.*,C.categoryname from subcategory S, category C where C.id=S.category",
    function (err, result) {
      if (err) {
        res
          .status(500)
          .json({ status: false, message: err.toString(), data: [] });
      } else {
        res
          .status(200)
          .json({ status: false, message: "Data found!", data: result.rows });
      }
    }
  );
});

router.post("/", function (req, res) {
  const { keys, values } = queryPostData(req.body);
  var qry = `insert into subcategory(${keys}) values (${values})`;
  pool.query(qry, function (err) {
    if (err) {
      res
        .status(500)
        .json({ status: false, message: err.toString(), data: req.body });
    } else {
      res
        .status(200)
        .json({ status: false, message: "Data Inserted!", data: req.body });
    }
  });
});

router.put("/:id", function (req, res) {
  const { id } = req.params;
  const { keys } = queryUpdateData(req.body);
  var qry = `update subcategory set ${keys} where id=$1`;
  pool.query(qry, [id], function (err) {
    if (err) {
      res.status(500).json({
        status: false,
        message: err.toString(),
        data: { ...req.body, ...req.params },
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Data updated!",
        data: { ...req.body, ...req.params },
      });
    }
  });
});

router.delete("/:id", function (req, res) {
  const { id } = req.params;
  pool.query("delete from subcategory where id=$1", [id], function (err) {
    if (err) {
      res
        .status(500)
        .json({ status: false, message: err.toString(), data: req.params });
    } else {
      res.status(200).json({
        status: false,
        message: "Data deleted!",
        data: req.params,
      });
    }
  });
});

module.exports = router;
