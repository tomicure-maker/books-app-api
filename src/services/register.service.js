export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findeOne({ where: { email } });

  if (user) 
    return res.status(400).json({ message: "User already exists" });

  
const saltRounds = 10;

const salt = await bcrypt.genSalt(saltRounds);

const hashedPassword = await bcrypt.hash(password, salt);

const newUser = await User.create({ name, email, password: hashedPassword });

res.json(newUser.id);

};

