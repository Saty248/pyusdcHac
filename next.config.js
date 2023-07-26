const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

const nextConfig = (phase) => {
  if(phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        USER: "root",
        DATABASE: "skye-addresses",
        PASSWORD: "@August11",
        HOST: "localhost",
        PORT: 3306,
        API_KEY: "pk.715caf1e4ee375ad5db1db5f9ff277df"
      }
    }
  } 

  return {
    env: {
      USER: "sky_claim_dev",
      DATABASE: "sky_claim_dev",
      PASSWORD: "Pw2dv8i8g4hmkOj",
      HOST: "mysql-17204-0.cloudclusters.net",
      PORT: 17204,
      API_KEY: "pk.715caf1e4ee375ad5db1db5f9ff277df"
    }
  }
}

module.exports = nextConfig;
