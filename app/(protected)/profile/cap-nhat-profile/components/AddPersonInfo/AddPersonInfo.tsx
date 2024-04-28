import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  Spin,
  TreeSelect,
} from 'antd';
import { commonServices } from '@/app/services/common.services';
import { FormProps } from 'react-hook-form';
import { NotificationContext } from '@/app/providers/NotificationProvider';
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';

const { RangePicker } = DatePicker;


type IAddPersonInfo = {
  setProcess: any;
  userType: string;
};
  

const formItemLayout = {
    
  };
const AddPersonInfo = ({ setProcess,userType }: IAddPersonInfo) => {
  const [provinces, setProvinces] = useState([]);
  const [dictricts, setDistricts] = useState([]);
  const [warks, setWarks] = useState([]);

  const [provincesc, setProvincesc] = useState(0);
  const [districtsc, setDistrictsc] = useState(0);
  const [warksc, setWarksc] = useState(0);

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({t:'',p:'',q:'',s:''});
  let { openNotificationWithIcon } = useContext(NotificationContext);


    const getProvinces = async () => {
        const data = await commonServices.getProvinces();
        console.log(data);
        setProvinces(data.results.map((i: any) => { return { label:i.province_name,value:i.province_id } }));
        
  }
  const getDistrict = async () => {
    const data = await commonServices.getDistricts(provincesc);
    console.log(data);
    setDistricts(data.results.map((i: any) => { return { label:i.district_name,value:i.district_id } }));
    
  }
  const getWarks= async () => {
    const data = await commonServices.getWarks(districtsc);
    console.log(data);
    setWarks(data.results.map((i: any) => { return { label:i.ward_name,value:i.ward_id } }));
    
  }
    useEffect(() => {
        
        getProvinces();
        
    }, [])
  useEffect(() => {
      console.log("get Distric",provincesc);
      
    if (provincesc > 0) {
      setDistricts([]);
      setDistrictsc(0)
      getDistrict();
    }
      
    }, [provincesc])
    useEffect(() => {
      if (districtsc > 0) {
        setWarks([]);
        setWarksc(0);
        getWarks();
      } 
     
     
    }, [districtsc])
  
  const onFinish: any = async (values: any) => {
    setLoading(true);
      const dataSubmit = { phone_num: values.phone_num, address: `${address.s}, ${address.p}, ${address.q}, ${address.t}` };
      console.log('nộp', dataSubmit, userType);
    const res = await commonServices.UpdateInfo(userType, dataSubmit);
    setLoading(false);
    
    
    if (res && res.result == 0) {
      openNotificationWithIcon('success',"Cập nhật thành công", 'Bạn đã cập nhật thành công, vui lòng hoàn thành bước tiếp theo.');
      setProcess(1);
    }
    else {
      openNotificationWithIcon('error',"Cập nhật thất bại", 'Có lỗi khi cập nhật vui lòng thử lại.');
        
    }
      

      
    };
  return <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Spin spinning={loading} tip="Đang cập nhật...">
    <Card className=' mb-8' style={{marginTop:'20px'}}>
        <CardHeader><div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      fontSize: '23px',
      fontWeight: 700
    }}><h1>Điền Thông Tin Cá Nhân</h1></div></CardHeader>
      <CardContent> <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      fontSize: '23px',
      marginTop:20,
      fontWeight: 700
    }}> <Form {...formItemLayout} variant="filled" style={{ width: 700 }}  onFinish={onFinish}>
    <Form.Item label="Số Điện Thoại" name="phone_num" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn.' }]}>
      <Input />
    </Form.Item>

    <Form.Item
      label="Địa chỉ"
      name="adress1"
     rules={[{ required: true, message: 'Vui lòng nhập đầy đủ địa chỉ!' }]}
    >
      <Select
              //mode="tags"
              value={provincesc?provincesc:undefined}
              style={{ width: '31%' }}
              showSearch
              filterOption={(input, option:any) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
    placeholder="Tỉnh thành"
              onChange={(data,item:any) => {
                
                setProvincesc(data);
                const tmp = address;
                tmp.t = item['label'];
                setAddress(tmp)

    }}
    options={provinces}
            />
            <Select
              value={districtsc?districtsc:undefined}
              showSearch
              filterOption={(input, option:any) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
    disabled={dictricts.length>0?false:true}
    style={{ width: '31%',marginLeft:10 }}
    placeholder="Quận,Huyện,Thành Phố"
    onChange={(data,item:any) => {
                
      setDistrictsc(data);
      const tmp = address;
      tmp.q = item['label'];
      setAddress(tmp)

}}
    options={dictricts}
            />
            <Select
              value={warksc?warksc:undefined}
              showSearch
              filterOption={(input, option:any) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
    disabled={warks.length>0?false:true}
    style={{ width: '31%',marginLeft:10 }}
    placeholder="Phường, xã"
    onChange={(data,item:any) => {
                
      setWarksc(data);
      const tmp = address;
      tmp.p= item['label'];
      setAddress(tmp)

}}
    options={warks}
  />
    </Form.Item>

    <Form.Item
      label="Địa chỉ cụ thể"
      name="adress1"
      rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể!' }]}
    >
            <Input.TextArea disabled={address.p == '' ? true : false} onChange={(e) => {
              const tmp = address;
              tmp.s = e.target.value;
              setAddress(tmp)
      }} />
    </Form.Item>


    <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
    <Button
                    
                    className='rounded-[16rem] bg-primary-color hover:bg-primary-color/80 text-white'
              htmlType='submit' >
                    Cập Nhật
                </Button>
    </Form.Item>
          </Form></div></CardContent>
        </Card>
    </Spin>
    </div>
}
export default AddPersonInfo;