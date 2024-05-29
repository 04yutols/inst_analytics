import { Table, TableColumnsType, TableProps, theme } from "antd";
import { Content } from "antd/es/layout/layout";

interface SearchTableProps {
    posted:any;
    onSelectRow: (value:any) => void;
    loading:boolean;
  }

export const SearchTable: React.FC<SearchTableProps> =({posted, onSelectRow, loading}) =>{
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    interface DataType {
        key: React.Key;
        id: string;
        likeCount: number;
        commentsCount: number;
        mediaType: string;
        timestamp: string;
        media: string;
        child:[]
      }

      const fixDataType = (value:any) =>{
        let data: Array<DataType> = []
        let dataChild: DataType = {key:'',id:'',likeCount:0,commentsCount:0,mediaType:'',timestamp:'',media:'',child:[]}
        if(value != undefined){
        for(let i = 0; i < value.length; i++){
            dataChild.key = value[i].id;
            dataChild.id = value[i].id;
            dataChild.mediaType = value[i].media_type;
            dataChild.likeCount = value[i].like_count;
            dataChild.commentsCount = value[i].comments_count;
            dataChild.timestamp = value[i].timestamp;
            if(dataChild.mediaType == 'CAROUSEL_ALBUM'){
              dataChild.child = value[i].children
            }
            dataChild.media = value[i].media_url
            data.push(dataChild);
            dataChild = {key:'',id:'',likeCount:0,commentsCount:0,mediaType:'',timestamp:'',media:'',child:[]};
        }
    }
        return data
    }

    const columnData:Array<DataType> = fixDataType(posted)
      
      const columns: TableColumnsType<DataType> = [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: 'コンテンツの種類',
          dataIndex: 'mediaType',
        },
        {
          title: 'いいね数',
          dataIndex: 'likeCount',
        },
        {
          title: 'コメント数',
          dataIndex: 'commentsCount',
        },
        {
          title: '投稿時間',
          dataIndex: 'timestamp',
        },
      ];
      
      
      const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
      return(
        <Content
            style={{
              padding: 24,
              marginTop: 10,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
        <Table columns={columns} dataSource={columnData} onChange={onChange} loading={loading} onRow={(record) =>{
            return{onClick: (event) =>{
                onSelectRow(record);
                console.log(record);
            }}
        }} />
        </Content>
      );
}