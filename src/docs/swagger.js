const swaggerJsdoc = require("swagger-jsdoc");
const { faker } = require("@faker-js/faker");

const user = {
  name: {
    type: "string",
    description: "User's name",
    example: faker.person.fullName(),
  },
  email: {
    type: "string",
    description: "User's email",
    example: faker.internet.email(),
  },
};

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Task Management",
    description: "This api documentation for Task Management project",
    version: "1.0.0",
    contact: {
      name: "Dadne Fernanda Cruz Huerta",
      email: "dadnehuerta@gmail.com",
    },
  },
  servers: [
    {
      url:
        process.env.ENV === "prod"
          ? `${process.env.APP_URL}`
          : `http://localhost:${process.env.APP_PORT}/api`,
      description: "Task Management",
    },
  ],
  components: {
    schemas: {
      newUser: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            description: "User's name",
            example: faker.person.fullName(),
          },
          email: {
            type: "string",
            description: "User's email",
            example: faker.internet.email(),
          },
          password: {
            type: "string",
            description: "User's password",
            example: faker.internet.password(),
          },
        },
      },
      login: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            description: "User's email",
            example: faker.internet.email(),
          },
          password: {
            type: "string",
            description: "User password",
            example: faker.internet.password(),
          },
        },
      },
      users: {
        type: "array",
        properties: [user],
      },
      task: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "title task",
            example: faker.lorem.text,
          },
          description: {
            type: "string",
            description: "description task",
            example: faker.lorem.text,
          },
          expirationDate: {
            type: "date",
            description: "expiration date task",
            example: faker.date.future(),
          },
          assignedTo: {
            type: "date",
            description: "assigned to user",
            example: faker.string.uuid()
          },
        },
      },
      assignTask: {
          type: "object",
          properties: {
            assignedTo: {
              type: "string",
              description: "User ID to assign the task",
              example: faker.string.uuid(),
            },
          },
        },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/**/*.js"],
  // apis: [
  //   "./src/routes/auth.js",
  // ],
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification;
