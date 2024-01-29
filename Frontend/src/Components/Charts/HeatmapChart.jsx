import React, { useEffect, useState } from "react";
import Tooltip from "@uiw/react-tooltip";
import HeatMap from "@uiw/react-heat-map";
import styled from "styled-components";
import { useSelector } from "react-redux";

// const value = [
//   { date: "2023-01-11", count: 21 },
//   ...[...Array(17)].map((_, idx) => ({
//     date: `2016/01/${idx + 10}`,
//     count: idx,
//   })),
//   ...[...Array(17)].map((_, idx) => ({
//     date: `2016/02/${idx + 10}`,
//     count: idx,
//   })),
//   { date: "2016/04/12", count: 2 },
//   { date: "2016/05/01", count: 5 },
//   { date: "2016/05/02", count: 5 },
//   { date: "2016/05/03", count: 1 },
//   { date: "2016/05/04", count: 11 },
//   { date: "2016/05/08", count: 32 },
// ];

const HeatMapChart = () => {
  const { user } = useSelector((state) => state.user);
  const { incomeexpenseslist } = useSelector((state) => state.incomeexpense);
  const [value, setValues] = useState([]);

  const [selected, setSelected] = useState("");

  const joinedYear =
    new Date(user?.user.createdAt.split("T")[0]).getFullYear() || 2023;
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const years = Array.from(
    { length: currentYear - joinedYear + 1 },
    (_, index) => joinedYear + index
  );

  const filteredValue = value.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate.getFullYear() === parseInt(selectedYear, 10);
  });

  // Total Contrubution in year
  const TotalContrubution = value
    .filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.getFullYear().toString() === selectedYear.toString();
    })
    .reduce((total, data) => {
      return total + data.count;
    }, 0);

  // Update the value state based on incomeexpenseslist
  useEffect(() => {
    const updatedValues = value.map((data) => {
      const matchingItem = incomeexpenseslist.find(
        (item) => item.createddate === data.date
      );

      return {
        date: data.date,
        count: matchingItem ? data.count + 1 : data.count,
      };
    });

    incomeexpenseslist.forEach((item) => {
      const existingDate = updatedValues.find(
        (data) => data.date === item.createddate
      );
      if (existingDate) {
        existingDate.count += 1; // Increment count for existing date
      } else {
        updatedValues.push({
          date: item.createddate,
          count: 1,
        });
      }
    });

    setValues(updatedValues);
  }, []);

  // Filter Recent Activity Data
  useEffect(() => {
    if (selected !== "") {
      const selectedDate = new Date(selected.date);

      let Data = incomeexpenseslist.filter((item) => {
        const itemDate = new Date(item.createddate);

        const selectedYear = selectedDate.getFullYear();
        const selectedMonth = selectedDate.getMonth();
        const selectedDay = selectedDate.getDate();

        const itemYear = itemDate.getFullYear();
        const itemMonth = itemDate.getMonth();
        const itemDay = itemDate.getDate();

        return (
          selectedYear === itemYear &&
          selectedMonth === itemMonth &&
          selectedDay === itemDay
        );
      });

      console.log(Data);
    }
  }, [selected]);

  return (
    <Wrapper>
      <Main>
        <div className="head">
          <h3>
            {TotalContrubution} Transaction in {selectedYear}
          </h3>
        </div>

        <div className="main-content">
          <HeatMap
            className="HeatMap"
            value={filteredValue}
            width={720}
            startDate={new Date(`${selectedYear}/01/01`)}
            endDate={new Date(`${selectedYear}/12/31`)}
            rectRender={(props, data) => {
              if (selected !== "") {
                props.opacity = data.date === selected ? 1 : 0.45;
              }
              return (
                <Tooltip
                  className="ToolTip"
                  style={{ position: "fixed", top: "100px" }}
                  trigger="hover"
                  placement="right"
                  offsetX={10} // Adjust the horizontal offset
                  offsetY={0} // Adjust the vertical offset
                  content={`Date: ${data.date}, Transaction: ${
                    data.count || 0
                  }`}
                >
                  <rect
                    {...props}
                    onClick={() => {
                      setSelected({
                        date: data.date,
                        count: data.count,
                      });
                    }}
                  />
                </Tooltip>
              );
            }}
          />

          <hr />
          <div className="Transaction-activity">
            <h2>Transaction Activity</h2>
            <div className="trascation-activity-content">
              {selected === "" ? (
                <h2>Please Select A Date</h2>
              ) : (
                <>
                  <div className="date">
                    {selected.date}
                    <div className="line"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Main>
      <FilterSection>
        <label>Select Year: </label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.reverse().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </FilterSection>
    </Wrapper>
  );
};

export default HeatMapChart;

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  width: 900px;
  gap: 20px;
  overflow-x: auto;
  justify-content: center;
  align-items: flex-start;
  background: ${({ theme }) =>
    theme.color.SecondaryContainer.Background} !important;
  border-radius: 10px;

  .HeatMap {
    color: ${({ theme }) => theme.color.textColor} !important;
  }
`;

const FilterSection = styled.div`
  label {
    margin-right: 10px;
  }

  select {
    margin-top: 10px;
    padding: 5px;
  }
`;

const Main = styled.div`
  .head {
    margin-bottom: 10px;
  }

  .main-content {
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.color.textColor} !important;

    /* Transaction Acticity */
    .Transaction-activity {
      margin: 10px 0;

      .trascation-activity-content {
        text-align: center;
        margin: 10px 0;
      }

      .date {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 10px 0;
        gap: 10px;

        .line {
          width: 100%;
          height: 1px;
          background: ${({ theme }) => theme.color.textColor};
        }
      }
    }
  }
`;
