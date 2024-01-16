import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiDotsVertical } from "react-icons/hi";
import { MdDriveFileRenameOutline, MdOutlineAnalytics } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CategoryCard from "../CardComponent/CategoryCard";
import DashBoardHeading from "../DashBord/DashBoardHeading";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoryList } from "../../Store/Actions/CategoryActions";
import { FilterCategory } from "../../utils/Commonfunctions";

export default function CategoryDashBoard({ device = "desktop" }) {
  const Dispatch = useDispatch();
  const { categoryList, isLoading, error, message } = useSelector(
    (state) => state.category
  );

  const [incomeCategory, setincomeCategory] = useState([]);
  const [expenseCategory, setexpenseCategory] = useState([]);

  useEffect(() => {
    Dispatch(GetCategoryList());
  }, []);

  useEffect(() => {
    if (categoryList !== 0) {
      setincomeCategory(FilterCategory(categoryList, "Income"));
      setexpenseCategory(FilterCategory(categoryList, "Expense"));
    }
  }, [categoryList]);

  return (
    <>
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

            {device === "desktop" && (
              <div className="create-category">
                <h3>Create Category</h3>
                <div className="addcategoryContainer">
                  <div className="create-Category-Form">
                    <h2>Create Category</h2>
                    <form action="">
                      <div className="category-text">
                        <MdDriveFileRenameOutline className="form-icon" />
                        <input type="text" placeholder="Enter category name" />
                      </div>
                      <button type="submit">Add Category</button>
                    </form>
                  </div>
                  <div className="recent-category-list">
                    <h2 className="recen">Recent Categories</h2>
                    <div className="catContainer cat-list">
                      {categoryList.length !== 0 ? (
                        categoryList?.map((ele, i) => {
                          return <CategoryCard key={i} categoryinfo={ele} />;
                        })
                      ) : (
                        <h1 style={{ textAlign: "center" }}>Nothing Found </h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CategoryWrapper>
    </>
  );
}

const CategoryWrapper = styled.div`
  /* background: #202329; */
  margin: 20px 0;
  border-radius: 20px;
  padding: 10px;
  color: ${({ theme }) => {
    return theme.color.primaryContainer.text;
  }} !important;

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

  .recen {
    border-bottom: 2px solid yellow;
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
  img {
    width: 40px;
  }

  .catContainer {
    overflow-y: scroll;
    padding: 10px 0;
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .category-details {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    gap: 5px;

    .icon {
      font-size: 20px;
      cursor: pointer;
    }
    p {
      width: 80%;
      font-size: 16px;
      font-weight: 700;
    }
    @media screen and (max-width: 400px) {
      p,
      .icon {
        font-size: 10px;
      }
    }
  }
  /* Mobile Container */
  .CategoryContainer.mobile-CategoryContainer {
    /* overflow: hidden; */
    width: 500px;
    height: 85vh;
    padding: 20px;
    background: ${({ theme }) => {
      return theme.color.primaryContainer.Background;
    }};
    border-radius: 20px;
    h2 {
      text-transform: capitalize;
    }

    @media screen and (max-width: 900px) {
      width: 90vw;
    }
  }
  .mobile-CategoryContainer {
    .category {
      display: flex;
      justify-content: center;
      align-items: top;
      height: 100%;
      gap: 30px;
      padding: 10px 0;
      margin-bottom: 20px;
    }

    .income-category,
    .expense-category,
    .create-category {
      /* width: 500px !important; */
      height: 50%;
    }

    /* .income-category {
    margin: 10px 0;
    } */
  }

  /* Desktop Container */

  .CategoryContainer.desktop-CategoryContainer {
    overflow-x: hidden;
    width: 100%;
    height: 85vh;
    padding: 20px;
    background: ${({ theme }) => {
      return theme.color.primaryContainer.Background;
    }};
    border-radius: 20px;
    h2 {
      text-transform: capitalize;
    }
  }

  .desktop-CategoryContainer {
    .category {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 100%;
      gap: 30px;
      padding: 10px 0;
      margin-bottom: 20px;
    }

    .income-category,
    .expense-category,
    .create-category {
      height: 55%;
    }

    /* .income-category {
    margin: 10px 0;
  } */
    @media screen and (max-width: 800px) {
      .category {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1dr 1fr;
      }

      .income-category,
      .expense-category,
      .create-category {
        height: 100px;
      }
    }
  }

  .addcategoryContainer {
    margin: 20px 0;
    height: 95%;

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin: 8px;
      gap: 10px;

      .category-text {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        font-size: 20px;
      }

      .form-icon {
        left: 0;
        top: 5px;
        color: ${({ theme }) => {
          return theme.color.primaryContainer.text;
        }};
        position: absolute;
      }

      input {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
        border: none;
        padding: 7px;
        padding-left: 28px;
        border-radius: 5px;
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
      height: 380px !important;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .cat-menu {
    position: relative;

    .menu-details {
      position: absolute;
      bottom: -90px;
      right: 0;
      width: 140px;
      color: #000000;
      background: #fff;
      padding: 3px;

      display: none;
      .menu-data {
        width: 100%;
        display: flex;
        margin: 5px 0;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
        padding: 2px;
        &:hover {
          background: #0d0d0d;
          color: #fff;
        }
      }

      font-size: 15px;
      cursor: pointer;
    }

    &:hover .menu-details {
      display: block;
    }
  }

  .create-Category-Form {
    padding: 5px 10px;
    border-radius: 25px;
    /* background: linear-gradient(to left, #0000ffa3, red); */
    /* box-shadow: 4px 10px 130px #fff; */
  }
`;
