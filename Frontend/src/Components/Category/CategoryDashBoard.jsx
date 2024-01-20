import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiDotsVertical } from "react-icons/hi";
import { MdDriveFileRenameOutline, MdOutlineAnalytics } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CategoryCard from "../CardComponent/CategoryCard";
import DashBoardHeading from "../DashBord/DashBoardHeading";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateNewCategory,
  GetCategoryList,
} from "../../Store/Actions/CategoryActions";
import { FilterCategory } from "../../utils/Commonfunctions";
import useToast from "../Common/ToastContainerComponent";

export default function CategoryDashBoard({ device = "desktop" }) {
  const Dispatch = useDispatch();
  const { showToast } = useToast();
  const { categoryList, isLoading, error, message } = useSelector(
    (state) => state.category
  );

  const [incomeCategory, setincomeCategory] = useState([]);
  const [expenseCategory, setexpenseCategory] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("Income");
  useEffect(() => {
    Dispatch(GetCategoryList());
  }, []);

  useEffect(() => {
    if (categoryList !== 0) {
      setincomeCategory(FilterCategory(categoryList, "Income"));
      setexpenseCategory(FilterCategory(categoryList, "Expense"));
    }
  }, [categoryList]);

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    if (!categoryName || categoryName.length < 4) {
      return showToast("Minimum Category Name Length is 4", "info");
    }
    const Data = {
      name: categoryName,
      type: categoryType,
    };

    await CreateNewCategory(Data, Dispatch);
  };

  return (
    <div className="MainContainer">
      {device === "desktop" && (
        <>
          <DashBoardHeading />
          <h1
            style={{
              margin: "10px",
              fontSize: "22px",
              textTransform: "uppercase",
              paddingBottom: "5px",
              borderBottom: "2px solid #fff",
              width: "300px",
            }}
          >
            Categories
          </h1>
        </>
      )}
      {device === "desktop" && (
        <AddCategoryWrapper>
          <div className="create-Category-Form">
            <form onSubmit={OnSubmitHandler}>
              <h2 className="recen">Category Name</h2>
              <div className="category-text">
                <MdDriveFileRenameOutline className="form-icon" />
                <input
                  value={categoryName}
                  onChange={(e) => {
                    e.preventDefault();
                    setCategoryName(e.target.value);
                  }}
                  id="catname"
                  type="text"
                  placeholder="Enter category name"
                />
              </div>
              <h2 className="recen">Category Type</h2>
              <div className="category-text">
                <select
                  value={categoryType}
                  onChange={(e) => setCategoryType(e.target.value)}
                  id="cattype"
                  className="StyledSelect"
                >
                  <option className="StyledOption" value="Income">
                    Income
                  </option>
                  <option className="StyledOption" value="Expense">
                    Expense
                  </option>
                </select>
              </div>
              <button>Add Category</button>
            </form>
          </div>
          <div className="recent-category-list">
            <h2 className="recen">Recent Categories</h2>
            <div className="catContainer cat-list">
              {categoryList.length !== 0 ? (
                categoryList.slice(0, 10)?.map((ele, i) => {
                  return <CategoryCard key={i} categoryinfo={ele} />;
                })
              ) : (
                <h1 style={{ textAlign: "center" }}>Nothing Found </h1>
              )}
            </div>
          </div>
        </AddCategoryWrapper>
      )}
      <CategoryWrapper>
        <div
          className={`CategoryContainer ${
            device == "mobile"
              ? "mobile-CategoryContainer"
              : "desktop-CategoryContainer"
          }`}
        >
          <div className="category">
            {/* income category */}
            <div className="income-category">
              <h3 className="in">Income Category</h3>
              <div className="catContainer">
                {incomeCategory.length !== 0 ? (
                  incomeCategory?.map((ele, i) => {
                    return <CategoryCard key={i} categoryinfo={ele} />;
                  })
                ) : (
                  <h1 style={{ textAlign: "center" }}>Nothing Found </h1>
                )}
              </div>
            </div>
            {/* Expense category */}
            <div className="expense-category">
              <h3 className="ex">Expense Category</h3>
              <div className="catContainer">
                {expenseCategory.length !== 0 ? (
                  expenseCategory?.map((ele, i) => {
                    return <CategoryCard key={i} categoryinfo={ele} />;
                  })
                ) : (
                  <h1 style={{ textAlign: "center" }}>Nothing Found </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </CategoryWrapper>
    </div>
  );
}

const CategoryWrapper = styled.div`
  /* background: #202329; */

  margin: 20px auto;
  border-radius: 20px;
  @media screen and (max-width: 850px) {
    width: 96vw;
  }

  h3 {
    width: 200px;
    font-size: 20px;
    margin: 10px 0;
    padding-bottom: 5px;
    border-bottom: 2px solid
      ${({ theme }) => {
        return theme.color.primaryContainer.text;
      }};
  }
  .in {
    border-bottom: 2px solid greenyellow;
  }
  .ex {
    border-bottom: 2px solid red;
  }

  @media screen and (max-width: 530px) {
    h3 {
      width: 150px;
      font-size: 17px;
    }
  }
  @media screen and (max-width: 380px) {
    h3 {
      width: 100px;
      font-size: 10px;
    }
  }

  h2 {
    width: 180px;
    font-size: 17px;
    margin: 10px 0;
    padding: 5px 0;
    /* border-top: 2px solid
      ${({ theme }) => {
      return theme.color.primaryContainer.text;
    }}; */
    border-bottom: 2px solid
      ${({ theme }) => {
        return theme.color.primaryContainer.text;
      }};
  }
  .CategoryContainer {
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  /* Mobile Container */

  .mobile-CategoryContainer {
    width: 500px;
    margin: auto;
    height: 85vh;
    padding: 5px;
    border-radius: 20px;
    color: ${({ theme }) => {
      return theme.color.primaryContainer.text;
    }} !important;
    background: ${({ theme }) => {
      return theme.color.primaryContainer.Background;
    }};

    h2 {
      text-transform: capitalize;
    }

    @media screen and (max-width: 900px) {
      width: 100%;
    }
    .category {
      display: flex;
      justify-content: space-between;
      align-items: top;
      height: 100%;
      gap: 30px;
      padding: 5px 0;
      margin-bottom: 20px;
    }

    .income-category,
    .expense-category,
    .create-category {
      /* width: 500px !important; */
      height: 50%;
    }
  }

  /* Desktop Container */

  .desktop-CategoryContainer {
    width: 96vw;
    margin: auto;
    height: 85vh;
    padding: 5px;
    color: ${({ theme }) => {
      return theme.color.primaryContainer.text;
    }} !important;
    background: ${({ theme }) => {
      return theme.color.primaryContainer.Background;
    }};

    h2 {
      text-transform: capitalize;
    }
    .category {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 100%;
      gap: 30px;
      padding: 10px 0;
      margin-bottom: 20px;
    }

    .income-category,
    .expense-category,
    .create-category {
      height: 100%;
    }

    /* .income-category {
    margin: 10px 0;
  } */
    @media screen and (max-width: 800px) {
      .category {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1dr 1fr;
      }
    }
  }
`;

const AddCategoryWrapper = styled.div`
  width: 96vw;
  padding: 0 10px;
  margin: 40px auto;
  display: grid;
  grid-template-columns: 1.4fr 2fr;
  gap: 10px;
  color: ${({ theme }) => {
    return theme.color.primaryContainer.text;
  }} !important;
  background: ${({ theme }) => {
    return theme.color.primaryContainer.Background;
  }};

  @media screen and (max-width: 850px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  h2 {
    width: 180px;
    font-size: 17px;
    margin: 10px 0;
    padding: 5px 0;
    /* border-top: 2px solid
      ${({ theme }) => {
      return theme.color.primaryContainer.text;
    }}; */
    border-bottom: 2px solid
      ${({ theme }) => {
        return theme.color.primaryContainer.text;
      }};
  }

  .create-Category-Form {
    padding: 5px 10px;
    border-radius: 25px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 8px;
    gap: 10px;
    font-size: 18px;

    .category-text {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-size: 20px;
    }

    .form-icon {
      left: 3px;
      top: 5px;
      color: ${({ theme }) => theme.color.textColor};
      position: absolute;
    }

    input {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;
      padding: 7px;
      padding-left: 28px;
      border-radius: 5px;
      background: #fff;
      color: ${({ theme }) => theme.color.textColor};
      background-color: ${({ theme }) =>
        theme.color.primaryContainer.Background};
      border: 1px solid ${({ theme }) => theme.color.textColor};
    }

    button {
      margin: 5px 0;
      padding: 5px 10px;
      border-radius: 10px;
      border: none;
      text-transform: uppercase;
      font-weight: 600;
      background: #fff;
      color: #000;
    }
  }

  .cat-list {
    overflow-y: scroll;
    /* background: red; */
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .recen {
    border-bottom: 2px solid yellow;
  }
  .catContainer {
    height: 380px;

    overflow-y: scroll;
    padding: 10px 0;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
