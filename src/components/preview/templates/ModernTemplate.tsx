'use client';

import { Resume } from '@/types';

interface ModernTemplateProps {
  resume: Resume;
}

export function ModernTemplate({ resume }: ModernTemplateProps) {
  return (
    <div className="min-h-screen bg-white p-12 font-sans">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {resume.personalInfo.fullName}
            </h1>
            {resume.personalInfo.phone && (
              <p className="mt-2 text-sm text-gray-600">{resume.personalInfo.phone}</p>
            )}
            {resume.personalInfo.email && (
              <p className="text-sm text-gray-600">{resume.personalInfo.email}</p>
            )}
            {resume.personalInfo.address && (
              <p className="text-sm text-gray-600">{resume.personalInfo.address}</p>
            )}
          </div>
          {resume.personalInfo.profilePhoto && (
            <img
              src={resume.personalInfo.profilePhoto}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-blue-600"
            />
          )}
        </div>
        <div className="mt-4 flex gap-4 text-sm">
          {resume.personalInfo.linkedin && (
            <a href={`https://${resume.personalInfo.linkedin}`} className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          )}
          {resume.personalInfo.github && (
            <a href={`https://${resume.personalInfo.github}`} className="text-blue-600 hover:underline">
              GitHub
            </a>
          )}
          {resume.personalInfo.portfolio && (
            <a href={`https://${resume.personalInfo.portfolio}`} className="text-blue-600 hover:underline">
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-2">
            Experience
          </h2>
          {resume.experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.jobTitle}</h3>
                  <p className="text-blue-600 font-semibold">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-600">
                  {exp.startDate}
                  {!exp.currentJob && ` - ${exp.endDate}`}
                  {exp.currentJob && ' - Present'}
                </span>
              </div>
              <p className="text-gray-700 mt-2 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-2">
            Education
          </h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-blue-600 font-semibold">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-600">{edu.year}</span>
              </div>
              {edu.grade && <p className="text-sm text-gray-700 mt-1">GPA: {edu.grade}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-2">
            Projects
          </h2>
          {resume.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="font-bold text-gray-900">{project.name}</h3>
              <p className="text-gray-700 text-sm mt-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {resume.languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-2">
            Languages
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {resume.languages.map((lang) => (
              <div key={lang.id}>
                <p className="font-semibold text-gray-900">{lang.name}</p>
                <p className="text-sm text-gray-600">{lang.proficiency}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
