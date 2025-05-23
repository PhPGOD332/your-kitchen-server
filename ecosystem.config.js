module.exports = {
  apps: [
    {
      name: 'your-kitchen-server',
      script: 'dist/api/index.js',
      args: '-p 3001',
      exec_mode: 'cluster',
      instances: 2,
      max_memory_restart: "800M",
      autorestart: true,
      error_file: "/var/log/pm2/server-log.log"
    }
  ]
}