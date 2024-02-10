const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
    res.send("categorias");
});

router.get("/admin/categories/new", (req, res) => {
    res.send("admin");
});

module.exports = router;