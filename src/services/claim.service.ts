import { deleteFiles } from "../helpers/deleteFiles";
import { Claim } from "../models/claim.model";
import { IClaim } from "../types/IClaim";
import mailService from "./mail.service";

class ClaimService {
  async getClaims() {
    const claims = await Claim.find();
    return claims;
  }

  async getClaim(id: string) {
    const claim = await Claim.findById(id);
    return claim;
  }

  async addClaim(body: any, files: any) {
    const filesNames = files.map((file: any) => file.filename);

    const addedClaim = {
      date: body.date,
      firstName: body.firstName,
      mobilePhone: body.mobilePhone,
      email: body.email,
      tag: body.tag,
      location: body.location,
      files: filesNames,
    };

    const claim = new Claim(addedClaim);
    const result = await claim.save();

    const newClaim: IClaim = {
      _id: result._id.toString(),
      date: result.date,
      firstName: result.firstName,
      mobilePhone: result.mobilePhone,
      email: result.email,
      tag: result.tag,
      location: result.location,
    };

    mailService.sendMailClaim(newClaim);
    return result;
  }

  async deleteClaim(id: string) {
    const claim = await Claim.findByIdAndDelete(id);

    if (claim?.files) {
      deleteFiles(claim.files);
    }

    return claim;
  }

  async updateClaim(id: string, body: object) {
    const claim = await Claim.findByIdAndUpdate(id, body, { new: true });
    return claim;
  }
}

export default new ClaimService();
