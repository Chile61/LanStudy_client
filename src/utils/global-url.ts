export class GlobalUrl {
    static URL_HOST = 'https://private-cc669-lantianwwp.apiary-mock.com';
    static URL_HOST1 = 'https://private-cc669-lantianwwp.apiary-mock.com';
    // static URL_HOST1 = 'http://192.168.1.101:8080/lantian';
    // static URL_HOST1 = 'http://222.201.187.166:8080';
    static URL_HOST_JTA = 'https://private-3f62a8-lanstudy.apiary-mock.com';
    static URL_HOST_SU = 'http://private-006d9e-test16354.apiary-mock.com';
    static URL_HOST_WJJ = 'http://private-amnesiac-e2e0ee-wujunjie.apiary-proxy.com';

    // answer-module
    static URL_ANSWER_MODULE_PUBLISH = GlobalUrl.URL_HOST + '/student/publish';
    static URL_ANSWER_MODULE_GET_ANSWERS = GlobalUrl.URL_HOST + '/student/getanswer';
    static URL_ANSWER_MODULE_LIKE_ANSWER = GlobalUrl.URL_HOST + '/student/like';
    static URL_ANSWER_MODULE_GET_POSTS = GlobalUrl.URL_HOST + '/student/post';
    static URL_ANSWER_MODULE_GET_POST_DETAIL = GlobalUrl.URL_HOST + '/student/getpost';
    static URL_ANSWER_MODULE_SEND_COMMENT = GlobalUrl.URL_HOST + '/student/answer';
    static URL_ANSWER_MODULE_SEARCH_POST = GlobalUrl.URL_HOST + '/student/search';

    // parent-module
    static URL_PARENT_MODULE_GET_NET_LESSON = GlobalUrl.URL_HOST + '/parent/search/lesson';
    static URL_PARENT_MODULE_GET_NET_TEACHER = GlobalUrl.URL_HOST + '/parent/search/teacher';
    static URL_PARENT_MODULE_SEARCH_NET_LESSON = GlobalUrl.URL_HOST + '/parent/search/lesson';
    static URL_PARENT_MODULE_SEARCH_NET_TEACHER = GlobalUrl.URL_HOST + '/parent/search/teacher';
    static URL_PARENT_MODULE_GET_HOMEWORKS = GlobalUrl.URL_HOST + '/parent/homework';
    static URL_PARENT_MODULE_GET_PRACTICES = GlobalUrl.URL_HOST + '/parent/practice';
    static URL_PARENT_MODULE_GET_EXAMS = GlobalUrl.URL_HOST + '/parent/exam';
    static URL_PARENT_MODULE_GET_CHILDREN = GlobalUrl.URL_HOST1 + '/parent/children';
    static URL_PARENT_MODULE_ADD_CHILD = GlobalUrl.URL_HOST1 + '/parent/children/addchild';
    static URL_PARENT_MODULE_DEL_CHILD = GlobalUrl.URL_HOST1 + '/parent/children/removechild';
    static URL_PARENT_MODULE_GET_MY_NET_LESSON = GlobalUrl.URL_HOST + '/parent/get-my-lesson';
    static URL_PARENT_MODULE_GET_MY_NET_TEACHER = GlobalUrl.URL_HOST + '/parent/get-my-teacher';

    // visit module
    static URL_VISIT_MODULE_LOGIN = GlobalUrl.URL_HOST1 + '/login';
    static URL_VISIT_MODULE_SINGUP = GlobalUrl.URL_HOST1 + '/register/verify';
    static URL_VISIT_MODULE_GET_VERIFY = GlobalUrl.URL_HOST1 + '/register/sendverifyCode';
    static URL_VISIT_MODULE_LOGOUT = GlobalUrl.URL_HOST1 + '/logout';
    static URL_VISIT_MODULE_UPDATE_PASSWORD = GlobalUrl.URL_HOST + '/update-password';
    static URL_VISIT_MODULE_SUBMIT_PROFILE = GlobalUrl.URL_HOST1 + '/update-profile';
    static URL_VISIT_MODULE_GET_STUDENT_PROFILE = GlobalUrl.URL_HOST1 + '/student/mine';
    static URL_VISIT_MODULE_GET_PARENT_PROFILE = GlobalUrl.URL_HOST1 + '/parent/mine';
    static URL_VISIT_MODULE_GET_TEACHER_PROFILE = GlobalUrl.URL_HOST1 + '/teacher/mine';
    static URL_VISIT_MODULE_UPDATE_STUDENT_PROFILE = GlobalUrl.URL_HOST1 + '/student/mine/modify';
    static URL_VISIT_MODULE_UPDATE_PARENT_PROFILE = GlobalUrl.URL_HOST1 + '/parent/mine/modify';
    static URL_VISIT_MODULE_UPDATE_TEACHER_PROFILE = GlobalUrl.URL_HOST1 + '/teacher/mine/modify';

    static URL_VISIT_MODULE_GET_MY_CLASS = GlobalUrl.URL_HOST + '/class/my';
    static URL_VISIT_MODULE_GET_CLASS_INFO = GlobalUrl.URL_HOST + '/class/students';
    static URL_VISIT_MODULE_QUIT_CLASS = GlobalUrl.URL_HOST + '/class/delete';
    static URL_VISIT_MODULE_JOIN_CLASS = GlobalUrl.URL_HOST + '/class/join';

    // time_manager-module
    static URL_TIME_MANAGER_MODULE_SCHEDULE_ADD = GlobalUrl.URL_HOST_JTA + '/Schedule/add';
    static URL_TIME_MANAGER_MODULE_SCHEDULE_GET = GlobalUrl.URL_HOST_JTA + '/Schedule/get';
    static URL_TIME_MANAGER_MODULE_SCHEDULE_DAILY = GlobalUrl.URL_HOST_JTA + '/Schedule/daily';

    static URL_TIME_MANAGER_MODULE_GET_SCHEDULE = GlobalUrl.URL_HOST + '/student/getSchedule';//获取日程表
    static URL_TIME_MANAGER_MODULE_ADD_SCHEDULE = GlobalUrl.URL_HOST + '/student/addSchedule';//添加日程表
   
    //teacher-module
    static URL_TEACHER_MODULE_GET_CLASS_LIST = GlobalUrl.URL_HOST + '/teacher/get-class';
    static URL_TEACHER_MODULE_ADD_STUDENT = GlobalUrl.URL_HOST + '/teacher/add-student';
    static URL_TEACHER_MODULE_CREATE_CLASS = GlobalUrl.URL_HOST + '/teacher/create-class';

    static URL_TEACHER_MODULE_GET_CLASS_HOMEWORKS = GlobalUrl.URL_HOST_SU + '/teacher/course/management';

    static URL_TEACHER_MODULE_DELETE_HOMEWORKS = GlobalUrl.URL_HOST_SU + '/teacher/course/management/delete';
    static URL_TEACHER_MODULE_GET_ASSIGN_DETAIL_1 = GlobalUrl.URL_HOST_SU + '/teacher/course/management/get-assign1';
    static URL_TEACHER_MODULE_GET_ASSIGN_DETAIL_2 = GlobalUrl.URL_HOST_SU + '/teacher/course/management/get-assign2';
    static URL_TEACHER_MODULE_GET_ASSIGN_DETAIL_3 = GlobalUrl.URL_HOST_SU + '/teacher/course/management/get-assign3';
    static URL_TEACHER_MODULE_ASSIGN = GlobalUrl.URL_HOST_SU + '/teacher/course/management/assign';
    static URL_TEACHER_MODULE_GET_PPT = GlobalUrl.URL_HOST_SU + '/teacher/course/get-ppt';
    static URL_TEACHER_MODULE_GET_COLLECTION = GlobalUrl.URL_HOST_SU + '/teacher/course/get-collection';
    static URL_TEACHER_MODULE_GET_CORRECT = GlobalUrl.URL_HOST_SU + '/teacher/course/get-correct';
    static URL_TEACHER_MODULE_GET_CORRECT_STUDENT = GlobalUrl.URL_HOST_SU + '/teacher/course/get-correct-student';
    static URL_TEACHER_MODULE_GET_CORRECT_STUDENT_DETAIL = GlobalUrl.URL_HOST_SU + '/teacher/course/get-correct-detail';
    static URL_TEACHER_MODULE_CORRECT = GlobalUrl.URL_HOST_SU + '/teacher/course/correct';
    static URL_TEACHER_MODULE_GET_STATISTICS = GlobalUrl.URL_HOST_SU + '/teacher/course/statistics/get-statistics';
    static URL_TEACHER_MODULE_GET_STATISTICS_DETAIL = GlobalUrl.URL_HOST_SU + '/teacher/course/statistics/get-statistics-detail';


    // wrong-module
    static URL_WRONG_Q_MODULE_GET_WRONG_QUESTIONS = GlobalUrl.URL_HOST + '/wrong/get';

    // student module
    static URL_STUDENT_MODULE_GET_PAPERS = GlobalUrl.URL_HOST + '/student/getPaperList';//获取跟某个学生相关的试卷列表。
    static URL_STUDENT_MODULE_GET_PAPER_QUESTIONS = GlobalUrl.URL_HOST + '/student/getPaperQuestions';//获取某张试卷的所有题目内容
    static URL_STUDENT_MODULE_UPLOAD_SOLUTIONS = GlobalUrl.URL_HOST + '/student/uploadSolutions';//上传学生做题答案


    static URL_STUDENT_MODULE_GET_UNFINSHED_HOMEWORK = GlobalUrl.URL_HOST + '/homework/unfinished';
    static URL_STUDENT_MODULE_GET_FINSHED_HOMEWORK = GlobalUrl.URL_HOST + '/homework/finished';
    static URL_STUDENT_MODULE_GET_PAPER_LIST = GlobalUrl.URL_HOST_WJJ + '/student/get-paper-list';//要弃用
    static URL_SUTDENT_MODULE_GET_QUESTION_LIST = GlobalUrl.URL_HOST_WJJ + '/student/get-question-list';

    // 
    static URL_W_COOKIE = GlobalUrl.URL_HOST1 + '/test/writecookie';
    static URL_R_COOKIE = GlobalUrl.URL_HOST1 + '/test/readcookie';
}

