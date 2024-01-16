import React, { useState } from "react";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LineCharts from "./LineCharts";

function ChartContainer({ categoryList }) {
  // const { categoryList } = useSelector((state) => state.category);

  // Assuming categoryList is an array of categories
  const categoryComponentList = ["Doughnut", "Bar", "Line"];

  // State to keep track of the selected category
  const [selectedCategory, setSelectedCategory] = useState(
    categoryComponentList[0]
  );

  // Function to handle user selection change
  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  // Conditional rendering based on the selected category
  const renderChart = () => {
    switch (selectedCategory) {
      case "Doughnut":
        return <DoughnutChart categories={categoryList} />;
      case "Bar":
        return <BarChart categories={categoryList} />;
      case "Line":
        return <LineCharts categories={categoryList} />;
      default:
        return <DoughnutChart categories={categoryList} />;
    }

    // Add more conditions for other chart types if needed
  };

  return (
    <ChatContainerWrapper>
      {categoryList && categoryList.length > 0 ? (
        <>
          {/* Display the selected chart */}
          {renderChart()}

          {/* Add a component or form for user selection */}
          <div className="Bottom-div">
            <div className="custom-select">
              <label>Select Chart Type:</label>
              <select
                className="StyledSelect"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {categoryComponentList.map((category) => (
                  <option
                    className="StyledOption"
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <h2>Most Used Top 5 Categories</h2>
          </div>
        </>
      ) : (
        <h1 className="No-Categories-heading">No Such Categories Created</h1>
      )}
    </ChatContainerWrapper>
  );
}

export default ChartContainer;

const ChatContainerWrapper = styled.div`
  margin: 20px auto;
  width: 500px;
  height: 500px;
  padding: 10px;
  border-radius: 6px;
  background: ${({ theme }) => theme.color.primaryContainer.Background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  .Bottom-div {
    margin-top: 10px;
    label {
      font-size: 17px;
      margin: 15px 0;
    }
  }

  @media screen and (max-width: 540px) {
    padding: 5px;
    width: 90vw;
  }

  @media screen and (max-width: 350px) {
    width: 80vw;
  }
`;

const StyledSelect = styled.select`
  margin: 10px 0;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.color.primaryText};
  border-radius: 4px;
  color: ${({ theme }) => theme.color.textColor};
  background-color: ${({ theme }) => theme.color.primaryContainer.Background};
`;

const StyledOption = styled.option`
  background-color: ${({ theme }) => theme.color.primaryContainer.Background};
  color: ${({ theme }) => theme.color.textColor};
`;
