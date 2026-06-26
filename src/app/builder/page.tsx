'use client';

import { useState } from 'react';
import { ResumePreview } from '@/components/preview/ResumePreview';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { useResume } from '@/context/ResumeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';

export default function BuilderPage() {
  const { calculateCompleteness } = useResume();
  const completeness = calculateCompleteness();
  const [activeTab, setActiveTab] = useState('edit');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // PDF download implementation
    alert('PDF download feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b bg-white dark:bg-gray-950 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Resume Builder</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button size="sm" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-950 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Resume Completeness</span>
            <span className="text-sm font-medium text-blue-600">{completeness}%</span>
          </div>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${completeness}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Tabs */}
        <div className="md:hidden mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="mt-6">
              <div className="space-y-6">
                <PersonalInfoForm />
              </div>
            </TabsContent>
            <TabsContent value="preview" className="mt-6">
              <ResumePreview />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <PersonalInfoForm />
          </div>
          <div>
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
