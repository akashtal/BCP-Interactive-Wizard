import React, { useState, useEffect } from 'react';
import { getBCPs, deleteBCP } from '../services/api';

const Dashboard = () => {
  const [bcps, setBcps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBCPs();
  }, []);

  const fetchBCPs = async () => {
    try {
      setIsLoading(true);
      const response = await getBCPs();
      setBcps(response.data);
    } catch (error) {
      setError('Failed to fetch BCPs');
      console.error('Error fetching BCPs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this BCP?')) {
      try {
        await deleteBCP(id);
        setBcps(bcps.filter(bcp => bcp._id !== id));
      } catch (error) {
        alert('Failed to delete BCP');
        console.error('Error deleting BCP:', error);
      }
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'draft':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStepProgress = (currentStep) => {
    const totalSteps = 4;
    return Math.round((currentStep / totalSteps) * 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading BCPs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchBCPs}
            className="btn-primary mt-4"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">BCP Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your Business Continuity Plans</p>
          </div>
          <a
            href="/wizard"
            className="btn-primary"
          >
            Create New BCP
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total BCPs</p>
                <p className="text-2xl font-semibold text-gray-900">{bcps.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {bcps.filter(bcp => bcp.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {bcps.filter(bcp => bcp.status === 'draft').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BCP List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All BCPs</h2>
          </div>

          {bcps.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No BCPs found</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first Business Continuity Plan.</p>
              <a
                href="/wizard"
                className="btn-primary"
              >
                Create New BCP
              </a>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {bcps.map((bcp) => (
                <div key={bcp._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {bcp.bcpName}
                        </h3>
                        <span className={getStatusBadge(bcp.status)}>
                          {bcp.status}
                        </span>
                      </div>
                      
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Service:</span> {bcp.service?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Processes:</span> {bcp.processes?.length || 0}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Progress:</span> Step {bcp.currentStep} of 4 ({getStepProgress(bcp.currentStep)}%)
                        </p>
                      </div>
                      
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getStepProgress(bcp.currentStep)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 ml-6">
                      <span className="text-sm text-gray-500">
                        {new Date(bcp.updatedAt).toLocaleDateString()}
                      </span>
                      
                      <div className="flex space-x-2">
                        <a
                          href={`/wizard?id=${bcp._id}`}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          Edit
                        </a>
                        <button
                          onClick={() => handleDelete(bcp._id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;