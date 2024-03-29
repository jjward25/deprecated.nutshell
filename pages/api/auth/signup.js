import User from '../../../models/user';
import dbConnect from '../../../util/dbConnect';
import handler from '../../../util/handler';


handler
  .post(createUser)

async function createUser(req, res) {

  const data = req.body;

  const { email, password } = data;

  dbConnect();

  const user = await User.create(req.body)

  res.status(201).json({ message: 'Created user!' });

}

export default handler;