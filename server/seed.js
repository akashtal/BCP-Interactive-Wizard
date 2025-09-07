const mongoose = require('mongoose');
const Site = require('./models/Site');
const Owner = require('./models/Owner');
require('dotenv').config();

const sampleSites = [
  {
    name: 'Headquarters',
    address: '123 Business Ave',
    city: 'New York',
    country: 'USA'
  },
  {
    name: 'Regional Office - West',
    address: '456 Commerce St',
    city: 'Los Angeles',
    country: 'USA'
  },
  {
    name: 'Regional Office - East',
    address: '789 Corporate Blvd',
    city: 'Boston',
    country: 'USA'
  },
  {
    name: 'Data Center - Primary',
    address: '321 Tech Park',
    city: 'Austin',
    country: 'USA'
  },
  {
    name: 'Data Center - Backup',
    address: '654 Server Lane',
    city: 'Denver',
    country: 'USA'
  }
];

const sampleOwners = [
  {
    name: 'John Smith',
    email: 'john.smith@company.com',
    department: 'IT Operations'
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Finance'
  },
  {
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    department: 'Human Resources'
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    department: 'Operations'
  },
  {
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    department: 'Security'
  },
  {
    name: 'Lisa Brown',
    email: 'lisa.brown@company.com',
    department: 'Customer Service'
  },
  {
    name: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    department: 'Legal'
  },
  {
    name: 'Jennifer Garcia',
    email: 'jennifer.garcia@company.com',
    department: 'Marketing'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bcp-wizard', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Site.deleteMany({});
    await Owner.deleteMany({});

    console.log('Cleared existing data');

    // Insert sample sites
    const insertedSites = await Site.insertMany(sampleSites);
    console.log(`Inserted ${insertedSites.length} sites`);

    // Insert sample owners
    const insertedOwners = await Owner.insertMany(sampleOwners);
    console.log(`Inserted ${insertedOwners.length} owners`);

    console.log('Database seeded successfully!');
    console.log('\nSample Sites:');
    insertedSites.forEach(site => {
      console.log(`- ${site.name} (${site.city})`);
    });

    console.log('\nSample Owners:');
    insertedOwners.forEach(owner => {
      console.log(`- ${owner.name} (${owner.department})`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

seedDatabase();