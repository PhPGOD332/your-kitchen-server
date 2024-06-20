import { Review } from "../models/review.model";
import { ObjectId } from "mongodb";

class ReviewService {
    async getReviews () {
        const reviews = await Review.find();
        return reviews;
    };

    async getMainReviews () {
        const reviews = await Review.find({
            $or: [
                {
                    _id: new ObjectId("656da9969b6992497aa994ff")
                },
                {
                    _id: new ObjectId("656da9db9b6992497aa9950a")
                },
                {
                    _id: new ObjectId("656daa469b6992497aa99520")
                }
            ]
        }).sort({ _id: -1 }).limit(3);
        return reviews;
    }

    async getReview (id: string) {
        const review = await Review.findById(id);
        return review;
    };

    async addReview (body: any, files: any) {
        const filesNames = files.map((file: any) => file.filename);

        const newReview: any = {
            firstName: body.firstName,
            lastName: body.lastName,
            text: body.text,
        }

        if(body.photo){
            newReview.photo = filesNames[0];
            newReview.photos = filesNames.slice(1);

            const review = new Review(newReview);
            const result = await review.save();
            return result;
        } else {
            newReview.photos = filesNames;

            const review = new Review(newReview);
            const result = await review.save();
            return result;
        }
    };

    async deleteReview (id: string) {
        const review = await Review.findByIdAndDelete(id);
        return review;
    };

    async updateReview (id: string, body: any) {
        const newReview: any = {
            firstName: body.firstName,
            text: body.text,
        }

        if(body.lastName){
            newReview.lastName = body.lastName;
        }

        const review = await Review.findByIdAndUpdate(id, newReview, { new: true });
        return review;
    };

};

export default new ReviewService();