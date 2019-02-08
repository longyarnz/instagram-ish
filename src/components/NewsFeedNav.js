import React from 'react'

export default function NewsFeedNav() {
  return (
    <nav className="nav-sec">
      <div className="d-flex justify-content-between">
        <div className="p-2 nav-icon-lg mint-green">
          <a className="nav-icon" href="photo_home.html"><em className="fa fa-home"></em>
            <span>Home</span>
          </a>
        </div>
        <div className="p-2 nav-icon-lg clean-black">
          <a className="nav-icon" href="photo_explore.html"><em className="fa fa-crosshairs"></em>
            <span>Explore</span>
          </a>
        </div>
        <div className="p-2 nav-icon-lg dark-black">
          <a className="nav-icon" href="photo_upload.html"><em className="fab fa-instagram"></em>
            <span>Upload</span>
          </a>
        </div>
        <div className="p-2 nav-icon-lg clean-black">
          <a className="nav-icon" href="photo_stories.html"><em className="fa fa-align-left"></em>
            <span>Stories</span>
          </a>
        </div>
        <div className="p-2 nav-icon-lg dark-black">
          <a className="nav-icon" href="photo_profile.html"><em className="fa fa-user"></em>
            <span>Profile</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
