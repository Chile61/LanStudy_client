export class Answer{
    answerId: string;
    answerTime: Date;
    answerContent: string;
    likes: string;   // 点赞数量
    studentId: string;
    studentName: string;
    picPath: string;
    atStudentId: string;
    isLike: boolean;    // 当前用户是否已经点赞 
}