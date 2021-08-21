const db = require("./db");
const { Users } = require("./models");
const Conversations = require("./models/conversations");
const Messages = require("./models/messages");
const UserToConversation = require("./models/userToConversation");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const thomas = await Users.create({
    username: "thomas",
    email: "thomas@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png",
  });

  const santiago = await Users.create({
    username: "santiago",
    email: "santiago@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/775db5e79c5294846949f1f55059b53317f51e30_s3back.png",
  });

  
  const santaigoAndThomasConvo = await Conversations.create({
    name: santiago.username +" and "+ thomas.username+ " chat",//we can generate some name here
  });

await UserToConversation.create({
    conversationId: santaigoAndThomasConvo.id,
    userId: santiago.id
  });

await UserToConversation.create({
    conversationId: santaigoAndThomasConvo.id,
    userId: thomas.id
  });

  await Messages.create({
    conversationId: santaigoAndThomasConvo.id,
    senderId: santiago.id,
    text: "Where are you from?",
  });

  await Message.create({
    conversationId: santaigoAndThomasConvo.id,
    senderId: thomas.id,
    text: "I'm from New York",
  });
  
  await Message.create({
    conversationId: santaigoAndThomasConvo.id,
    senderId: santiago.id,
    text: "Share photo of your city, please",
  });

  const chiumbo = await Users.create({
    username: "chiumbo",
    email: "chiumbo@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914468/messenger/8bc2e13b8ab74765fd57f0880f318eed1c3fb001_fownwt.png",
  });

  const chiumboAndThomasConvo = await Conversations.create({
    name: chiumbo.username +" and "+ thomas.username+ " chat",
  });

  await UserToConversation.create({
    conversationId: chiumboAndThomasConvo.id,
    userId: chiumbo.id
  });

  await UserToConversation.create({
    conversationId: chiumboAndThomasConvo.id,
    userId: thomas.id
  });

  await Messages.create({
    conversationId: chiumboAndThomasConvo.id,
    senderId: chiumbo.id,
    text: "Sure! What time?",
  });

  const hualing = await Users.create({
    username: "hualing",
    email: "hualing@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/6c4faa7d65bc24221c3d369a8889928158daede4_vk5tyg.png",
  });

  const hualingAndThomasConvo = await Conversations.create({
    name: hualing.username +" and "+ thomas.username+ " chat",
  });

  await UserToConversation.create({
    conversationId: hualingAndThomasConvo.id,
    userId: chiumbo.id
  });

  await UserToConversation.create({
    conversationId: hualingAndThomasConvo.id,
    userId: thomas.id
  });
  for (let i = 0; i < 11; i++) {
    await Messages.create({
      conversationId: hualingAndThomasConvo.id,
      senderId: hualing.id,
      text: "a test message",
    });
  }

  await Messages.create({
    conversationId: hualingAndThomasConvo.id,
    senderId: hualing.id,
    text: "😂 😂 😂",
  });

  const otherUsers = await Promise.all([
    ,
    Users.create({
      username: "ashanti",
      email: "ashanti@email.com",
      password: "123456",
      photoUrl:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/68f55f7799df6c8078a874cfe0a61a5e6e9e1687_e3kxp2.png",
    }),
    Users.create({
      username: "julia",

      email: "julia@email.com",
      password: "123456",
      photoUrl:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914468/messenger/d9fc84a0d1d545d77e78aaad39c20c11d3355074_ed5gvz.png",
    }),
    Users.create({
      username: "cheng",
      email: "cheng@email.com",
      password: "123456",
      photoUrl:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/9e2972c07afac45a8b03f5be3d0a796abe2e566e_ttq23y.png",
    }),
  ]);

  console.log(`seeded users and messages`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
