/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : lantian

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-04-20 20:27:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for answer
-- ----------------------------
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
  `answer_id` varchar(50) NOT NULL,
  `student_id` varchar(50) NOT NULL,
  `post_id` varchar(50) NOT NULL,
  `answer_content` varchar(300) NOT NULL,
  `answer_time` datetime NOT NULL,
  `likes` int(9) DEFAULT NULL,
  `at_student_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `post_id_idx` (`post_id`),
  KEY `student_id_idx` (`student_id`),
  CONSTRAINT `answer_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
  CONSTRAINT `answer_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of answer
-- ----------------------------

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `class_id` varchar(50) NOT NULL,
  `pic_path` varchar(200) NOT NULL,
  `student_number` int(3) NOT NULL,
  `grade` int(2) NOT NULL,
  `class_name` varchar(45) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('10001', 'c:/class1.jpg', '38', '7', '七年1班', '2018-04-13 20:00:28');
INSERT INTO `class` VALUES ('10002', 'c:/class2.jpg', '39', '7', '七年2班', '2018-04-12 21:29:18');
INSERT INTO `class` VALUES ('10003', 'c:/class3.jpg', '40', '7', '七年3班', '2018-03-31 21:23:28');
INSERT INTO `class` VALUES ('10004', 'c:/class4.jpg', '41', '8', '八年4班', '2018-04-14 21:24:10');

-- ----------------------------
-- Table structure for class_paper
-- ----------------------------
DROP TABLE IF EXISTS `class_paper`;
CREATE TABLE `class_paper` (
  `paper_id` varchar(50) NOT NULL,
  `class_id` varchar(50) NOT NULL,
  `ave_time` int(5) DEFAULT NULL,
  `ave_score` int(3) DEFAULT NULL,
  `assign_teacher_id` varchar(50) NOT NULL,
  `dead_line` datetime NOT NULL,
  `submit_number` int(3) NOT NULL DEFAULT '0',
  `assign_time` datetime NOT NULL,
  `paper_type` varchar(1) NOT NULL,
  `exam_time` int(5) DEFAULT NULL,
  `rank` blob,
  PRIMARY KEY (`paper_id`,`class_id`),
  KEY `class_id_idx` (`class_id`),
  CONSTRAINT `class_paper_class_id` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `class_paper_paper_id` FOREIGN KEY (`paper_id`) REFERENCES `paper` (`paper_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='班级和paper的关系表';

-- ----------------------------
-- Records of class_paper
-- ----------------------------
INSERT INTO `class_paper` VALUES ('1001', '10001', '150', '88', '201430613253', '2018-09-22 20:53:22', '38', '2018-04-13 20:01:28', '1', '200', null);
INSERT INTO `class_paper` VALUES ('1002', '10002', '148', '89', '201430613254', '2018-07-01 09:29:44', '39', '2018-04-15 09:29:56', '1', '150', null);
INSERT INTO `class_paper` VALUES ('1003', '10003', '200', '85', '201430613255', '2018-04-15 21:25:25', '40', '2018-04-14 21:25:46', '1', '150', null);
INSERT INTO `class_paper` VALUES ('1004', '10004', '200', '87', '201430613256', '2018-04-18 21:28:39', '41', '2018-04-19 21:28:48', '1', '200', null);

-- ----------------------------
-- Table structure for paper
-- ----------------------------
DROP TABLE IF EXISTS `paper`;
CREATE TABLE `paper` (
  `paper_id` varchar(50) NOT NULL,
  `paper_name` varchar(50) NOT NULL,
  `grade` int(2) NOT NULL,
  `subject_id` varchar(5) NOT NULL,
  `create_teacher_id` varchar(50) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `max_score` int(3) NOT NULL,
  PRIMARY KEY (`paper_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of paper
-- ----------------------------
INSERT INTO `paper` VALUES ('1001', '初一数学期末试卷', '7', '1', '201430613253', '2018-04-13 19:28:28', '100');
INSERT INTO `paper` VALUES ('1002', '七年级上期英语期末试卷', '7', '2', '201430613254', '2018-04-13 19:28:28', '100');
INSERT INTO `paper` VALUES ('1003', '我的试卷2', '7', '1', '201430613255', '2018-04-13 19:28:28', '100');
INSERT INTO `paper` VALUES ('1004', '我的试卷4', '8', '4', '201430613256', '2018-04-18 21:30:10', '100');

-- ----------------------------
-- Table structure for parent
-- ----------------------------
DROP TABLE IF EXISTS `parent`;
CREATE TABLE `parent` (
  `parent_id` varchar(50) NOT NULL,
  `phone` varchar(14) NOT NULL,
  `password` varchar(20) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `token` varchar(50) DEFAULT NULL,
  `pic_path` varchar(50) NOT NULL,
  `birthday` date DEFAULT NULL,
  `sex` varchar(1) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `state` varchar(1) NOT NULL,
  `verify_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='家长实体表';

-- ----------------------------
-- Records of parent
-- ----------------------------
INSERT INTO `parent` VALUES ('202230613253', '18828075723', '123456', '2016-02-01 21:11:14', null, 'c:\\301.jpg', null, '男', '张家长', '1', null);
INSERT INTO `parent` VALUES ('202230613254', '18828075724', '123456', '2015-06-24 21:11:23', null, 'c:\\302.jpg', null, '女', '宁家长', '1', null);
INSERT INTO `parent` VALUES ('202230613255', '18828075725', '123456', '2015-06-18 21:12:02', null, 'c:\\303.jpg', null, '女', '谭家长', '0', null);

-- ----------------------------
-- Table structure for parent_student
-- ----------------------------
DROP TABLE IF EXISTS `parent_student`;
CREATE TABLE `parent_student` (
  `parent_student_parent_id` varchar(50) NOT NULL,
  `parent_student_student_id` varchar(50) NOT NULL,
  PRIMARY KEY (`parent_student_parent_id`,`parent_student_student_id`),
  KEY `student_id_idx` (`parent_student_student_id`),
  CONSTRAINT `parent_id` FOREIGN KEY (`parent_student_parent_id`) REFERENCES `parent` (`parent_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `student_id` FOREIGN KEY (`parent_student_student_id`) REFERENCES `student` (`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of parent_student
-- ----------------------------
INSERT INTO `parent_student` VALUES ('202230613253', '201830613253');
INSERT INTO `parent_student` VALUES ('202230613254', '201830613254');

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `post_id` varchar(50) NOT NULL,
  `student_id` varchar(50) NOT NULL,
  `post_title` varchar(50) NOT NULL,
  `post_content` varchar(300) NOT NULL,
  `create_time` datetime NOT NULL,
  `subject_id` varchar(5) NOT NULL,
  `change_time` datetime DEFAULT NULL,
  `answer_number` int(9) NOT NULL DEFAULT '0',
  `pic_path` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `student_id_idx` (`student_id`),
  CONSTRAINT `post_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of post
-- ----------------------------

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `question_id` varchar(50) NOT NULL,
  `title_id` varchar(50) NOT NULL,
  `subject_id` varchar(5) DEFAULT NULL,
  `option_a` varchar(200) DEFAULT NULL,
  `option_b` varchar(200) DEFAULT NULL,
  `option_c` varchar(200) DEFAULT NULL,
  `option_d` varchar(200) DEFAULT NULL,
  `answer` varchar(50) NOT NULL,
  `grade` int(2) DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `question_title_id_idx` (`title_id`),
  CONSTRAINT `question_title_id` FOREIGN KEY (`title_id`) REFERENCES `title` (`title_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='问题实体表';

-- ----------------------------
-- Records of question
-- ----------------------------
INSERT INTO `question` VALUES ('1', '1', '1', ' 系数是3，次数是2 ', '系数是3/5,次数是2', ' 系数是3/5，次数是3  ', '系数是－3/5，次数是3', '', '7');
INSERT INTO `question` VALUES ('10', '8', null, 'thing', 'color', 'food', 'year', '', '7');
INSERT INTO `question` VALUES ('11', '8', null, 'yellow', 'blue', 'black', 'red', '', '7');
INSERT INTO `question` VALUES ('12', '8', null, 'clothes', 'jackets', 'skirts', 'shirts', '', '7');
INSERT INTO `question` VALUES ('13', '8', null, 'so', 'and', 'but', 'because', '', '7');
INSERT INTO `question` VALUES ('14', '8', null, 'them', 'their', 'they', 'our', '', '7');
INSERT INTO `question` VALUES ('15', '8', null, 'eat', 'watch', 'play', 'do', '', '7');
INSERT INTO `question` VALUES ('16', '8', null, 'like', 'want', 'don\'t like', 'need', '', '7');
INSERT INTO `question` VALUES ('17', '8', null, 'with', 'at', 'about', 'to', '', '7');
INSERT INTO `question` VALUES ('18', '9', null, 'February 1st', 'February 19th', 'January 26th ', ' January 9th ', '', '7');
INSERT INTO `question` VALUES ('19', '9', null, 'new clothes ', 'computer', 'a soccer ball', 'a telephone', '', '7');
INSERT INTO `question` VALUES ('2', '2', '1', '1个', '2个', '3个', '4个', '', '7');
INSERT INTO `question` VALUES ('20', '9', null, 'parents', 'food ', 'warm clothes ', ' B and C', '', '7');
INSERT INTO `question` VALUES ('21', '10', null, null, null, null, null, '', '7');
INSERT INTO `question` VALUES ('22', '10', null, null, null, null, null, '', '7');
INSERT INTO `question` VALUES ('23', '10', null, null, null, null, null, '', '7');
INSERT INTO `question` VALUES ('3', '3', '1', '#http://m.qpic.cn/psb?/V14AXUDW0NNbuI/Y4Iqk87Rpvq9ZKpuvChBc8.hfx3snZ6kEacXKeK8xf0!/b/dFYBAAAAAAAA&bo=YgAUAAAAAAADB1Q!&rf=viewer_4#', '#http://m.qpic.cn/psb?/V14AXUDW0NNbuI/NLwJXePj.cX0NIST5TMWxWHwljU6MW.tRhJFE39WuGE!/b/dIMAAAAAAAAA&bo=cAAWAAAAAAADB0Q!&rf=viewer_4#', '#http://m.qpic.cn/psb?/V14AXUDW0NNbuI/n.ha9mes87X.Q.86xd2CgTNdz63wX8kW2*UmH9mT4bg!/b/dGcBAAAAAAAA&bo=TgAWAAAAAAADB3o!&rf=viewer_4#', '#http://m.qpic.cn/psb?/V14AXUDW0NNbuI/9OfDIYxv4M8SQ7VQWAOGNTSNag0zymIMa.JpyDFdgmI!/b/dDMBAAAAAAAA&bo=YwAVAAAAAAADB1Q!&rf=viewer_4#', '', '7');
INSERT INTO `question` VALUES ('4', '4', '1', null, null, null, null, '', '7');
INSERT INTO `question` VALUES ('5', '5', '1', null, null, null, null, '', '7');
INSERT INTO `question` VALUES ('6', '6', '1', null, null, null, null, '', '7');
INSERT INTO `question` VALUES ('7', '7', '2', ' from; to', 'at; to', 'from; for', 'in; about', '', '7');
INSERT INTO `question` VALUES ('8', '8', null, 'on', 'for', 'at', 'in', '', '7');
INSERT INTO `question` VALUES ('9', '8', null, '', 'free', 'cool', 'fun', '', '7');

-- ----------------------------
-- Table structure for question_paper
-- ----------------------------
DROP TABLE IF EXISTS `question_paper`;
CREATE TABLE `question_paper` (
  `paper_id` varchar(50) NOT NULL,
  `question_id` varchar(50) NOT NULL,
  `point` int(3) NOT NULL,
  PRIMARY KEY (`paper_id`,`question_id`),
  KEY `question_id_idx` (`question_id`),
  CONSTRAINT `question_paper_paper_id` FOREIGN KEY (`paper_id`) REFERENCES `paper` (`paper_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `question_paper_question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='问题在试卷中的分数的表';

-- ----------------------------
-- Records of question_paper
-- ----------------------------
INSERT INTO `question_paper` VALUES ('1001', '1', '5');
INSERT INTO `question_paper` VALUES ('1001', '2', '5');
INSERT INTO `question_paper` VALUES ('1001', '3', '5');
INSERT INTO `question_paper` VALUES ('1001', '4', '10');
INSERT INTO `question_paper` VALUES ('1001', '5', '10');
INSERT INTO `question_paper` VALUES ('1001', '6', '5');
INSERT INTO `question_paper` VALUES ('1002', '10', '2');
INSERT INTO `question_paper` VALUES ('1002', '11', '2');
INSERT INTO `question_paper` VALUES ('1002', '12', '2');
INSERT INTO `question_paper` VALUES ('1002', '13', '2');
INSERT INTO `question_paper` VALUES ('1002', '14', '2');
INSERT INTO `question_paper` VALUES ('1002', '15', '2');
INSERT INTO `question_paper` VALUES ('1002', '16', '2');
INSERT INTO `question_paper` VALUES ('1002', '17', '2');
INSERT INTO `question_paper` VALUES ('1002', '7', '2');
INSERT INTO `question_paper` VALUES ('1002', '8', '2');
INSERT INTO `question_paper` VALUES ('1002', '9', '2');

-- ----------------------------
-- Table structure for schedule
-- ----------------------------
DROP TABLE IF EXISTS `schedule`;
CREATE TABLE `schedule` (
  `schedule_id` varchar(50) NOT NULL,
  `student_id` varchar(50) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `schedule_content` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `schedule_student_id_idx` (`student_id`),
  CONSTRAINT `schedule_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of schedule
-- ----------------------------

-- ----------------------------
-- Table structure for solution
-- ----------------------------
DROP TABLE IF EXISTS `solution`;
CREATE TABLE `solution` (
  `student_id` varchar(50) NOT NULL,
  `paper_id` varchar(50) NOT NULL,
  `question_id` varchar(50) NOT NULL,
  `content` varchar(500) DEFAULT NULL,
  `point` int(3) DEFAULT NULL,
  `isright` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`student_id`,`paper_id`,`question_id`),
  KEY `solution_paper_id_idx` (`paper_id`),
  KEY `solution_question_id_idx` (`question_id`),
  CONSTRAINT `solution_paper_id` FOREIGN KEY (`paper_id`) REFERENCES `paper` (`paper_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `solution_question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `solution_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学生做题的记录';

-- ----------------------------
-- Records of solution
-- ----------------------------
INSERT INTO `solution` VALUES ('201830613253', '1001', '1', '写的答案1', '95', null);
INSERT INTO `solution` VALUES ('201830613254', '1002', '10', '写的答案2', '89', null);
INSERT INTO `solution` VALUES ('201830613255', '1003', '11', '写的答案3', '93', null);
INSERT INTO `solution` VALUES ('201830613256', '1004', '12', '写的答案4', '86', null);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `student_id` varchar(50) NOT NULL,
  `class_id` varchar(50) DEFAULT NULL,
  `phone` varchar(14) NOT NULL,
  `password` varchar(20) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `pic_path` varchar(50) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `birthday` date DEFAULT NULL,
  `sex` varchar(1) NOT NULL,
  `school_name` varchar(20) DEFAULT NULL,
  `token` varchar(50) DEFAULT NULL,
  `state` varchar(1) NOT NULL,
  `verify_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `class_id_idx` (`class_id`),
  CONSTRAINT `student_class_id` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('201830613253', '10001', '18827075723', '123456', '2015-06-11 20:59:26', 'c:\\student1.jpg', '张同学', '1996-02-01', '男', '华南理工大学', null, '1', null);
INSERT INTO `student` VALUES ('201830613254', '10002', '18827075724', '123456', '2015-07-18 21:18:29', 'c:\\student2.jpg', '即同学', '1996-06-19', '女', '广东外语外贸大学', null, '1', null);
INSERT INTO `student` VALUES ('201830613255', '10003', '18827075725', '123456', '2015-08-18 21:36:50', 'c:\\student3.jpg', '阿同学', '1996-06-18', '女', '中山大学', null, '1', null);
INSERT INTO `student` VALUES ('201830613256', '10004', '18827075726', '123456', '2015-02-18 21:38:34', 'c:\\student4.jpg', '上同学', '1996-12-20', '男', '暨南大学', null, '1', null);

-- ----------------------------
-- Table structure for student_paper
-- ----------------------------
DROP TABLE IF EXISTS `student_paper`;
CREATE TABLE `student_paper` (
  `student_id` varchar(50) NOT NULL,
  `paper_id` varchar(50) NOT NULL,
  `submit` varchar(1) NOT NULL DEFAULT '0',
  `submit_time` datetime DEFAULT NULL,
  `score` int(3) DEFAULT NULL,
  `used_time` int(5) DEFAULT NULL,
  `start_time` datetime(5) DEFAULT NULL,
  `type` varchar(1) NOT NULL,
  `choice_score` int(3) DEFAULT NULL,
  PRIMARY KEY (`student_id`,`paper_id`),
  KEY `student_paper_paper_id_idx` (`paper_id`),
  CONSTRAINT `student_paper_paper_id` FOREIGN KEY (`paper_id`) REFERENCES `paper` (`paper_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `student_paper_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='student和paper关系表';

-- ----------------------------
-- Records of student_paper
-- ----------------------------
INSERT INTO `student_paper` VALUES ('201830613253', '1001', '1', '2018-04-15 21:40:39', '95', null, null, '1', '30');
INSERT INTO `student_paper` VALUES ('201830613254', '1002', '1', '2018-04-15 21:41:14', '86', null, null, '1', '25');
INSERT INTO `student_paper` VALUES ('201830613255', '1003', '1', '2018-04-14 21:41:42', '93', null, null, '1', '30');
INSERT INTO `student_paper` VALUES ('201830613256', '1004', '0', '2018-04-06 21:42:05', '88', null, null, '1', '25');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `teacher_id` varchar(50) NOT NULL,
  `phone` varchar(14) NOT NULL,
  `password` varchar(20) NOT NULL,
  `birthday` date DEFAULT NULL,
  `school_name` varchar(20) DEFAULT NULL,
  `pic_path` varchar(50) NOT NULL,
  `sex` varchar(1) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `token` varchar(50) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `state` varchar(1) NOT NULL,
  `verify_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='老师实体表';

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('201430613253', '18826075723', '123456', '1980-03-27', '华南理工大学', 'c:\\teacher1.jpg', '男', '2015-12-04 16:34:53', '1', '孙老师', '1', '123');
INSERT INTO `teacher` VALUES ('201430613254', '18826075724', '123456', '1980-02-10', '广东工业大学', 'c:\\teacher2.jpg', '女', '2015-07-10 16:37:18', '1', '同老师', '1', '124');
INSERT INTO `teacher` VALUES ('201430613255', '18826075725', '123456', '1980-01-18', '广东外语外贸大学', 'c:\\teacher3.jpg', '女', '2015-06-01 21:31:59', '1', '趣老师', '1', '123');
INSERT INTO `teacher` VALUES ('201430613256', '18826075726', '123456', '1980-08-18', '华南师范大学', 'c:\\teacher4.jpg', '男', '2015-07-18 21:35:14', '1', '邱老师', '1', '123');

-- ----------------------------
-- Table structure for teacher_class
-- ----------------------------
DROP TABLE IF EXISTS `teacher_class`;
CREATE TABLE `teacher_class` (
  `class_id` varchar(50) NOT NULL,
  `teacher_id` varchar(50) NOT NULL,
  PRIMARY KEY (`class_id`,`teacher_id`),
  KEY `teacher_id_idx` (`teacher_id`),
  CONSTRAINT `teacher_class_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `teachere_class_class_id` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='老师和班级的关系表';

-- ----------------------------
-- Records of teacher_class
-- ----------------------------
INSERT INTO `teacher_class` VALUES ('10001', '201430613253');
INSERT INTO `teacher_class` VALUES ('10002', '201430613254');
INSERT INTO `teacher_class` VALUES ('10003', '201430613255');
INSERT INTO `teacher_class` VALUES ('10004', '201430613256');

-- ----------------------------
-- Table structure for title
-- ----------------------------
DROP TABLE IF EXISTS `title`;
CREATE TABLE `title` (
  `title_id` varchar(50) NOT NULL,
  `title_content` varchar(3000) NOT NULL,
  `pic_path` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`title_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='题干表';

-- ----------------------------
-- Records of title
-- ----------------------------
INSERT INTO `title` VALUES ('', '', null);
INSERT INTO `title` VALUES ('1', ' 下列关于单项式#http://a2.qpic.cn/psb?/V14AXUDW0NNbuI/tsmlQ0NQV5EIpKvYIAR*s6yqI4tDn3CdEppZWrjajIo!/b/dDEBAAAAAAAA&ek=1&kp=1&pt=0&bo=LgAtAAAAAAADFzE!&vuin=1448764061&tm=1523667600&sce=60-3-3&rf=viewer_4#的说法正确的是（      ）', null);
INSERT INTO `title` VALUES ('10', 'Dear friends, \r\n     Today(今天) is a great day. It’s my birthday. Can you come to my birthday party?\r\n     I have some nice and fun things for you. I have a big ball collection(收藏), because I like sports very much. And we can eat a big birthday cake(蛋糕) then. \r\n     Let’s meet at 6:00 in the afternoon, in our classroom.\r\n     Please call me at 68314567.   \r\n                                                               Cindy\r\n                                                              Jan. 12th \r\n1. Is Cindy’s birthday on January 12th?\r\n______________________________________________________________________________\r\n2. What can we eat in the party?\r\n______________________________________________________________________________\r\n3. Why does Cindy like balls?\r\n______________________________________________________________________________', null);
INSERT INTO `title` VALUES ('2', '下列事件中，不确定事件的个数为 （     ）①若x是有理数，则#http://m.qpic.cn/psb?/V14AXUDW0NNbuI/TZLcBlJTUlOYaoIhMcDsjKIvmITzTS5PTUkF4LQaNQg!/b/dJUAAAAAAAAA&bo=KQAVAAAAAAADBx4!&rf=viewer_4#，②丹丹每小时可以走20千米③从一副扑克牌中任意抽取一张，这张扑克牌是大王。④从装有9个红球和1个白球的口袋中任意摸出一个球，这个球是红球', null);
INSERT INTO `title` VALUES ('3', ' 小马虎在下面的计算中，只做对了一道题，他做对的题目是（       ）', null);
INSERT INTO `title` VALUES ('4', '1. 如图，在由小正方形组成的L形图形中，请你用三种不同方法分别在下面图形中添画一个小正方形使它成为轴对称图形。#http://m.qpic.cn/psb?/V14AXUDW0NNbuI/YE*NM5nL12QnfM15pPJrDlimMqpU*5Eg8yed..awXjo!/b/dIMAAAAAAAAA&bo=SQFuAAAAAAADBwQ!&rf=viewer_4#', null);
INSERT INTO `title` VALUES ('5', '（11分）如图1，2，四边形ABCD是正方形（AD=AB，∠A=90°，∠ABC=∠CBM=90°）M是AB延长线上的一点。直角三角尺的一条直角边经过点D,且直角顶点E在AB边上滑动（E不与点A,B重合），另一条直角边与∠CBM的平分线BF相交于点F。#http://m.qpic.cn/psb?/V14AXUDW0NNbuI/LV7cKj49vjFnVKQBmiEAvX*P8E5IriwRyR.zZXnf9z0!/b/dGYBAAAAAAAA&bo=VgGfAAAAAAADB.o!&rf=viewer_4#', null);
INSERT INTO `title` VALUES ('6', '如图，直线AB与CD相交于点O,OE⊥AB,OF⊥CD,如果∠EOF=#http://m.qpic.cn/psb?/V14AXUDW0NNbuI/NW0RN7s.ccMwvJxvlEC83PJ2WC3*IvR.wRI9Mm484Uk!/b/dEQBAAAAAAAA&bo=EwAuAAAAAAADBx8!&rf=viewer_4# ∠AOD,则∠EOF=（       ）度。', null);
INSERT INTO `title` VALUES ('7', 'Our science class is ________ Monday________Wednesday.', null);
INSERT INTO `title` VALUES ('8', 'Dear Claire，\r\nYou ask me about my favorite festival. It is Spring (春) Festival. It is  1   January or February. For the festival, we do many things and buy many things, so we are always   2  . The     3  of Spring Festival is   4  . We wear (穿) new red   5   and put up (张贴) red paper-cuts (窗花). And we put (放) lucky money (压岁钱) in red packets (红包). Boys and girls are always happy those days,   6   they can have a good time with   7   family, and they can get lucky money from their parents, grandparents, uncles and aunts. What do we   8   on Spring Festival? Jiaozi and some fruits. In the evening, the family will watch TV together, but children(孩子们)   9   watching TV for  4 hours. It’s really boring for them. They always play  10   their friends. \r\nWhat about you? What festival do you like best?\r\nYour friend,', null);
INSERT INTO `title` VALUES ('9', '  Spring Festival(春节) comes on February 19th this year! Boys and girls like it very much because(因为) they don’t go to school from February 1st to February 28th. And they can have new clothes and much money. They can also eat lots of food. But in Liangshan, Sichuan, some boys and girls are not happy. They don’t have warm(暖和的) clothes or food. They can’t go to school. They need help. Do you want to help them? Call us at 87865866.  1. Spring Festival is on ________.2. Most(大多数的) boys and girls can have________during Spring Festival(春节期间).3. In Sichuan, some boys and girls don’t have ________.', null);

-- ----------------------------
-- Table structure for user_like_answer
-- ----------------------------
DROP TABLE IF EXISTS `user_like_answer`;
CREATE TABLE `user_like_answer` (
  `student_id` varchar(50) NOT NULL,
  `answer_id` varchar(50) NOT NULL,
  PRIMARY KEY (`student_id`,`answer_id`),
  KEY `user_like_answer_answer_id_idx` (`answer_id`),
  CONSTRAINT `user_like_answer_answer_id` FOREIGN KEY (`answer_id`) REFERENCES `answer` (`answer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_like_answer_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_like_answer
-- ----------------------------

-- ----------------------------
-- View structure for d
-- ----------------------------
DROP VIEW IF EXISTS `d`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `d` AS (select `question`.`question_id` AS `question_id`,`question`.`option_a` AS `option_a`,`title`.`title_content` AS `title_content` from (`title` join `question` on((`title`.`title_id` = `question`.`title_id`))) where (`question`.`title_id` = `title`.`title_id`)) ;
