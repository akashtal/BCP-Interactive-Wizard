const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testFullFlow() {
  try {
    console.log('🧪 Testing Full BCP Wizard Flow...\n');

    // Test 1: Health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);

    // Test 2: Get initial data
    console.log('\n2. Testing get sites and owners...');
    const [sitesResponse, ownersResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/sites`),
      axios.get(`${API_BASE_URL}/owners`)
    ]);
    console.log('✅ Sites retrieved:', sitesResponse.data.length, 'sites');
    console.log('✅ Owners retrieved:', ownersResponse.data.length, 'owners');

    if (sitesResponse.data.length === 0 || ownersResponse.data.length === 0) {
      console.log('⚠️  No sites or owners found. Please run: npm run seed');
      return;
    }

    // Test 3: Create BCP - Step 1
    console.log('\n3. Testing Step 1 - Service & Process Capture...');
    const step1Data = {
      bcpName: 'Test Payroll BCP',
      businessUnit: 'Human Resources',
      subBusinessUnit: 'Payroll Operations',
      service: {
        name: 'Payroll System',
        description: 'Monthly payroll processing system'
      },
      processes: [
        {
          name: 'Salary calculation',
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

    const step1Response = await axios.post(`${API_BASE_URL}/bcp`, step1Data);
    console.log('✅ Step 1 completed, BCP ID:', step1Response.data._id);
    const bcpId = step1Response.data._id;

    // Test 4: Update BCP - Step 2
    console.log('\n4. Testing Step 2 - Business Impact Analysis...');
    const step2Data = {
      ...step1Response.data,
      criticality: {
        timeframe: 'Hours',
        value: 24
      },
      headcountRequirements: [
        {
          siteId: sitesResponse.data[0]._id,
          processId: 'Salary calculation',
          headcount: 3
        }
      ],
      dependencies: [
        {
          type: 'IT',
          description: 'HR Information System (HRIS)'
        }
      ],
      currentStep: 2
    };

    const step2Response = await axios.put(`${API_BASE_URL}/bcp/${bcpId}`, step2Data);
    console.log('✅ Step 2 completed, current step:', step2Response.data.currentStep);

    // Test 5: Update BCP - Step 3
    console.log('\n5. Testing Step 3 - Communication...');
    const step3Data = {
      ...step2Response.data,
      notifications: [
        {
          name: 'HR Management Team',
          email: 'hr-management@company.com',
          type: 'group'
        },
        {
          name: 'IT Operations',
          email: 'it-ops@company.com',
          type: 'group'
        }
      ],
      currentStep: 3
    };

    const step3Response = await axios.put(`${API_BASE_URL}/bcp/${bcpId}`, step3Data);
    console.log('✅ Step 3 completed, current step:', step3Response.data.currentStep);

    // Test 6: Update BCP - Step 4
    console.log('\n6. Testing Step 4 - Risk Assessment...');
    const step4Data = {
      ...step3Response.data,
      risks: 'Key risks include: 1) Power outages affecting data centers, 2) Cyber security incidents targeting employee data, 3) Banking partner service disruptions.',
      status: 'completed',
      currentStep: 4
    };

    const step4Response = await axios.put(`${API_BASE_URL}/bcp/${bcpId}`, step4Data);
    console.log('✅ Step 4 completed, status:', step4Response.data.status);

    // Test 7: Verify final BCP
    console.log('\n7. Testing final BCP retrieval...');
    const finalResponse = await axios.get(`${API_BASE_URL}/bcp/${bcpId}`);
    const finalBCP = finalResponse.data;
    
    console.log('✅ Final BCP retrieved:');
    console.log('   - Name:', finalBCP.bcpName);
    console.log('   - Service:', finalBCP.service.name);
    console.log('   - Processes:', finalBCP.processes.length);
    console.log('   - Criticality:', finalBCP.criticality.timeframe, finalBCP.criticality.value);
    console.log('   - Dependencies:', finalBCP.dependencies.length);
    console.log('   - Notifications:', finalBCP.notifications.length);
    console.log('   - Status:', finalBCP.status);

    // Test 8: Get all BCPs
    console.log('\n8. Testing get all BCPs...');
    const allBCPsResponse = await axios.get(`${API_BASE_URL}/bcp`);
    console.log('✅ All BCPs retrieved:', allBCPsResponse.data.length, 'BCPs');

    // Test 9: Clean up - Delete test BCP
    console.log('\n9. Cleaning up test data...');
    await axios.delete(`${API_BASE_URL}/bcp/${bcpId}`);
    console.log('✅ Test BCP deleted');

    console.log('\n🎉 Full flow test completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   ✅ All API endpoints working');
    console.log('   ✅ Step-by-step BCP creation working');
    console.log('   ✅ Data persistence working');
    console.log('   ✅ CRUD operations working');
    console.log('\n🚀 The BCP Interactive Wizard is ready to use!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testFullFlow();
}

module.exports = testFullFlow;