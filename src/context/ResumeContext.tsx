'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Resume } from '@/types';

interface ResumeContextType {
  resume: Resume | null;
  setResume: (resume: Resume) => void;
  updatePersonalInfo: (info: Partial<Resume['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  addExperience: (experience: Resume['experiences'][0]) => void;
  updateExperience: (id: string, experience: Partial<Resume['experiences'][0]>) => void;
  deleteExperience: (id: string) => void;
  reorderExperiences: (experiences: Resume['experiences']) => void;
  addEducation: (education: Resume['education'][0]) => void;
  updateEducation: (id: string, education: Partial<Resume['education'][0]>) => void;
  deleteEducation: (id: string) => void;
  reorderEducation: (education: Resume['education']) => void;
  addSkill: (skill: Resume['skills'][0]) => void;
  updateSkill: (id: string, skill: Partial<Resume['skills'][0]>) => void;
  deleteSkill: (id: string) => void;
  addProject: (project: Resume['projects'][0]) => void;
  updateProject: (id: string, project: Partial<Resume['projects'][0]>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (projects: Resume['projects']) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: (resumeId: string) => void;
  calculateCompleteness: () => number;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<Resume | null>(null);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);

    const timer = setTimeout(() => {
      if (resume) {
        localStorage.setItem(`resume-${resume.id}`, JSON.stringify(resume));
      }
    }, 1000);

    setAutoSaveTimer(timer);

    return () => clearTimeout(timer);
  }, [resume]);

  const updatePersonalInfo = useCallback(
    (info: Partial<Resume['personalInfo']>) => {
      setResume((prev) =>
        prev
          ? {
              ...prev,
              personalInfo: { ...prev.personalInfo, ...info },
              updatedAt: new Date(),
            }
          : null
      );
    },
    []
  );

  const updateSummary = useCallback((summary: string) => {
    setResume((prev) =>
      prev
        ? {
            ...prev,
            summary,
            updatedAt: new Date(),
          }
        : null
    );
  }, []);

  const addExperience = useCallback((experience: Resume['experiences'][0]) => {
    setResume((prev) =>
      prev
        ? {
            ...prev,
            experiences: [...prev.experiences, experience],
            updatedAt: new Date(),
          }
        : null
    );
  }, []);

  const updateExperience = useCallback(
    (id: string, experience: Partial<Resume['experiences'][0]>) => {
      setResume((prev) =>
        prev
          ? {
              ...prev,
              experiences: prev.experiences.map((exp) =>
                exp.id === id ? { ...exp, ...experience } : exp
              ),
              updatedAt: new Date(),
            }
          : null
      );
    },
    []
  );

  const deleteExperience = useCallback((id: string) => {
    setResume((prev) =>
      prev
        ? {
            ...prev,
            experiences: prev.experiences.filter((exp) => exp.id !== id),
            updatedAt: new Date(),
          }
        : null
    );
  }, []);

  const reorderExperiences = useCallback((experiences: Resume['experiences']) => {
    setResume((prev) =>
      prev
        ? {
            ...prev,
            experiences,
            updatedAt: new Date(),
          }
        : null
    );
  }, []);

  const addEducation = useCallback((education: Resume['education'][0]) => {
    setResume((prev) =>
      prev
        ? {
            ...prev,
            education: [...prev.education, education],
            updatedAt: new Date(),
          }
        : null
    );
  }, []);

  const updateEducation = useCallback(
    (id: string, education: Partial<Resume['education'][0]>) => {
      setResume((prev) =>
        prev
          ? {
              ...prev,
              education: prev.education.map((edu) =>
                edu.id === id ? { ...edu, ...education } : edu
              ),
              updatedAt: new Date(),
            }
          : null
      );
    },
    []
  );

  const deleteEducation = useCallback((id: string) => {
    setResume((prev) =>
      prev
        ? {
            ...prev,
            education: prev.education.filter((edu) => edu.id !== id),
            updatedAt: new Date(),
          }
        : null
    );
  }, []);

  const reorderEducation = useCallback((education: Resume['education']) => {
    setResume((prev) =>
      prev
        ? {
            ...prev,
            education,
            updatedAt: new Date(),
          }
        : null
    );
  }, []);

  const addSkill = useCallback((skill: Resume['skills'][0]) => {
    setResume((prev) =>
      prev
        ? {
            ...prev,
            skills: [...prev.skills, skill],
            updatedAt: new Date(),
          }
        : null
    );
  }, []);

  const updateSkill = useCallback((id: string, skill: Partial<Resume['skills'][0]>) => {
    setResume((prev) =>
      prev
        ? {
            ...prev,
            skills: prev.skills.map((s) =>
              s.id === id ? { ...s, ...skill } : s
            ),
            updatedAt: new Date(),
          }
        : null
    );
  }, []);

  const deleteSkill = useCallback((id: string) => {
    setResume((prev) =>
      prev
        ? {
            ...prev,
            skills: prev.skills.filter((s) => s.id !== id),
            updatedAt: new Date(),
          }
        : null
    );
  }, []);

  const addProject = useCallback((project: Resume['projects'][0]) => {
    setResume((prev) =>
      prev
        ? {
            ...prev,
            projects: [...prev.projects, project],
            updatedAt: new Date(),
          }
        : null
    );
  }, []);

  const updateProject = useCallback(
    (id: string, project: Partial<Resume['projects'][0]>) => {
      setResume((prev) =>
        prev
          ? {
              ...prev,
              projects: prev.projects.map((p) =>
                p.id === id ? { ...p, ...project } : p
              ),
              updatedAt: new Date(),
            }
          : null
      );
    },
    []
  );

  const deleteProject = useCallback((id: string) => {
    setResume((prev) =>
      prev
        ? {
            ...prev,
            projects: prev.projects.filter((p) => p.id !== id),
            updatedAt: new Date(),
          }
        : null
    );
  }, []);

  const reorderProjects = useCallback((projects: Resume['projects']) => {
    setResume((prev) =>
      prev
        ? {
            ...prev,
            projects,
            updatedAt: new Date(),
          }
        : null
    );
  }, []);

  const saveToLocalStorage = useCallback(() => {
    if (resume) {
      localStorage.setItem(`resume-${resume.id}`, JSON.stringify(resume));
    }
  }, [resume]);

  const loadFromLocalStorage = useCallback((resumeId: string) => {
    const data = localStorage.getItem(`resume-${resumeId}`);
    if (data) {
      setResume(JSON.parse(data));
    }
  }, []);

  const calculateCompleteness = useCallback(() => {
    if (!resume) return 0;

    let completedSections = 0;
    const totalSections = 8; // Personal Info, Summary, Experience, Education, Skills, Projects, Languages, Interests

    if (resume.personalInfo.fullName && resume.personalInfo.email) completedSections++;
    if (resume.summary) completedSections++;
    if (resume.experiences.length > 0) completedSections++;
    if (resume.education.length > 0) completedSections++;
    if (resume.skills.length > 0) completedSections++;
    if (resume.projects.length > 0) completedSections++;
    if (resume.languages.length > 0) completedSections++;
    if (resume.interests.length > 0) completedSections++;

    return Math.round((completedSections / totalSections) * 100);
  }, [resume]);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        updatePersonalInfo,
        updateSummary,
        addExperience,
        updateExperience,
        deleteExperience,
        reorderExperiences,
        addEducation,
        updateEducation,
        deleteEducation,
        reorderEducation,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        saveToLocalStorage,
        loadFromLocalStorage,
        calculateCompleteness,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within ResumeProvider');
  }
  return context;
}
