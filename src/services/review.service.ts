import { Review } from "../models/review.model";
import { IReview } from "../types/IReview";

class ReviewService {
    async getReviews () {
        const reviews = await Review.find();
        return reviews;
    };

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