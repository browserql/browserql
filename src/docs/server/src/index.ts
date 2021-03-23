import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { readFile, readdir } from 'fs/promises';
import { print, parse, buildSchema } from 'graphql';
import { join } from 'path';
import './generated'

const PORT = 42347;

async function run() {
  const contents = await readFile(
    join(
      process.cwd(),
      '../graphql/src/generated/schema.graphql',
    ),
  );
  const source = contents.toString();
  const graphqlSchema = buildSchema(source);
  console.log(source)
  const queries = await readdir(join(process.cwd(), '../resolvers/queries'))
  const mutations = await readdir(join(process.cwd(), '../resolvers/mutations'))
  const queriesResolvers = await Promise.all(queries.map(async query => {
    return require(join(process.cwd(), '../resolvers/queries', query))
  }))
  const mutationsResolvers = await Promise.all(mutations.map(async query => {
    return require(join(process.cwd(), '../resolvers/mutations', query))
  }))
  const resolvers = [...queriesResolvers, ...mutationsResolvers].reduce((acc, item) => ({ ...acc, ...item }), {})
  console.log(resolvers)

  // The root provides a resolver function for each API endpoint
  const root = {
    ...resolvers
  };

  const app = express();
  app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: root,
    graphiql: true,
  }));
  app.listen(PORT);
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
}

run();
