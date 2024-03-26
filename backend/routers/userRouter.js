import express from 'express'
const router = express.Router();
import { patientRegister ,login, addNewAdmin, getAllDoctors, getUserDetails,logoutAdmin,logoutPatient, addNewDoctor} from '../controllers/userController.js';
import { isAdminAuthenticated,isPatientAuthenticated } from '../middlewares/auth.js';


router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });
     
router.post('/patient/register' , patientRegister)
router.post('/login',login)
router.post('/admin/addnew' ,isAdminAuthenticated, addNewAdmin)
router.get('/doctors' ,getAllDoctors)

router.get('/admin/details',isAdminAuthenticated,getUserDetails)
router.get('/patient/details',isPatientAuthenticated,getUserDetails)

router.get('/admin/logout',isAdminAuthenticated,logoutAdmin)
router.get('/patient/logout',isPatientAuthenticated,logoutPatient)
router.post('/doctor/addnew',isAdminAuthenticated,addNewDoctor)

export default router;

