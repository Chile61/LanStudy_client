import {Student} from './student';
export class Class{
    public classId:string;
    public className:string;
    public studentList?:Array<Student>;
    public teacherName?:string;
    public teacherId?:string;
}