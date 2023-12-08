import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';

export const addAdmin = async (req, res, next) => {
const { email, password } = req.body;
if (
    (!email && email.trim() === "") &&
    (!password && password.trim() === "")
) {
    return res.status(422).json({ message: "Invalid inputs" });
}

let existingAdmin;

try {
    existingAdmin = await Admin.findOne({ email });
}
catch (err) {
    return console.log(err);
}

if (existingAdmin) {
    return res.status(401).json({ message: "Admin Already exists" });
}

let admin;
const hashPassword = bcrypt.hashSync(password);

try {
    admin = new Admin({ email, password: hashPassword });
    admin = await admin.save();
}
catch (err) {
    return console.log(err);
}
if (!admin) {
    return res.status(500).json({ message: "Could not create admin" });
}
   return res.status(201).json({ admin });
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (
        (!email && email.trim() === "") &&
        (!password && password.trim() === "")
    ) {
        return res.status(422).json({ message: "Invalid inputs" });
    }
    
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    }
    catch (err) {
        return console.log(err);
    }
    
    if (!existingAdmin) {
        return res.status(401).json({ message: "Admin not found" });
    }
    
    const isValidPassword = bcrypt.compareSync(password, existingAdmin.password);
    
    if (!isValidPassword) {
        return res.status(401).json({ message: "Incorrect Password" });
    }
    
    return res.status(200).json({ message: "Login Successful" });
};
