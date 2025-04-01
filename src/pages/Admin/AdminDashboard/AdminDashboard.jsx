import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from '../../../components/Admin/AdminSidebar/AdminSidebar';
import Header from '../../../components/Admin/AdminHeader/AdminHeader';
import DashboardStats from '../../../components/Admin/AdminDashboardStats/AdminDashboardStats';
import ClassCard from '../../../components/Admin/AdminClassCard/AdminClassCard';
import { Wrapper, Content, Main } from './style';
import mockClassData from '../../../lib/mockdataClass';


const AdminDashboard = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('vi-VN');

  return (
    <Wrapper>
      <Sidebar />
      <Content>
        <Header />
        <Main>
          <DashboardStats />
          <h2>Hôm nay: {formattedDate}</h2>
          
          <Row gutter={[16, 16]}>
            {mockClassData.map((cls) => (
              <Col key={cls.id} xs={24} sm={24} md={12} lg={12} xl={12}>
                <ClassCard {...cls} />
              </Col>
            ))}
          </Row>
        </Main>
      </Content>
    </Wrapper>
  );
};

export default AdminDashboard;
