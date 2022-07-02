import { Router } from 'express';
import fileService from '../service/fileService';

const router = Router();
router.post('/mensajes', fileService.add);
export default router;

