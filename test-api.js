const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('🧪 Testing BCP Interactive Wizard API...\n');

    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);

    // Test get sites
    console.log('\n2. Testing get sites...');
    const sitesResponse = await axios.get(`${API_BASE_URL}/sites`);
    console.log('✅ Sites retrieved:', sitesResponse.data.length, 'sites');

    // Test get owners
    console.log('\n3. Testing get owners...');
    const ownersResponse = await axios.get(`${API_BASE_URL}/owners`);
    console.log('✅ Owners retrieved:', ownersResponse.data.length, 'owners');

    // Test create BCP
    console.log('\n4. Testing create BCP...');
    const sampleBCP = {
      bcpName: 'Test BCP',
      businessUnit: 'IT Department',
      service: {
        name: 'Test Service',
        description: 'A test service for BCP'
      },
      processes: [
        {
          name: 'Test Process',
          sites: [sitesResponse.data[0]._id],
          primaryOwner: {
            name: ownersResponse.data[0].name,
            email: ownersResponse.data[0].email
          },
          backupOwner: {
            name: ownersResponse.data[1].name,
            email: ownersResponse.data[1].email
          }
        }
      ],
      currentStep: 1
    };

    const createResponse = await axios.post(`${API_BASE_URL}/bcp`, sampleBCP);
    console.log('✅ BCP created:', createResponse.data._id);

    // Test get BCP
    console.log('\n5. Testing get BCP...');
    const getResponse = await axios.get(`${API_BASE_URL}/bcp/${createResponse.data._id}`);
    console.log('✅ BCP retrieved:', getResponse.data.bcpName);

    // Test update BCP
    console.log('\n6. Testing update BCP...');
    const updateData = {
      ...getResponse.data,
      criticality: {
        timeframe: 'Hours',
        value: 4
      },
      currentStep: 2
    };
    const updateResponse = await axios.put(`${API_BASE_URL}/bcp/${createResponse.data._id}`, updateData);
    console.log('✅ BCP updated, current step:', updateResponse.data.currentStep);

    // Test get all BCPs
    console.log('\n7. Testing get all BCPs...');
    const allBCPsResponse = await axios.get(`${API_BASE_URL}/bcp`);
    console.log('✅ All BCPs retrieved:', allBCPsResponse.data.length, 'BCPs');

    // Test delete BCP
    console.log('\n8. Testing delete BCP...');
    await axios.delete(`${API_BASE_URL}/bcp/${createResponse.data._id}`);
    console.log('✅ BCP deleted');

    console.log('\n🎉 All API tests passed successfully!');

  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;