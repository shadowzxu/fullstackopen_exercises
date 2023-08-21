interface CoursePartBase {
  name: string;
  exerciseCount: number;
};

interface CoursePartDetail extends CoursePartBase {
  description: string;
};

interface CoursePartBasic extends CoursePartDetail {
  kind: "basic"
};

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
};

interface CoursePartBackground extends CoursePartDetail {
  backgroundMaterial: string;
  kind: "background"
};

interface CoursePartSpecial extends CoursePartDetail {
  requirements: string[];
  kind: "special";
};

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;