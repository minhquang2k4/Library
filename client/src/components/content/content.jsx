import React from "react";
import { useState, useEffect } from "react";

const Content = () => {


  return (
    <div>
      <h1>Content</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};
