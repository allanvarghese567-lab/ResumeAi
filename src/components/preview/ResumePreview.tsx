'use client';

import { useResume } from '@/context/ResumeContext';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { Loader } from '@/components/common/Loader';

interface ResumePreviewProps {
  forPrint?: boolean;
}

export function ResumePreview({ forPrint }: ResumePreviewProps) {
  const { resume } = useResume();

  if (!resume) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader text="Loading resume..." />
      </div>
    );
  }

  const templateMap = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
  };

  const TemplateComponent = templateMap[resume.template];

  return (
    <div className={forPrint ? '' : 'rounded-lg border bg-white shadow-sm dark:bg-slate-950'}>
      <TemplateComponent resume={resume} />
    </div>
  );
}
