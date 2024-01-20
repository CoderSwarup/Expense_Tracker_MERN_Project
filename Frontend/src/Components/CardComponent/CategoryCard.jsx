import React, { useMemo, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdDriveFileRenameOutline, MdOutlineAnalytics } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import CategoryEdit from "../PopupModels/CategoryEdit";
import CategoryDelete from "../PopupModels/CategoryDelete";
import styled from "styled-components";
export default function CategoryCard({ categoryinfo }) {
  const [showDeleteModel, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const getColorData = useMemo(() => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    // Determine the brightness of the color
    const hexColor = color.substring(1); // Remove the hash symbol
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Choose text color based on brightness
    const textColor = brightness > 128 ? "#000000" : "#ffffff";

    return { color, textColor };
  }, []);
  const { color, textColor } = getColorData;

  return (
    <Wrapper>
      {showDeleteModel && (
        <CategoryDelete
          catinfo={categoryinfo}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      {showEditModal && (
        <CategoryEdit
          catinfo={categoryinfo}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="category-details">
        <div
          style={{
            background: color,
            color: textColor,
          }}
          className="circle"
        >
          {categoryinfo.name.slice(0, 2)}
        </div>
        <p>
          {categoryinfo.name.length > 10
            ? `${categoryinfo.name.slice(0, 9)}...`
            : categoryinfo.name}
        </p>
        <div className="cat-menu">
          <HiDotsVertical className="icon" />
          <div className="menu-details">
            <div
              className="menu-data"
              onClick={() => setShowEditModal(!showEditModal)}
            >
              <span>Edit</span>
              <MdDriveFileRenameOutline className="menu-icon" />
            </div>
            <div
              className="menu-data"
              onClick={() => setShowDeleteModal(!showDeleteModel)}
            >
              <span>Delete</span>
              <MdDelete className="menu-icon" />
            </div>
            <Link
              className="Link"
              to={`/category/analysis/${categoryinfo._id}`}
            >
              <div className="menu-data">
                <span>Analysis</span>
                <MdOutlineAnalytics className="menu-icon" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

CategoryCard.defaultProps = {
  categoryinfo: {
    _id: new Date(),
    name: "Default Category Name",
    // Add other default properties if needed
  },
};

const Wrapper = styled.div`
  .circle {
    display: grid;
    place-items: center;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
  .category-details {
    margin: 10px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    gap: 4px;
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

  .catContainer {
    overflow-y: scroll;
    padding: 10px 0;
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
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
`;
