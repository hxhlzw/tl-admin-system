import Mock from 'mockjs'

import user from './userData'

const Random = Mock.Random

Mock.mock('/api/login/username', (options) => {
  console.log('options', options)

  if (!options || !options.body) {
    return {
      code: 101,
      message: '没参数'
    }
  }

  const params = JSON.parse(options.body)

  if (!params || !params.username || !params.password || !params.imgcode) {
    return {
      code: 101,
      message: '参数为空'
    }
  }

  if (params.username === 'admin' && params.password === '123456') {
    return {
      code: 888,
      message: '',
      data: user.userInfo,
      token: Random.string(64)
    }
  }

  return {
    code: 102,
    message: '用户或密码错误'
  }
})
