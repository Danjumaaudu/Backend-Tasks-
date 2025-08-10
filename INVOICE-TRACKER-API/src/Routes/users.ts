import { Router } from "express";
import {getAllUsers,getUserById ,createUser,updateUser,deleteUser} from "../Controllers/Userscontrollers";

const route = Router();

route.get('/',getAllUsers);
route.get('/:id', getUserById);
route.post('/', createUser);
route.delete('/:id',deleteUser);

export default route;