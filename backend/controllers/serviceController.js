const Service = require("../models/service");
const APIFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");


// Create, Get, Update, Delete Service
exports.newService = async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "services",
        });

        imagesLinks.push({
            public_id: result.public_id,

            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    console.log(req.user);

    req.body.user = req.user.id;

    const service = await Service.create(req.body);

    res.status(201).json({
        success: true,
        service,
    });
};

exports.getService = async (req, res, next) => {
    const resPerPage = 4;
    const servicesCount = await Service.countDocuments();

    const apiFeatures = new APIFeatures(Service.find(), req.query)
        .search()
        .filter();

    // let products = await apiFeatures.query;

    apiFeatures.pagination(resPerPage);
    services = await apiFeatures.query;
    let filteredServicesCount = services.length;

    res.status(200).json({
        success: true,
        servicesCount,
        resPerPage,
        filteredServicesCount,
        services,
    });

    // return next(new ErrorHandler("my error", 400));
};

exports.getSingleService = async (req, res, next) => {
    const service = await Service.findById(req.params.id);

    console.log(service);

    if (!service) {
        return next(new ErrorHandler("Service not found", 404));
    }

    res.status(200).json({
        success: true,
        service,
    });
};

exports.updateService = async (req, res, next) => {
    let service = await Service.findById(req.params.id);

    if (!Service) {
        return next(new ErrorHandler("Service not found", 404));
    }

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting images associated with the product

        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(
                product.images[i].public_id
            );
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,

                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }

    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true,

        runValidators: true,

        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,

        service,
    });
};

exports.deleteService = async (req, res, next) => {
    let service = await Service.findById(req.params.id);

    if (!service) {
        return res.status(404).json({
            success: false,

            message: "Service not found",
        });
    }

    if (!service) {
        return next(new ErrorHandler("Service not found", 404));
    }
    service = await Service.findByIdAndRemove(req.params.id)
    // await Product.find();

    res.status(200).json({
        success: true,

        service,
    });
};

// Product Reviews
exports.createServiceReview = async (req, res, next) => {

    const { rating, comment, serviceId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const service = await Service.findById(serviceId);

    const isReviewed = service.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {

        service.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        service.reviews.push(review);
        service.numOfReviews = service.reviews.length
    }

    service.ratings = service.reviews.reduce((acc, item) => item.rating + acc, 0) / service.reviews.length

    await service.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        review
    })
};

exports.getServiceReview = async (req, res, next) => {
    const service = await Service.findById(req.params.id);

    res.status(200).json({
        success: true,
        reviews: service.reviews
    });
};