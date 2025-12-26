import React from 'react';
import type { ProfessionalExperience } from '../types';

const experienceData: ProfessionalExperience[] = [
  {
    role: "Senior Associate",
    company: "AccompanyHealth",
    period: "2025 - Present",
    description: [
      "Collaborating with leading healthcare providers to design and implement innovative patient care models.",
      "Analyzing complex healthcare data to identify key trends and drive strategic decision-making.",
      "Managing cross-functional project teams to ensure timely delivery of client solutions."
    ]
  },
  {
    role: "Healthcare Consultant",
    company: "Deloitte",
    period: "2020 - 2024",
    description: [
      "Advised healthcare clients on operational improvements and strategic growth initiatives.",
      "Developed data-driven recommendations for process optimization and cost reduction.",
      "Supported large-scale digital transformation projects for major hospital systems."
    ]
  },
];

const skills = [
  "Healthcare Strategy", "Data Analysis", "Project Management", "Healthcare Operations",
  "Value-Based Care", "Patient Care Models", "Market Research", "Stakeholder Engagement"
];

const Professional: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-28 md:py-36 animate-fade-in">
      <h2 className="text-4xl font-bold mb-12 text-center">Professional Career</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-semibold mb-6">Work Experience</h3>
          <div className="space-y-8">
            {experienceData.map((job, index) => (
              <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{job.role}</h4>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">{job.period}</p>
                </div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{job.company}</p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  {job.description.map((desc, i) => <li key={i}>{desc}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-slide-in-up" style={{ animationDelay: '300ms' }}>
          <h3 className="text-2xl font-semibold mb-6">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>

          <h3 className="text-2xl font-semibold mb-6 mt-12">Education</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Master of Arts in Kuchipudi</h4>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Aria University</p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">2023 - 2025</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Master of Science in Healthcare Management</h4>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Weatherhead School of Management, Case Western Reserve University</p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">2020 - 2021</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Bachelor of Science in Biochemistry</h4>
              <p className="text-sm font-medium italic text-gray-500 dark:text-gray-400">Minors in Biology, Chemistry, Mathematics</p>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Case Western Reserve University</p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">2017 - 2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Professional;