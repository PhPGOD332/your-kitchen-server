module.exports = {
  apps: [
    {
      name: 'your-kitchen-server',
      script: 'api/index.js',
      args: '-p 4001',
      exec_mode: 'cluster',
      instances: 'max'
    }
  ]
}