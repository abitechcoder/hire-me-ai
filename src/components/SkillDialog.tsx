import { X } from 'lucide-react'

const SkillDialog = ({newSkill, setNewSkill, setIsDialogOpen, handleAddSkill}: {newSkill: string, setNewSkill: any, setIsDialogOpen: any, handleAddSkill: any}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              {/* Dialog Header */}
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-xl font-bold text-gray-900"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Add Skill
                </h2>
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setIsDialogOpen(false)} // Close the dialog
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Dialog Content */}
              <div>
                <label
                  htmlFor="newSkill"
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Skill Name
                </label>
                <input
                  type="text"
                  id="newSkill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a skill (e.g., TypeScript)"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                />
              </div>

              {/* Dialog Actions */}
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2 cursor-pointer"
                  onClick={() => setIsDialogOpen(false)} // Close the dialog
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
                  onClick={handleAddSkill} // Add the new skill
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Add Skill
                </button>
              </div>
            </div>
          </div>
  )
}

export default SkillDialog