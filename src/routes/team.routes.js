// routes/team.js
import { Router } from 'express';
import * as teamMemberController from '../controllers/team.controller.js';

const router = Router();

router.get('/team', teamMemberController.getAllTeamMembers);
router.post('/team', teamMemberController.createTeamMember);
router.put('/team/:id', teamMemberController.updateTeamMember);
router.delete('/team/:id', teamMemberController.deleteTeamMember);

export default router;
