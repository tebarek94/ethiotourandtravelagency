import { PartnerModel } from '../models/Partner';
import { Partner, CreatePartnerRequest } from '../types';
import { createError } from '../middlewares/errorHandler';

export class PartnerService {
  static async createPartner(partnerData: CreatePartnerRequest): Promise<Partner> {
    return PartnerModel.create(partnerData);
  }

  static async getAllPartners(): Promise<Partner[]> {
    return PartnerModel.findAll();
  }

  static async getPartnerById(id: number): Promise<Partner> {
    const partner = await PartnerModel.findById(id);
    if (!partner) {
      throw createError('Partner not found', 404);
    }
    return partner;
  }

  static async updatePartner(id: number, updateData: Partial<Partner>): Promise<Partner> {
    const existingPartner = await PartnerModel.findById(id);
    if (!existingPartner) {
      throw createError('Partner not found', 404);
    }

    const updatedPartner = await PartnerModel.update(id, updateData);
    if (!updatedPartner) {
      throw createError('Failed to update partner', 500);
    }

    return updatedPartner;
  }

  static async deletePartner(id: number): Promise<void> {
    const existingPartner = await PartnerModel.findById(id);
    if (!existingPartner) {
      throw createError('Partner not found', 404);
    }

    const deleted = await PartnerModel.delete(id);
    if (!deleted) {
      throw createError('Failed to delete partner', 500);
    }
  }

  static async getPartnersByType(type: string): Promise<Partner[]> {
    return PartnerModel.findByType(type);
  }

  static async getPartnerStats(): Promise<any> {
    return PartnerModel.getStats();
  }
}
