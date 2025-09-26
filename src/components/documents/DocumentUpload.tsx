import React, { useState } from 'react';
import { Document, DocumentType } from '../../types';
import { Upload, File, CheckCircle, AlertCircle, Eye, Trash2 } from 'lucide-react';

interface DocumentUploadProps {
  applicationId: string;
  documents: Document[];
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ applicationId, documents }) => {
  const [dragOver, setDragOver] = useState(false);

  const requiredDocuments: { type: DocumentType; label: string; description: string }[] = [
    { type: 'birth_certificate', label: 'Birth Certificate', description: 'Official birth certificate copy' },
    { type: 'previous_report', label: 'Previous Report Cards', description: 'Last 2 years of academic records' },
    { type: 'medical_records', label: 'Medical Records', description: 'Immunization records and health forms' },
    { type: 'photo', label: 'Student Photo', description: 'Recent passport-style photograph' },
    { type: 'address_proof', label: 'Proof of Address', description: 'Utility bill or lease agreement' }
  ];

  const getDocumentStatus = (docType: DocumentType) => {
    const doc = documents.find(d => d.type === docType);
    return doc ? doc.status : 'missing';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    // Handle file upload logic here
    console.log('Files dropped:', files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Handle file upload logic here
    console.log('Files selected:', files);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <File className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
        <p className="text-gray-600">Upload required documents for your application</p>
      </div>

      {/* Upload Area */}
      <div className="mb-8">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Drop files here or click to browse
          </p>
          <p className="text-gray-500 mb-4">
            Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition duration-200"
          >
            <Upload className="h-4 w-4 mr-2" />
            Select Files
          </label>
        </div>
      </div>

      {/* Document Checklist */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Required Documents</h3>
          <p className="text-sm text-gray-600 mt-1">
            {documents.filter(doc => doc.status === 'verified').length} of {requiredDocuments.length} documents verified
          </p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {requiredDocuments.map((reqDoc) => {
            const status = getDocumentStatus(reqDoc.type);
            const document = documents.find(d => d.type === reqDoc.type);
            
            return (
              <div key={reqDoc.type} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(status)}
                    <div>
                      <h4 className="font-medium text-gray-900">{reqDoc.label}</h4>
                      <p className="text-sm text-gray-500 mt-1">{reqDoc.description}</p>
                      {document && (
                        <div className="flex items-center mt-2 text-xs text-gray-600">
                          <File className="h-3 w-3 mr-1" />
                          {document.name}
                          <span className="mx-2">•</span>
                          Uploaded {document.uploadedAt.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium capitalize ${getStatusColor(status)}`}>
                      {status === 'missing' ? 'Not uploaded' : status}
                    </span>
                    
                    {document && (
                      <div className="flex space-x-1">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    
                    {status === 'missing' && (
                      <label className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-200">
                        <Upload className="h-3 w-3 mr-1" />
                        Upload
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={(e) => {
                            // Handle specific document upload
                            console.log(`Uploading ${reqDoc.type}:`, e.target.files);
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
                
                {document && document.status === 'rejected' && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-800">
                      <strong>Rejected:</strong> Document quality is poor. Please upload a clearer copy.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-blue-900">Document Verification Progress</p>
            <p className="text-sm text-blue-700">
              {documents.filter(doc => doc.status === 'verified').length} verified, {' '}
              {documents.filter(doc => doc.status === 'pending').length} pending review
            </p>
          </div>
          <div className="text-right">
            <div className="w-32 h-2 bg-blue-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{
                  width: `${(documents.filter(doc => doc.status === 'verified').length / requiredDocuments.length) * 100}%`
                }}
              ></div>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              {Math.round((documents.filter(doc => doc.status === 'verified').length / requiredDocuments.length) * 100)}% Complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};