import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
// import { createThumbnail } from "react-native-create-thumbnail";

interface SearchDetailProps {
    data:any;
  }

const SearchDetail: React.FC<SearchDetailProps>= ({data}) => {
    const [viewData, setViewData] = useState<any>([]);
    const [videoData, setVideoData] = useState<any>([])
    useEffect(() => {
        let imagePreview = [];
        let videoPreview = []
        if(data != undefined){
            if(data.child.data != undefined){
                for(let i=0; i < data.child.data.length; i++){
                    if(data.child.data[i].media_type == 'IMAGE'){
                        imagePreview.push(<Image width={200} src={data.child.data[i].media_url}></Image>);
                    }else{
                      // const thumbnail = createThumbnail({
                      //   url: data.child.data[i].media_url,
                      //   timeStamp: 1000,
                      // })
                      //   .then(response => console.log({ response }))
                      //   .catch(err => console.log({ err }));
                        videoPreview.push(<Image
                            width={200}
                            preview={{
                              destroyOnClose: true,
                              imageRender: () => (
                                <video
                                  muted
                                  height="100%"
                                  controls
                                  src={data.child.data[i].media_url}
                                />
                              ),
                              toolbarRender: () => null,
                            }}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                          />);
                    }          
                }
            } else {
                imagePreview.push(<Image width={200} src={data.media}></Image>)
            }
        } 
        console.log(imagePreview);
        setViewData(imagePreview);
        if(videoPreview.length !=0){
          setVideoData(videoPreview);
        }
        console.log(data);
  }, [data])
return(
  <div>
  <Image.PreviewGroup
    preview={{
      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
    }}
  >
    {viewData}
  </Image.PreviewGroup>
  {videoData}
  </div>
);
}
export default SearchDetail;