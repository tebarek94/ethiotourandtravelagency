import { Request, Response, NextFunction } from 'express';
import { PackageService, DestinationService } from '../services/PackageService';

export class PackageController {
  static async createPackage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const packageData = await PackageService.createPackage(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Package created successfully',
        data: packageData
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPackages(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const packages = await PackageService.getAllPackages();
      
      res.json({
        success: true,
        message: 'Packages retrieved successfully',
        data: packages
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPackageById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const packageId = parseInt(req.params.id);
      if (isNaN(packageId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid package ID'
        });
        return;
      }

      const packageData = await PackageService.getPackageById(packageId);
      
      res.json({
        success: true,
        message: 'Package retrieved successfully',
        data: packageData
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePackage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const packageId = parseInt(req.params.id);
      if (isNaN(packageId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid package ID'
        });
        return;
      }

      const updatedPackage = await PackageService.updatePackage(packageId, req.body);
      
      res.json({
        success: true,
        message: 'Package updated successfully',
        data: updatedPackage
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePackage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const packageId = parseInt(req.params.id);
      if (isNaN(packageId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid package ID'
        });
        return;
      }

      await PackageService.deletePackage(packageId);
      
      res.json({
        success: true,
        message: 'Package deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPackageDestinations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const packageId = parseInt(req.params.id);
      if (isNaN(packageId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid package ID'
        });
        return;
      }

      const destinations = await PackageService.getPackageDestinations(packageId);
      
      res.json({
        success: true,
        message: 'Package destinations retrieved successfully',
        data: destinations
      });
    } catch (error) {
      next(error);
    }
  }

  static async addDestinationToPackage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const packageId = parseInt(req.params.id);
      const destinationId = parseInt(req.body.destination_id);
      
      if (isNaN(packageId) || isNaN(destinationId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid package ID or destination ID'
        });
        return;
      }

      await PackageService.addDestinationToPackage(packageId, destinationId);
      
      res.json({
        success: true,
        message: 'Destination added to package successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async removeDestinationFromPackage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const packageId = parseInt(req.params.id);
      const destinationId = parseInt(req.params.destinationId);
      
      if (isNaN(packageId) || isNaN(destinationId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid package ID or destination ID'
        });
        return;
      }

      await PackageService.removeDestinationFromPackage(packageId, destinationId);
      
      res.json({
        success: true,
        message: 'Destination removed from package successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export class DestinationController {
  static async createDestination(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const destination = await DestinationService.createDestination(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Destination created successfully',
        data: destination
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllDestinations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const destinations = await DestinationService.getAllDestinations();
      
      res.json({
        success: true,
        message: 'Destinations retrieved successfully',
        data: destinations
      });
    } catch (error) {
      next(error);
    }
  }

  static async getDestinationById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const destinationId = parseInt(req.params.id);
      if (isNaN(destinationId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid destination ID'
        });
        return;
      }

      const destination = await DestinationService.getDestinationById(destinationId);
      
      res.json({
        success: true,
        message: 'Destination retrieved successfully',
        data: destination
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateDestination(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const destinationId = parseInt(req.params.id);
      if (isNaN(destinationId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid destination ID'
        });
        return;
      }

      const updatedDestination = await DestinationService.updateDestination(destinationId, req.body);
      
      res.json({
        success: true,
        message: 'Destination updated successfully',
        data: updatedDestination
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteDestination(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const destinationId = parseInt(req.params.id);
      if (isNaN(destinationId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid destination ID'
        });
        return;
      }

      await DestinationService.deleteDestination(destinationId);
      
      res.json({
        success: true,
        message: 'Destination deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async getDestinationsByType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { type } = req.query;
      if (!type || typeof type !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Type parameter is required'
        });
        return;
      }

      const destinations = await DestinationService.getDestinationsByType(type);
      
      res.json({
        success: true,
        message: 'Destinations retrieved successfully',
        data: destinations
      });
    } catch (error) {
      next(error);
    }
  }
}
