const express = require("express");
const router = express.Router();

router.get("/category/new", (req, res) => {
    res.send("categoria")
});

router.get("/admin/categories/new", (req, res) => {
    res.send("admin");
});

module.exports = router;