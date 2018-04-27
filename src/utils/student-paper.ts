import { StudentQuestion } from './student-question'
export class StudentPaper {
    public paperId:number;
    public paperName:string;
    public subjectId:string;
    public subject:string;
    public deadLine:string;
    public assignTime:string;
    public numberOfQuestion:number;
    public isFinished:boolean;
    public question:Array<StudentQuestion>;
    public maxScore: number;
    public score: number;
}