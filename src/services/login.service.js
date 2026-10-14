export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user)
    return res.status(400).json({ message: "User not found" });

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison)
    return res.status(400).json({ message: "Invalid password" });

  const secretKey = 'programacion3-2026';

  const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

  res.json({ token });
};
