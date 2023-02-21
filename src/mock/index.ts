
import Mock from 'mockjs'
import { login, logout } from './users'

Mock.setup({
  timeout: '1000'
})

Mock.mock('/api/users/login', 'post', login)
Mock.mock('/api/users/logout', 'post', logout)
