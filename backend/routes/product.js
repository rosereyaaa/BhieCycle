const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../middlewares/auth");

const {
    newProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReview,
    deleteReview
    // getSingleProduct,
} = require("../controllers/productController");

//Admin Access
router.post("/product/new", isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 10), newProduct);
router.get("/products", getProducts);
router.get("/product/:id", getSingleProduct);
router.put("/update/product/:id", isAuthenticatedUser, authorizeRoles("admin"), upload.array("images", 10), updateProduct);
router.delete("/remove/product/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

//User Access 
router.put("/create/review", isAuthenticatedUser, createProductReview);
router.get("/review/:id", isAuthenticatedUser, getProductReview);
router.delete("/remove/review/:id", isAuthenticatedUser, deleteReview);

module.exports = router;