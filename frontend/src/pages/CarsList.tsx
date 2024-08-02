import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useCarDispatch, useCarSelector } from "../store/hooks.ts";
import { fetchCarData } from "../store/car-actions.ts";

import { Card, Space, Spin, Row, Col, List } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Filter from "../components/Filter.tsx";

const { Meta } = Card;

const CarsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const carDispatch = useCarDispatch();
  const cars = useCarSelector((state) => state.car.items);

  useEffect(() => {
    if (isLoading) {
      carDispatch(fetchCarData(setIsLoading));
    }
  }, [carDispatch, isLoading]);

  return (
    <>
      <Row>
        <Filter />
      </Row>
      <Row className="h-screen">
        <Col span={14} className="overflow-scroll h-screen p-2">
          {isLoading ? (
            <Space className="flex justify-center pt-12">
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            </Space>
          ) : (
            <List
              itemLayout="vertical"
              size="small"
              dataSource={cars}
              renderItem={(car) => (
                <NavLink to={`/cars/${car.carId}`}>
                  <List.Item key={car.carId}>
                    <Card
                      style={{ height: "100%" }}
                      cover={
                        <img
                          alt="example"
                          src={car.headerImage}
                          className="w-full object-cover"
                        />
                      }
                    >
                      <Meta title={car.make} description={car.model} />
                    </Card>
                  </List.Item>
                </NavLink>
              )}
            />
          )}
        </Col>
        <Col span={10}></Col>
      </Row>
    </>
  );
};

export default CarsList;
