import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Job } from '@/hooks/queries/useJobs';
import Skills from './Skills';
import SkillDialog from './SkillDialog';

interface EditJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (jobId: string, updates: Partial<Job>) => void;
    job: Job | null;
    isLoading?: boolean;
}

export default function EditJobModal({
    isOpen,
    onClose,
    onSave,
    job,
    isLoading = false,
}: EditJobModalProps) {
    const [formData, setFormData] = useState<Partial<Job>>({});
    const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const [expertise, setExpertise] = useState([
        "Python", "JavaScript", "UI/UX", "React", "Node.js",
        "Django", "SQL", "AWS", "Figma", "Project Management", "Testing"
    ]);

    useEffect(() => {
        if (job) {
            setFormData({
                title: job.title,
                description: job.description,
                workType: job.workType,
                salary: job.salary,
                location: job.location,
                experienceLevel: job.experienceLevel,
                skills: job.skills || [],
            });

            // Add any existing job skills to expertise if not already there
            if (job.skills) {
                const newExpertise = [...expertise];
                job.skills.forEach(skill => {
                    if (!newExpertise.includes(skill)) {
                        newExpertise.push(skill);
                    }
                });
                setExpertise(newExpertise);
            }
        }
    }, [job]);

    if (!isOpen || !job) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSkillsUpdate = (skill: string) => {
        const currentSkills = formData.skills || [];
        const updatedSkills = currentSkills.includes(skill)
            ? currentSkills.filter(s => s !== skill)
            : [...currentSkills, skill];
        setFormData(prev => ({ ...prev, skills: updatedSkills }));
    };

    const handleAddSkill = () => {
        if (newSkill.trim() !== "") {
            setExpertise([...expertise, newSkill.trim()]);
            setNewSkill("");
            setIsSkillDialogOpen(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(job.id, formData);
    };

    const workTypeOptions = ["Full Time", "Part Time", "Contract", "Project Based"];
    const experienceLevelOptions = ["Entry Level", "Mid Level", "Senior Level", "Lead/Principal"];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white max-h-[90vh] flex flex-col rounded-xl shadow-xl w-[90vw] max-w-2xl p-4 transform transition-all scale-100 relative">
                <div className='flex-shrink'>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        disabled={isLoading}
                    >
                        <X size={20} className="text-gray-500" />
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Job Posting</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 px-4 flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Job Title */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Work Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Work Type</label>
                            <select
                                name="workType"
                                value={formData.workType || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            >
                                <option value="">Select Type</option>
                                {workTypeOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>

                        {/* Experience Level */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                            <select
                                name="experienceLevel"
                                value={formData.experienceLevel || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            >
                                <option value="">Select Level</option>
                                {experienceLevelOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Salary/Budget</label>
                            <input
                                type="text" // Using text to allow ranges or currency symbols if needed, though type says number in JobType, the UI often handles strings
                                name="salary"
                                value={formData.salary || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <select
                                name="location"
                                value={formData.location || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            >
                                <option value="">Select Location</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="On-site">On-site</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description || ''}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Skills */}
                        <div className="md:col-span-2">
                            <Skills
                                title="Skills Required"
                                skills={formData.skills || []}
                                expertise={expertise}
                                handleSkillsUpdate={handleSkillsUpdate}
                                skillsError={false}
                                setIsDialogOpen={setIsSkillDialogOpen}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {isSkillDialogOpen && (
                <SkillDialog
                    newSkill={newSkill}
                    setNewSkill={setNewSkill}
                    setIsDialogOpen={setIsSkillDialogOpen}
                    handleAddSkill={handleAddSkill}
                />
            )}
        </div>
    );
}
