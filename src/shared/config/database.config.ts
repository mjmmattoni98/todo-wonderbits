export interface DatabaseConfig {
    url: string;
}

export default () => ({
    database: {
      url: process.env.DATABASE_URL
    }
});