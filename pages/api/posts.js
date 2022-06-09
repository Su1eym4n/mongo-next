import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_posts");

  switch (req.method) {
    case "POST":
      try {
        // connect to the database
        //let { db } = await connectToDatabase();
        // add the post
        await db.collection('posts').insertOne(JSON.parse(req.body));
        // return a message
        res.json({
            message: 'Post added successfully',
            success: true,
        });
        break
    } catch (error) {
        // return an error
        res.json({
            message: new Error(error).message,
            success: false,
        });
        break
    }

    // let bodyObject = JSON.parse(req.body);
    // let newPost = await db.collection("posts").insertOne(bodyObject);
    // res.json(newPost.ops[0]);
    // break;

    case "GET":
      const posts = await db.collection("posts").find({}).toArray();
      res.json({ status: 200, data: posts });
      break;
  }
}