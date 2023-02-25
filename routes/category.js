const pool = require("./api/pool");
const { queryPostData, queryUpdateData } = require("./api/helpers");

const router = require("express").Router();

router.get("/", function (req, res) {
  pool.query("select * from category", function (err, result) {
    if (err) {
      res.status(500).json({ status: false, message: err, data: [] });
    } else {
      res
        .status(200)
        .json({ status: false, message: "Data found!", data: result.rows });
    }
  });
});

router.get("/:id", function (req, res) {
  const { id } = req.params;
  pool.query(
    "select * from category where id=$1",
    [id],
    function (err, result) {
      if (err) {
        res.status(500).json({ status: false, message: err, data: [] });
      } else {
        res
          .status(200)
          .json({
            status: false,
            message: "Data found!",
            data: result.rows[0],
          });
      }
    }
  );
});

router.post("/", function (req, res) {
  const { keys, values } = queryPostData(req.body);
  var qry = `insert into category(${keys}) values (${values})`;
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
  var qry = `update category set ${keys} where id=$1`;
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
  pool.query("delete from category where id=$1", [id], function (err) {
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
