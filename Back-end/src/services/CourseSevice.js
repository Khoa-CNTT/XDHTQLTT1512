const Course = require("../models/CourseModel")

const createCourse = async (newCourse) => {
    try {
        const { name, image, type,rating, price, description, discount } = newCourse;

        const checkCourse = await Course.findOne({ name });
        if (checkCourse) {
            return {
                status: 'ERR',
                message: 'The name of course already exists'
            };
        }

        const createdCourse = await Course.create({
            name,
            image,
            type,
            rating,
            price,
            description,
            discount: Number(discount),
        });

        return {
            status: 'OK',
            message: 'SUCCESS',
            data: { createdCourse }
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: 'Failed to create course',
            error: error.message
        };
    }
};


const updateCourse = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCourse = await Course.findOne({
                _id: id
            })
            if (checkCourse === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            const updatedCourse = await Course.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedCourse
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteCourse = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCourse = await Course.findOne({
                _id: id
            })
            if (checkCourse === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            await Course.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyCourse = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Course.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsCourse = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const course = await Course.findOne({
                _id: id
            })
            if (course === null) {
                resolve({
                    status: 'ERR',
                    message: 'The course is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: course
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllCourse = async (limit = 10, page = 0, sort = [], filter = []) => {
    try {
        const query = {};
        const sortOptions = { createdAt: -1, updatedAt: -1 };

        if (Array.isArray(filter) && filter.length === 2) {
            const [label, value] = filter;
            if (label && value) {
                query[label] = { '$regex': value, '$options': 'i' };
            }
        }

        if (Array.isArray(sort) && sort.length === 2) {
            const [direction, field] = sort;
            if (['asc', 'desc'].includes(direction) && field) {
                sortOptions[field] = direction === 'asc' ? 1 : -1;
            }
        }
        const totalCourse = await Course.countDocuments(query);

        const allCourse = await Course.find(query)
            .limit(limit)
            .skip(page * limit)
            .sort(sortOptions);

        return {
            status: 'OK',
            message: 'Success',
            data: allCourse,
            total: totalCourse,
            pageCurrent: Number(page)+1,
            totalPage: Math.ceil(totalCourse / (limit || 1)),
        };
    } catch (e) {
        console.error('Error fetching products:', e.message);
        throw new Error(e.message); 
    }
};


const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Course.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createCourse,
    updateCourse,
    getDetailsCourse,
    deleteCourse,
    getAllCourse,
    deleteManyCourse,
    getAllType
}