import { Form, Input, DatePicker, Select, Slider, Button, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useState } from "react";

import { useFilterDispatch } from "../store/hooks";
import { filterActions } from "../store/filter-slice";

const { RangePicker } = DatePicker;

const Filter = () => {
  const filterDispatch = useFilterDispatch();

  const [priceRange, setPriceRange] = useState<number[]>([100, 500]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleFinish = (values: any) => {
    const { location, dateRange } = values;

    filterDispatch(
      filterActions.setFilters({
        location: location || "",
        startDate: dateRange ? dateRange[0].format("YYYY-MM-DD") : "",
        endDate: dateRange ? dateRange[1].format("YYYY-MM-DD") : "",
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      })
    );
  };

  return (
    <Form
      id="filter-form"
      name="filter"
      initialValues={{ remember: true }}
      onFinish={handleFinish}
    >
      <Row>
        <Form.Item name="location" id="location" className="p-4">
          <Input id="locationInput" placeholder="City Location" />
        </Form.Item>

        <Form.Item name="dateRange" id="dateRange" className="p-4">
          <RangePicker id="dateRangePicker" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="priceRange" id="priceRange" className="p-4">
          <Select
            id="priceRangeSelect"
            placeholder="Price"
            popupMatchSelectWidth={false}
            dropdownRender={() => (
              <div className="p-4 py-2">
                <div className="flex items-center">
                  <p className="mr-4">$Min</p>
                  <Slider
                    onChangeComplete={handlePriceChange}
                    defaultValue={[100, 500]}
                    min={100}
                    max={500}
                    style={{ width: "10vw" }}
                    className="flex-1 w-fit"
                    range={{ draggableTrack: true }}
                    id="priceRangeSlider"
                  />
                  <p className="ml-4">$Max</p>
                </div>
              </div>
            )}
          />
        </Form.Item>

        <Form.Item className="p-4">
          <Button type="primary" htmlType="submit" id="submitButton">
            <SearchOutlined />
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default Filter;
