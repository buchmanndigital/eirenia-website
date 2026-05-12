export type UserRole = "admin" | "coach";
export type UserStatus = "pending" | "active" | "blocked";
export type CourseStatus = "draft" | "pending" | "published";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string | null;
  bio: string | null;
  createdAt: string;
};

export type Course = {
  id: string;
  coachId: string;
  coachName: string;
  title: string;
  slug: string;
  emoji: string;
  category: string;
  categoryColor: string | null;
  subtitle: string;
  about: string;
  duration: string;
  location: string;
  expectations: string[];
  donationText: string;
  status: CourseStatus;
  createdAt: string;
  updatedAt: string;
};

export type CourseRegistration = {
  id: string;
  courseId: string;
  courseTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string | null;
  createdAt: string;
};
