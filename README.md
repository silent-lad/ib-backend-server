# IB Backend Server

## Specs

- Nodes.js
- Express
- Mysql

## Database Schema-

### **Tables** -

- USER

  - This table consists of all the users who can create the interviews(i.e table for interviewer's information)

    ![user table](./user_table.png)

- CANDIDATE

  - This table consist of details of candidates

    ![candidate table](./candidate_table.png)

- INTERVIEW

  - This table consists of information about interviews scheduled by the USER. Foreign key - user_id

    ![interview table](./interview_table.png)

- SCHEDULE

  - This table consists the interview - candidate relationship as many candidates can sit in same interview. Foreign key - candidate_id, interview_id

    ![schedule table](./schedule_table.png)
