/**
 * Represents all MIUN-courses
 */
export interface courses {
    courseCode: { type: String, required: true, unique: true },
    subjectCode: { type: String, required: true },
    level: { type: String, required: true },
    progression: { type: String, required: false},
    name: { type: String, required: true},
    points: { type: Number, required: true},
    institutionCode: { type: String, required: true},
    subject: { type: String, required: true},
  }
  