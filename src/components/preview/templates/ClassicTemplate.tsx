'use client';

import { Resume } from '@/types';

interface ClassicTemplateProps {
  resume: Resume;
}

export function ClassicTemplate({ resume }: ClassicTemplateProps) {
  return (
    <div className="min-h-screen bg-white p-10 font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-400 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{resume.personalInfo.fullName}</h1>
        <div className="mt-2 text-sm text-gray-700 space-y-1">
          {resume.personalInfo.email && <p>{resume.personalInfo.email}</p>}
          {resume.personalInfo.phone && <p>{resume.personalInfo.phone}</p>}
          {resume.personalInfo.address && <p>{resume.personalInfo.address}</p>}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Experience
          </h2>
          {resume.experiences.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-gray-900">{exp.jobTitle}</p>
                  <p className="text-gray-700">{exp.company}</p>
                </div>
                <p className="text-gray-700 text-sm">
                  {exp.startDate}
                  {!exp.currentJob && ` - ${exp.endDate}`}
                  {exp.currentJob && ' - Present'}
                </p>
              </div>
              <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Education
          </h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <p className="text-gray-700 text-sm">{edu.year}</p>
              </div>
              {edu.grade && <p className="text-sm text-gray-700">GPA: {edu.grade}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Skills
          </h2>
          <p className="text-gray-700 text-sm">
            {resume.skills.map((skill) => skill.name).join(' • ')}
          </p>
        </div>
      )}
    </div>
  );
}
