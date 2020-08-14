
import Taro from '@tarojs/taro'

function requestData(reqData,callBack){
    const basePath = 'http://192.168.57.68:8089/';
    const dataParams = new Object();
        
    dataParams.params = new Object();

    dataParams.params.url = basePath + 'CompanyWebServlet';
    dataParams.params.operServiceId = reqData.operServiceId;
    dataParams.params.operId = reqData.operId;
    dataParams.params.data = reqData.data;
    dataParams.params.endRow = 30;
    dataParams.params.startRow = 0;
    dataParams.params.totalRow = 30;
    dataParams.params.ds = 'person';
    dataParams.params.operType = 'fetch';
    dataParams.params.clientType = 'web';

    Taro.request({
        url:dataParams.params.url,
        data:dataParams
    }).then(
        response => {
            console.log(response);

            if(response.data.status != 0){
                alert('请求信息有误! '+response.data.error);
                response.error = true;
            }    

            callBack(response);
        },
        response => {
            callBack(response);
        }
    );        
}


export default requestData