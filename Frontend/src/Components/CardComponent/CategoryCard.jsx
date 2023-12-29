import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdDriveFileRenameOutline, MdOutlineAnalytics } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import CategoryDelete from "../PopupModels/CategoryDelete";
export default function CategoryCard({ categoryinfo }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      {show && <CategoryDelete catinfo={categoryinfo} />}
      <div className="category-details">
        <img src="/Profile.png" alt="" />
        <p>{categoryinfo.name}</p>
        <div className="cat-menu">
          <HiDotsVertical className="icon" />
          <div className="menu-details">
            <div className="menu-data">
              <span>Edit</span>
              <MdDriveFileRenameOutline className="menu-icon" />
            </div>
            <div className="menu-data" onClick={() => setShow(!show)}>
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
    </div>
  );
}

CategoryCard.defaultProps = {
  categoryinfo: {
    _id: new Date(),
    name: "Default Category Name",
    // Add other default properties if needed
  },
};
