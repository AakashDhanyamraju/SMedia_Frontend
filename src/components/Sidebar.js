import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-light">
      <ul className="list-group">
        <li className="list-group-item">Dashboard</li>
        <li className="list-group-item">Projects</li>
        <li className="list-group-item">Tasks</li>
        <li className="list-group-item">Messages</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
