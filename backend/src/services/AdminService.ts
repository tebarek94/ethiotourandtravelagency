import pool from '../config/database';
import { createError } from '../middlewares/errorHandler';

export interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  totalPackages: number;
  totalInquiries: number;
  pendingBookings: number;
  confirmedBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  newUsersThisMonth: number;
  newBookingsThisMonth: number;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  role?: string;
  type?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AnalyticsData {
  bookingsOverTime: Array<{ date: string; count: number; revenue: number }>;
  popularPackages: Array<{ package_id: number; name: string; bookings: number; revenue: number }>;
  userRegistrations: Array<{ date: string; count: number }>;
  revenueByMonth: Array<{ month: string; revenue: number }>;
  bookingStatusDistribution: Array<{ status: string; count: number }>;
}

export interface RevenueReport {
  totalRevenue: number;
  period: string;
  data: Array<{ period: string; revenue: number; bookings: number }>;
  growth: number;
}

export class AdminService {
  // Dashboard Statistics
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      const [
        totalUsersResult,
        totalBookingsResult,
        totalPackagesResult,
        totalInquiriesResult,
        pendingBookingsResult,
        confirmedBookingsResult,
        totalRevenueResult,
        monthlyRevenueResult,
        newUsersThisMonthResult,
        newBookingsThisMonthResult
      ] = await Promise.all([
        pool.execute('SELECT COUNT(*) as count FROM users'),
        pool.execute('SELECT COUNT(*) as count FROM bookings'),
        pool.execute('SELECT COUNT(*) as count FROM packages'),
        pool.execute('SELECT COUNT(*) as count FROM inquiries'),
        pool.execute('SELECT COUNT(*) as count FROM bookings WHERE status = "pending"'),
        pool.execute('SELECT COUNT(*) as count FROM bookings WHERE status = "confirmed"'),
        pool.execute('SELECT COALESCE(SUM(total_price), 0) as total FROM bookings WHERE status = "confirmed"'),
        pool.execute('SELECT COALESCE(SUM(total_price), 0) as total FROM bookings WHERE status = "confirmed" AND MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())'),
        pool.execute('SELECT COUNT(*) as count FROM users WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())'),
        pool.execute('SELECT COUNT(*) as count FROM bookings WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())')
      ]);

      const totalUsers = (totalUsersResult[0] as any[])[0].count;
      const totalBookings = (totalBookingsResult[0] as any[])[0].count;
      const totalPackages = (totalPackagesResult[0] as any[])[0].count;
      const totalInquiries = (totalInquiriesResult[0] as any[])[0].count;
      const pendingBookings = (pendingBookingsResult[0] as any[])[0].count;
      const confirmedBookings = (confirmedBookingsResult[0] as any[])[0].count;
      const totalRevenue = (totalRevenueResult[0] as any[])[0].total;
      const monthlyRevenue = (monthlyRevenueResult[0] as any[])[0].total;
      const newUsersThisMonth = (newUsersThisMonthResult[0] as any[])[0].count;
      const newBookingsThisMonth = (newBookingsThisMonthResult[0] as any[])[0].count;

      return {
        totalUsers,
        totalBookings,
        totalPackages,
        totalInquiries,
        pendingBookings,
        confirmedBookings,
        totalRevenue,
        monthlyRevenue,
        newUsersThisMonth,
        newBookingsThisMonth
      };
    } catch (error) {
      throw createError('Failed to retrieve dashboard statistics', 500);
    }
  }

  // User Management
  static async getAllUsers(options: PaginationOptions): Promise<PaginatedResult<any>> {
    try {
      const { page, limit, search, role } = options;
      const offset = (page - 1) * limit;

      let whereClause = '1=1';
      const params: any[] = [];

      if (search) {
        whereClause += ' AND (name LIKE ? OR email LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }

      if (role) {
        whereClause += ' AND role = ?';
        params.push(role);
      }

      const [usersResult, countResult] = await Promise.all([
        pool.execute(
          `SELECT user_id, name, email, phone, role, created_at, updated_at 
           FROM users 
           WHERE ${whereClause} 
           ORDER BY created_at DESC 
           LIMIT ? OFFSET ?`,
          [...params, limit, offset]
        ),
        pool.execute(
          `SELECT COUNT(*) as count FROM users WHERE ${whereClause}`,
          params
        )
      ]);

      const users = usersResult[0] as any[];
      const total = (countResult[0] as any[])[0].count;

      return {
        data: users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw createError('Failed to retrieve users', 500);
    }
  }

  static async updateUserRole(userId: number, role: string): Promise<any> {
    try {
      if (!['admin', 'user'].includes(role)) {
        throw createError('Invalid role', 400);
      }

      await pool.execute(
        'UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?',
        [role, userId]
      );

      const [result] = await pool.execute(
        'SELECT user_id, name, email, phone, role, created_at, updated_at FROM users WHERE user_id = ?',
        [userId]
      );

      const users = result as any[];
      if (users.length === 0) {
        throw createError('User not found', 404);
      }

      return users[0];
    } catch (error: any) {
      if (error.status) throw error;
      throw createError('Failed to update user role', 500);
    }
  }

  // Booking Management
  static async getAllBookings(options: PaginationOptions): Promise<PaginatedResult<any>> {
    try {
      const { page, limit, status, search } = options;
      const offset = (page - 1) * limit;

      let whereClause = '1=1';
      const params: any[] = [];

      if (status) {
        whereClause += ' AND b.status = ?';
        params.push(status);
      }

      if (search) {
        whereClause += ' AND (u.name LIKE ? OR p.name LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }

      const [bookingsResult, countResult] = await Promise.all([
        pool.execute(
          `SELECT b.booking_id, b.user_id, b.package_id, b.travel_date, b.travelers, 
                  b.status, b.total_price, b.created_at, b.updated_at,
                  u.name as user_name, u.email as user_email,
                  p.name as package_name
           FROM bookings b
           LEFT JOIN users u ON b.user_id = u.user_id
           LEFT JOIN packages p ON b.package_id = p.package_id
           WHERE ${whereClause}
           ORDER BY b.created_at DESC
           LIMIT ? OFFSET ?`,
          [...params, limit, offset]
        ),
        pool.execute(
          `SELECT COUNT(*) as count FROM bookings b
           LEFT JOIN users u ON b.user_id = u.user_id
           LEFT JOIN packages p ON b.package_id = p.package_id
           WHERE ${whereClause}`,
          params
        )
      ]);

      const bookings = bookingsResult[0] as any[];
      const total = (countResult[0] as any[])[0].count;

      return {
        data: bookings,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw createError('Failed to retrieve bookings', 500);
    }
  }

  static async updateBookingStatus(bookingId: number, status: string): Promise<any> {
    try {
      if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
        throw createError('Invalid status', 400);
      }

      await pool.execute(
        'UPDATE bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE booking_id = ?',
        [status, bookingId]
      );

      const [result] = await pool.execute(
        `SELECT b.booking_id, b.user_id, b.package_id, b.travel_date, b.travelers, 
                b.status, b.total_price, b.created_at, b.updated_at,
                u.name as user_name, u.email as user_email,
                p.name as package_name
         FROM bookings b
         LEFT JOIN users u ON b.user_id = u.user_id
         LEFT JOIN packages p ON b.package_id = p.package_id
         WHERE b.booking_id = ?`,
        [bookingId]
      );

      const bookings = result as any[];
      if (bookings.length === 0) {
        throw createError('Booking not found', 404);
      }

      return bookings[0];
    } catch (error: any) {
      if (error.status) throw error;
      throw createError('Failed to update booking status', 500);
    }
  }

  // Package Management
  static async getAllPackages(options: PaginationOptions): Promise<PaginatedResult<any>> {
    try {
      const { page, limit, type, search } = options;
      const offset = (page - 1) * limit;

      let whereClause = '1=1';
      const params: any[] = [];

      if (type) {
        whereClause += ' AND type = ?';
        params.push(type);
      }

      if (search) {
        whereClause += ' AND name LIKE ?';
        params.push(`%${search}%`);
      }

      const [packagesResult, countResult] = await Promise.all([
        pool.execute(
          `SELECT package_id, name, description, duration_days, nights, price, type, rating, created_at, updated_at
           FROM packages
           WHERE ${whereClause}
           ORDER BY created_at DESC
           LIMIT ? OFFSET ?`,
          [...params, limit, offset]
        ),
        pool.execute(
          `SELECT COUNT(*) as count FROM packages WHERE ${whereClause}`,
          params
        )
      ]);

      const packages = packagesResult[0] as any[];
      const total = (countResult[0] as any[])[0].count;

      return {
        data: packages,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw createError('Failed to retrieve packages', 500);
    }
  }

  // Inquiry Management
  static async getAllInquiries(options: PaginationOptions): Promise<PaginatedResult<any>> {
    try {
      const { page, limit, status, search } = options;
      const offset = (page - 1) * limit;

      let whereClause = '1=1';
      const params: any[] = [];

      if (status) {
        whereClause += ' AND status = ?';
        params.push(status);
      }

      if (search) {
        whereClause += ' AND (name LIKE ? OR email LIKE ? OR message LIKE ?)';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }

      const [inquiriesResult, countResult] = await Promise.all([
        pool.execute(
          `SELECT inquiry_id, name, email, phone, message, status, created_at
           FROM inquiries
           WHERE ${whereClause}
           ORDER BY created_at DESC
           LIMIT ? OFFSET ?`,
          [...params, limit, offset]
        ),
        pool.execute(
          `SELECT COUNT(*) as count FROM inquiries WHERE ${whereClause}`,
          params
        )
      ]);

      const inquiries = inquiriesResult[0] as any[];
      const total = (countResult[0] as any[])[0].count;

      return {
        data: inquiries,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw createError('Failed to retrieve inquiries', 500);
    }
  }

  static async updateInquiryStatus(inquiryId: number, status: string): Promise<any> {
    try {
      if (!['new', 'read', 'replied'].includes(status)) {
        throw createError('Invalid status', 400);
      }

      await pool.execute(
        'UPDATE inquiries SET status = ? WHERE inquiry_id = ?',
        [status, inquiryId]
      );

      const [result] = await pool.execute(
        'SELECT inquiry_id, name, email, phone, message, status, created_at FROM inquiries WHERE inquiry_id = ?',
        [inquiryId]
      );

      const inquiries = result as any[];
      if (inquiries.length === 0) {
        throw createError('Inquiry not found', 404);
      }

      return inquiries[0];
    } catch (error: any) {
      if (error.status) throw error;
      throw createError('Failed to update inquiry status', 500);
    }
  }

  // Analytics
  static async getAnalytics(period: string): Promise<AnalyticsData> {
    try {
      let dateFilter = '';
      switch (period) {
        case '7d':
          dateFilter = 'AND b.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)';
          break;
        case '30d':
          dateFilter = 'AND b.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)';
          break;
        case '90d':
          dateFilter = 'AND b.created_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)';
          break;
        case '1y':
          dateFilter = 'AND b.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)';
          break;
        default:
          dateFilter = 'AND b.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)';
      }

      const [
        bookingsOverTimeResult,
        popularPackagesResult,
        userRegistrationsResult,
        revenueByMonthResult,
        bookingStatusDistributionResult
      ] = await Promise.all([
        pool.execute(`
          SELECT DATE(b.created_at) as date, COUNT(*) as count, COALESCE(SUM(b.total_price), 0) as revenue
          FROM bookings b
          WHERE b.status = 'confirmed' ${dateFilter}
          GROUP BY DATE(b.created_at)
          ORDER BY date ASC
        `),
        pool.execute(`
          SELECT p.package_id, p.name, COUNT(b.booking_id) as bookings, COALESCE(SUM(b.total_price), 0) as revenue
          FROM packages p
          LEFT JOIN bookings b ON p.package_id = b.package_id AND b.status = 'confirmed' ${dateFilter}
          GROUP BY p.package_id, p.name
          ORDER BY bookings DESC
          LIMIT 10
        `),
        pool.execute(`
          SELECT DATE(created_at) as date, COUNT(*) as count
          FROM users
          WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
          GROUP BY DATE(created_at)
          ORDER BY date ASC
        `),
        pool.execute(`
          SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COALESCE(SUM(total_price), 0) as revenue
          FROM bookings
          WHERE status = 'confirmed' AND created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
          GROUP BY DATE_FORMAT(created_at, '%Y-%m')
          ORDER BY month ASC
        `),
        pool.execute(`
          SELECT status, COUNT(*) as count
          FROM bookings
          GROUP BY status
        `)
      ]);

      return {
        bookingsOverTime: bookingsOverTimeResult[0] as any[],
        popularPackages: popularPackagesResult[0] as any[],
        userRegistrations: userRegistrationsResult[0] as any[],
        revenueByMonth: revenueByMonthResult[0] as any[],
        bookingStatusDistribution: bookingStatusDistributionResult[0] as any[]
      };
    } catch (error) {
      throw createError('Failed to retrieve analytics', 500);
    }
  }

  // Revenue Reports
  static async getRevenueReport(options: { startDate?: string; endDate?: string; groupBy: string }): Promise<RevenueReport> {
    try {
      const { startDate, endDate, groupBy } = options;
      
      let dateFilter = '';
      let groupByClause = '';
      let periodFormat = '';

      if (startDate && endDate) {
        dateFilter = `AND b.created_at BETWEEN '${startDate}' AND '${endDate}'`;
      } else {
        dateFilter = 'AND b.created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)';
      }

      switch (groupBy) {
        case 'day':
          groupByClause = 'DATE(b.created_at)';
          periodFormat = '%Y-%m-%d';
          break;
        case 'week':
          groupByClause = 'YEARWEEK(b.created_at)';
          periodFormat = '%Y-%u';
          break;
        case 'month':
          groupByClause = 'DATE_FORMAT(b.created_at, "%Y-%m")';
          periodFormat = '%Y-%m';
          break;
        case 'year':
          groupByClause = 'YEAR(b.created_at)';
          periodFormat = '%Y';
          break;
        default:
          groupByClause = 'DATE_FORMAT(b.created_at, "%Y-%m")';
          periodFormat = '%Y-%m';
      }

      const [revenueDataResult, totalRevenueResult] = await Promise.all([
        pool.execute(`
          SELECT ${groupByClause} as period, 
                 COALESCE(SUM(b.total_price), 0) as revenue,
                 COUNT(b.booking_id) as bookings
          FROM bookings b
          WHERE b.status = 'confirmed' ${dateFilter}
          GROUP BY ${groupByClause}
          ORDER BY period ASC
        `),
        pool.execute(`
          SELECT COALESCE(SUM(total_price), 0) as total
          FROM bookings
          WHERE status = 'confirmed' ${dateFilter}
        `)
      ]);

      const revenueData = revenueDataResult[0] as any[];
      const totalRevenue = (totalRevenueResult[0] as any[])[0].total;

      // Calculate growth (compare with previous period)
      let growth = 0;
      if (revenueData.length >= 2) {
        const currentPeriod = revenueData[revenueData.length - 1].revenue;
        const previousPeriod = revenueData[revenueData.length - 2].revenue;
        if (previousPeriod > 0) {
          growth = ((currentPeriod - previousPeriod) / previousPeriod) * 100;
        }
      }

      return {
        totalRevenue,
        period: startDate && endDate ? `${startDate} to ${endDate}` : 'Last 12 months',
        data: revenueData,
        growth
      };
    } catch (error) {
      throw createError('Failed to retrieve revenue report', 500);
    }
  }
}
