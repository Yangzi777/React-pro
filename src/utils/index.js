import {useEffect, useRef, useState} from 'react'
export function useCallbackState(state){
  const [data,setData] = useState(state) // data={limited:10,offset:0}
  const cbRef = useRef()
  useEffect(()=>{
    cbRef.current && cbRef.current(data) // data={limited:10,offet:10}
  },[data])
  return [data,function(val,callback){
    cbRef.current = callback  // cbref.current = function(data){console.log('data---->',data)}
    setData(val)
  }]
}


// const [pageData,setPageData] = useCallbackState({limited:10,offset:0})
// setPageData({limited:10,offset:10},function(data){
//  console.log('data---->',data)
//})