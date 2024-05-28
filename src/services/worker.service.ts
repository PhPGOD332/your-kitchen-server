import { Worker } from "../models/worker.model";

class WorkerService {
    async getWorkers () {
        const workers = await Worker.find();
        return workers;
    };

    async getWorker (id: string) {
        const worker = await Worker.findById(id);
        return worker;
    };

    async addWorker (body: any, file: any) {
        const newWorker = {
            photo: file.filename,
            firstName: body.firstName,
            lastName: body.lastName,
            jobTitle: body.jobTitle,
            experience: body.experience,

        }
        const worker = new Worker(newWorker);
        const result = await worker.save();
        return result;
    };

    async deleteWorker (id: string) {
        const worker = await Worker.findByIdAndDelete(id);
        return worker;
    };

    async updateWorker (id: string, body: object) {
        const worker = await Worker.findByIdAndUpdate(id, body, { new: true });
        return worker;
    };

};

export default new WorkerService();