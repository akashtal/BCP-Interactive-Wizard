# BCP Interactive Wizard

A comprehensive Business Continuity Planning (BCP) interactive wizard built with Node.js, Express, React, and MongoDB. This application guides users through a 4-step process to create detailed business continuity plans.

## Features

### Step 1: Service & Process Capture
- **BCP Details**: Name, Business Unit, Sub-Business Unit
- **Service Information**: Service name and description
- **Process Management**: Dynamic process addition with site and owner assignment
- **Site Selection**: Multi-select dropdown with system locations
- **Owner Assignment**: Primary and backup owner selection from BRT roster

### Step 2: Business Impact Analysis (BIA)
- **Criticality Assessment**: MTD (Maximum Tolerable Downtime) configuration
- **Headcount Requirements**: Site and process-specific headcount mapping
- **Dependencies**: Upstream, IT, Equipment, and External dependencies
- **Skip Step Option**: Optional step with confirmation

### Step 3: Communication
- **Disruption Notifications**: Contact management for service disruptions
- **Multiple Contact Types**: Individual, Group, and Distribution List support
- **Dynamic Contact Addition**: Add multiple notification contacts

### Step 4: Risk Assessment
- **Risk Documentation**: Free-text area for major risk identification
- **Common Risk Examples**: Built-in guidance for risk identification
- **Skip Step Option**: Optional step with confirmation

## Technical Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Step Navigation**: Visual progress indicator and step management
- **Data Persistence**: MongoDB integration with draft saving
- **Form Validation**: Client-side validation with error handling
- **Dynamic Components**: Reusable components for complex inputs
- **API Integration**: RESTful API with full CRUD operations

## Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **RESTful API** design
- **CORS** enabled for cross-origin requests

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Quick Start

1. **Clone and Install Dependencies**
   ```bash
   cd /workspace
   npm run install-all
   ```

2. **Start Development Servers**
   ```bash
   npm run dev
   ```
   This will start both the backend server (port 5000) and frontend development server (port 3000).

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

### Manual Setup

1. **Backend Setup**
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm start
   ```

### Environment Configuration

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bcp-wizard
NODE_ENV=development
```

## API Endpoints

### BCP Management
- `GET /api/bcp` - Get all BCPs
- `GET /api/bcp/:id` - Get specific BCP
- `POST /api/bcp` - Create new BCP
- `PUT /api/bcp/:id` - Update BCP
- `PATCH /api/bcp/:id/step/:stepNumber` - Update specific step
- `DELETE /api/bcp/:id` - Delete BCP

### Supporting Data
- `GET /api/sites` - Get all sites
- `POST /api/sites` - Create new site
- `GET /api/owners` - Get all owners
- `GET /api/owners/search?q=query` - Search owners

## Database Schema

### BCP Document
```javascript
{
  bcpName: String (required),
  businessUnit: String,
  subBusinessUnit: String,
  service: {
    name: String (required),
    description: String
  },
  processes: [{
    name: String (required),
    sites: [ObjectId],
    primaryOwner: { name: String, email: String },
    backupOwner: { name: String, email: String }
  }],
  criticality: {
    timeframe: String (Hours/Days),
    value: Number
  },
  headcountRequirements: [{
    siteId: ObjectId,
    processId: String,
    headcount: Number
  }],
  dependencies: [{
    type: String (Upstream/IT/Equipment/External),
    description: String
  }],
  notifications: [{
    name: String,
    email: String,
    type: String (individual/group/distribution)
  }],
  risks: String,
  status: String (draft/completed),
  currentStep: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Guide

### Creating a New BCP
1. Navigate to the wizard from the dashboard
2. Complete each step with required information
3. Use "Save Draft" to save progress at any time
4. Skip optional steps (Step 2 and Step 4) if not needed
5. Complete the wizard to finalize your BCP

### Managing Existing BCPs
- View all BCPs on the dashboard
- Edit incomplete BCPs to continue where you left off
- Delete BCPs you no longer need
- Track progress with visual indicators

## Development

### Project Structure
```
bcp-interactive-wizard/
├── server/                 # Backend Node.js application
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API route handlers
│   └── index.js           # Server entry point
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── steps/     # Step-specific components
│   │   │   └── ...
│   │   ├── services/      # API service layer
│   │   └── ...
│   └── public/
└── package.json           # Root package configuration
```

### Key Components
- **Wizard**: Main wizard container with step management
- **StepIndicator**: Visual progress indicator
- **DynamicInputList**: Reusable component for dynamic inputs
- **SiteSelector**: Multi-select site picker
- **OwnerSelector**: Owner selection with search
- **Dashboard**: BCP management interface

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details