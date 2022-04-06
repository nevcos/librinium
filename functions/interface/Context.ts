export interface Context
  extends EventContext<
    {
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
    },
    string,
    any
  > {}
