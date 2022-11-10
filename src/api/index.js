import { instance } from '../request';
//  暴露访问图表分类接口
export const getChartsData = () => {
  return instance.get(`/api/v1/artclecategory`)
}

//  暴露访问文章列表接口
export const getArticleList = ({ limited, offset }) => {
  return instance.get(`/api/v1/articlelist?limited=${limited}&offset=${offset}`)
}

//  暴漏删除文章接口

export const deleteArticleById = (id) => {
  return instance.delete(`/api/v1/deletearticle/${id}`)

}