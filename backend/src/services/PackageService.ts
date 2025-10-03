import { PackageModel } from '../models/Package';
import { DestinationModel } from '../models/Destination';
import { CreatePackageRequest, Package, Destination } from '../types';
import { createError } from '../middlewares/errorHandler';

export class PackageService {
  static async createPackage(packageData: CreatePackageRequest): Promise<Package> {
    return PackageModel.create(packageData);
  }

  static async getAllPackages(): Promise<Package[]> {
    return PackageModel.findAll();
  }

  static async getPackageById(id: number): Promise<Package> {
    const packageData = await PackageModel.findById(id);
    if (!packageData) {
      throw createError('Package not found', 404);
    }
    return packageData;
  }

  static async updatePackage(id: number, updateData: Partial<Package>): Promise<Package> {
    const existingPackage = await PackageModel.findById(id);
    if (!existingPackage) {
      throw createError('Package not found', 404);
    }

    const updatedPackage = await PackageModel.update(id, updateData);
    if (!updatedPackage) {
      throw createError('Failed to update package', 500);
    }

    return updatedPackage;
  }

  static async deletePackage(id: number): Promise<void> {
    const existingPackage = await PackageModel.findById(id);
    if (!existingPackage) {
      throw createError('Package not found', 404);
    }

    const deleted = await PackageModel.delete(id);
    if (!deleted) {
      throw createError('Failed to delete package', 500);
    }
  }

  static async getPackageDestinations(packageId: number): Promise<Destination[]> {
    const packageData = await PackageModel.findById(packageId);
    if (!packageData) {
      throw createError('Package not found', 404);
    }

    return PackageModel.getDestinations(packageId);
  }

  static async addDestinationToPackage(packageId: number, destinationId: number): Promise<void> {
    const packageData = await PackageModel.findById(packageId);
    if (!packageData) {
      throw createError('Package not found', 404);
    }

    const destination = await DestinationModel.findById(destinationId);
    if (!destination) {
      throw createError('Destination not found', 404);
    }

    await PackageModel.addDestination(packageId, destinationId);
  }

  static async removeDestinationFromPackage(packageId: number, destinationId: number): Promise<void> {
    const packageData = await PackageModel.findById(packageId);
    if (!packageData) {
      throw createError('Package not found', 404);
    }

    const destination = await DestinationModel.findById(destinationId);
    if (!destination) {
      throw createError('Destination not found', 404);
    }

    await PackageModel.removeDestination(packageId, destinationId);
  }
}

export class DestinationService {
  static async createDestination(destinationData: Omit<Destination, 'destination_id' | 'created_at'>): Promise<Destination> {
    return DestinationModel.create(destinationData);
  }

  static async getAllDestinations(): Promise<Destination[]> {
    return DestinationModel.findAll();
  }

  static async getDestinationById(id: number): Promise<Destination> {
    const destination = await DestinationModel.findById(id);
    if (!destination) {
      throw createError('Destination not found', 404);
    }
    return destination;
  }

  static async updateDestination(id: number, updateData: Partial<Destination>): Promise<Destination> {
    const existingDestination = await DestinationModel.findById(id);
    if (!existingDestination) {
      throw createError('Destination not found', 404);
    }

    const updatedDestination = await DestinationModel.update(id, updateData);
    if (!updatedDestination) {
      throw createError('Failed to update destination', 500);
    }

    return updatedDestination;
  }

  static async deleteDestination(id: number): Promise<void> {
    const existingDestination = await DestinationModel.findById(id);
    if (!existingDestination) {
      throw createError('Destination not found', 404);
    }

    const deleted = await DestinationModel.delete(id);
    if (!deleted) {
      throw createError('Failed to delete destination', 500);
    }
  }

  static async getDestinationsByType(type: string): Promise<Destination[]> {
    return DestinationModel.findByType(type);
  }
}
