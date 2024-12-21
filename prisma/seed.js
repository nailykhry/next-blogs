const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password123',
    },
  });

  const categories = [
    {
      name: 'Technology',
      description:
        'Articles about the latest advancements in technology and programming.',
    },
    {
      name: 'Health',
      description: 'Topics focusing on wellness, nutrition, and mental health.',
    },
    {
      name: 'Finance',
      description:
        'Insights and advice on managing personal and corporate finances.',
    },
    {
      name: 'Education',
      description: 'Resources and trends in learning and teaching.',
    },
    {
      name: 'Travel',
      description:
        'Guides and tips for exploring the world and unique destinations.',
    },
    {
      name: 'Lifestyle',
      description:
        'Ideas for improving daily habits and living a balanced life.',
    },
    {
      name: 'Food',
      description: 'Delicious recipes, food trends, and cooking techniques.',
    },
    {
      name: 'Fitness',
      description: 'Workout routines and tips for maintaining a healthy body.',
    },
    {
      name: 'Entertainment',
      description: 'Reviews and news on movies, TV shows, and music.',
    },
    {
      name: 'Business',
      description:
        'Strategies for startups, entrepreneurship, and market insights.',
    },
    {
      name: 'Gaming',
      description:
        'Latest news, reviews, and trends in video games and esports.',
    },
    {
      name: 'Science',
      description:
        'Fascinating discoveries and discussions on various scientific topics.',
    },
    {
      name: 'Environment',
      description:
        'Efforts and ideas for sustainability and tackling climate change.',
    },
    {
      name: 'Art',
      description:
        'Exploration of modern and classical art movements and techniques.',
    },
    {
      name: 'History',
      description: 'Deep dives into historical events and their significance.',
    },
    {
      name: 'Politics',
      description: 'Analysis of current events and political landscapes.',
    },
    {
      name: 'Parenting',
      description: 'Advice and stories for raising children in today’s world.',
    },
    {
      name: 'Pets',
      description: 'Guides and tips for taking care of pets and their needs.',
    },
    {
      name: 'Photography',
      description: 'Techniques and inspiration for capturing stunning photos.',
    },
    {
      name: 'Fashion',
      description: 'Latest trends, style guides, and fashion tips.',
    },
  ];

  // Create posts in database
  const categoryRecords = [];
  for (let category of categories) {
    const createdCategory = await prisma.category.create({
      data: category,
    });
    categoryRecords.push(createdCategory);
  }

  // Seeding posts
  const posts = [
    {
      title: 'How to Learn JavaScript',
      slug: 'how-to-learn-javascript',
      content:
        'JavaScript is a versatile language for both front-end and back-end development...',
      userId: user1.id,
      views: 0,
    },
    {
      title: 'Mastering React',
      slug: 'mastering-react',
      content:
        'React is a powerful library for building dynamic user interfaces...',
      userId: user1.id,
      views: 0,
    },
    {
      title: 'Understanding Node.js',
      slug: 'understanding-nodejs',
      content:
        'Node.js allows for building scalable network applications with JavaScript...',
      userId: user1.id,
      views: 0,
    },
    {
      title: 'CSS Grid and Flexbox',
      slug: 'css-grid-and-flexbox',
      content:
        'Learn the basics of modern layout systems with CSS Grid and Flexbox...',
      userId: user2.id,
      views: 0,
    },
    {
      title: '10 Best Python Libraries for Data Science',
      slug: 'best-python-libraries-for-data-science',
      content:
        'Explore the top Python libraries that will help you in data science projects...',
      userId: user2.id,
      views: 0,
    },
  ];

  for (let post of posts) {
    const createdPost = await prisma.post.create({
      data: post,
    });

    // Randomly assign categories to posts
    const randomCategories = categoryRecords
      .sort(() => 0.5 - Math.random())
      .slice(0, 2); // Assign 2 random categories
    for (let category of randomCategories) {
      await prisma.post.update({
        where: { id: createdPost.id },
        data: {
          categories: {
            connect: { id: category.id },
          },
        },
      });
    }
  }

  console.log(`${posts.length} posts created and associated with categories!`);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
