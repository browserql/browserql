export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addExample: Scalars['Boolean'];
  addModule: Scalars['Boolean'];
  buildEmbedded: Scalars['String'];
  buildExample: Scalars['String'];
  buildExamplesList: Scalars['String'];
};


export type MutationAddExampleArgs = {
  module: Scalars['String'];
  example: Scalars['String'];
};


export type MutationAddModuleArgs = {
  module: Scalars['String'];
};


export type MutationBuildEmbeddedArgs = {
  module: Scalars['String'];
  example: Scalars['String'];
};


export type MutationBuildExampleArgs = {
  example: Scalars['String'];
  module: Scalars['String'];
};

export type Package = {
  __typename?: 'Package';
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getPackage?: Maybe<Package>;
  getPackages: Array<Package>;
  viewExample: Scalars['String'];
};


export type QueryGetPackageArgs = {
  input: GetPackageInput;
};


export type QueryViewExampleArgs = {
  module: Scalars['String'];
  example: Scalars['String'];
};

export type GetPackageInput = {
  name?: Maybe<Scalars['String']>;
};
