import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Admin from '../views/admin'




export default function IndexRouter () {
  return useRoutes([
    {
      path: '/',
      element: <Admin></Admin>,
      children: [
        {
          path: '',
          element: <Navigate to='/admin/dashboard'></Navigate>
        },
        {
          path: '/admin/dashboard',
          element: lazyload('dashboard')
        },
        {
          path: '/admin/article',
          element: lazyload('article')
        },
        {
          path: '/admin/article/edit/:id',
          element: lazyload('article/edit')
        },
        {
          path: '/admin/settings',
          element: lazyload('settings')
        }
      ]
    },
    // {
    //   path: '/login',
    //   element: lazyload('login')
    // },
    // {
    //   path: '/notfound',
    //   element: lazyload('notfound')
    // },
    // {
    //   path: '*',
    //   element: <Navigate to='/notfound'></Navigate>
    // }
  ])
}


//  路由懒加载的方式渲染组件
function lazyload (path) {
  const Comp = React.lazy(() => import('../views/' + path))
  return (
    <React.Suspense fallback={<>loading...</>}>
      <Comp></Comp>
    </React.Suspense>
  )
}