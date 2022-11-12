import { instance } from '../request';
//  暴露访问图表分类接口
export const getChartsData = () => {
  return instance.get(`/api/v1/artclecategory`)
}

//  暴露访问文章列表接口
export const getArticleList = ({ limited, offset }) => {
  return instance.get(`/api/v1/articlelist?limited=${limited}&offset=${offset}`)
}

//  暴露删除文章接口
export const deleteArticleById = (id) => {
  return instance.delete(`/api/v1/deletearticle/${id}`)

}
//  暴露文章编辑接口
export const getArticlInfoById = id => {
  return instance.get(`/api/v1/article/${id}`)
}

//  暴露保存文章接口
export const saveArticle = (id, data) => {
  return instance.post(`/api/v1/articlesave/${id}`, data)
}

//  暴露通知中心接口
export const getNotifications = () => {
  return instance.get(`/api/v1/notifications`)
}