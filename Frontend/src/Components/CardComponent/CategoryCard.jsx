import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdDriveFileRenameOutline, MdOutlineAnalytics } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function CategoryCard() {
  return (
    <div>
      <div className="category-details">
        <img src="/Profile.png" alt="" />
        <p>Cat Name lo L</p>
        <div className="cat-menu">
          <HiDotsVertical className="icon" />
          <div className="menu-details">
            <div className="menu-data">
              <span>Edit</span>
              <MdDriveFileRenameOutline className="menu-icon" />
            </div>
            <div className="menu-data">
              <span>Delete</span>
              <MdDelete className="menu-icon" />
            </div>
            <div className="menu-data">
              <span>Analysis</span>
              <MdOutlineAnalytics className="menu-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
