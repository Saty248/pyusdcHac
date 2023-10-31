module.exports = {
  apps : [{
    name   : "sky.trade.frontend",
    script: 'node_modules/next/dist/bin/next',
    autorestart: true,
    watch: false,
    env_dev: {
      NODE_ENV: "dev"
    },
    env_prod: {
      NODE_ENV: "prod"
    }
  }],
  deploy: {
    prod: {
      key: "./deploy.key",
      ssh_options: "StrictHostKeyChecking=no",
      user: "ec2-user",
      host: [
        {
          host: "3.20.183.221",
          port: "4578",
        },
      ],
      ref: "dev",
      repo: "git@github.com:SkyTradeLinks/address-claiming.git",
      path: "/home/ec2-user/pm2-deploy/address-claiming",
      "post-deploy":
      "bash aws_ps_get_prod_env.sh && yarn && yarn build && pm2 startOrReload ecosystem.config.js --env prod",
      "pre-setup": "ssh-keyscan github.com >> ~/.ssh/known_hosts",
    },
  },
}
