'use client';

import { Resume } from '@/types';

interface MinimalTemplateProps {
  resume: Resume;
}

export function MinimalTemplate({ resume }: MinimalTemplateProps) {
  return (
    <div className="min-h-screen bg-white p-8 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{resume.personalInfo.fullName}</h1>
        <div className="mt-2 flex gap-4 text-xs text-gray-600">
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo.address && <span>{resume.personalInfo.address}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.summary && (
        <div className="mb-6">
          <p className="text-gray-700 text-sm leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-widest">
            Experience
          </h2>
          {resume.experiences.map((exp) => (
            <div key={exp.id} className="mb-3 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">{exp.jobTitle}</span>
                <span className="text-gray-600 text-xs">
                  {exp.startDate}
                  {!exp.currentJob && ` - ${exp.endDate}`}
                  {exp.currentJob && ' - Present'}
                </span>
              </div>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-gray-700 mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-widest">
            Education
          </h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">{edu.degree}</span>
                <span className="text-gray-600 text-xs">{edu.year}</span>
              </div>
              <p className="text-gray-600">{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div>
          <h2 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-widest">
            Skills
          </h2>
          <p className="text-gray-700 text-sm">
            {resume.skills.map((skill) => skill.name).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
