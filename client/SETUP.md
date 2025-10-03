# Setup Guide - Zad Travel Agency Frontend

## Quick Start

### Option 1: Use the Install Script (Recommended)

**Windows:**
```bash
# Run the install script
install.bat
```

**Mac/Linux:**
```bash
# Make script executable and run
chmod +x install.sh
./install.sh
```

### Option 2: Manual Installation

If you encounter dependency conflicts, use these commands:

```bash
# Clean npm cache
npm cache clean --force

# Install with legacy peer deps (resolves TypeScript conflicts)
npm install --legacy-peer-deps
```

### Option 3: Force Installation

If the above doesn't work:

```bash
npm install --force
```

## Environment Setup

1. **Create environment file:**
   ```bash
   # Create .env file in client directory
   echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
   echo "REACT_APP_ENV=development" >> .env
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000 (make sure backend is running)

## Troubleshooting

### TypeScript Version Conflicts
If you see TypeScript version conflicts:
```bash
npm install --legacy-peer-deps
```

### Port Already in Use
If port 3000 is already in use:
```bash
# Set a different port
set PORT=3001 && npm start
```

### Backend Connection Issues
Make sure the backend is running on port 5000:
```bash
# In the backend directory
npm run dev
```

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   └── contexts/      # React contexts
├── public/            # Static assets
└── package.json       # Dependencies
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Features

✅ **Complete UI/UX** - Matches original website design  
✅ **Authentication** - Login/Register system  
✅ **Package Management** - Browse and book packages  
✅ **Booking System** - Complete booking flow  
✅ **User Dashboard** - Profile and booking management  
✅ **Responsive Design** - Works on all devices  
✅ **TypeScript** - Full type safety  
✅ **API Integration** - Connected to backend  

## Support

If you encounter any issues:
1. Check that Node.js version is 16+ 
2. Ensure backend is running on port 5000
3. Try clearing npm cache: `npm cache clean --force`
4. Use `--legacy-peer-deps` flag for installation

---

**Ready to start your spiritual journey! 🕌**
