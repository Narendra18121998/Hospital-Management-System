import express from 'express'
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus } from '../controllers/appointmentController.js';
import {isAdminAuthenticated, isPatientAuthenticated} from '../middlewares/auth.js'

const router = express.Router();
router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });


router.post('/post',isPatientAuthenticated,postAppointment)
router.get('/get/appointments',isAdminAuthenticated,getAllAppointments)
router.put('/update/:id',isAdminAuthenticated,updateAppointmentStatus)
router.delete('/delete/:id' ,isAdminAuthenticated,deleteAppointment)

export default router;
