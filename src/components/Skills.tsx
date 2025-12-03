import { Plus } from 'lucide-react'
import React, { useState } from 'react'

const Skills = ({title, skills, expertise, handleSkillsUpdate, skillsError, setIsDialogOpen }: { title: string, skills: string[], expertise: string[], handleSkillsUpdate: any, skillsError: boolean, setIsDialogOpen: any }) => {

  return (
    <div>
      <label
        htmlFor="skills"
        className="block text-sm font-semibold text-gray-900 mb-3"
        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
      >
        {title} *
      </label>
      <div className={`w-full px-4 py-3 border ${skillsError ? "border-red-500" : "border-gray-300"
        } rounded-lg`}>
        <div className="mt-2 flex flex-wrap gap-3">
          {expertise.map((skill) => (
            <span
              key={skill}
              className={`px-3 py-1 flex justify-center items-center rounded-full text-sm font-medium cursor-pointer ${skills.includes(skill)
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
                }`}
              onClick={() => handleSkillsUpdate(skill)}
            >
              {skill}
            </span>
          ))}
          <button
            type="button"
            className="p-2 bg-gray-200 rounded-lg cursor-pointer flex justify-center items-center gap-1"
            onClick={() => setIsDialogOpen(true)} // Open the dialog
          >
            <Plus size={14} className="text-gray-500" />
            <span className='text-xs text-black'>Other</span>
          </button>
        </div>
      </div>
      {skillsError ? (
        <p className="text-sm text-red-500 mt-2">
          Please select <span className='font-bold'>atleast one</span> skill.
        </p>
      ) : (<p className="text-sm pt-2 text-gray-500">Select one or more skills or add a new skill by clicking the plus button</p>)}

    </div>
  )
}

export default Skills