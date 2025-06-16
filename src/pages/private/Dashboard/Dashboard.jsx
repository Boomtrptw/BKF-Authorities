import React, { useEffect, useState } from 'react';
export const Dashboard = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/syetem/get-bkf-system-all/');
        const data = await response.json();
        setDataList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        padding: "20px",
        backgroundColor: "#FFF",
        borderRadius: "10px",
        justifyContent: "space-evenly",
      }}
    >
      {dataList.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            padding: "10px",
            border: "1px solid rgb(221, 221, 221)",
            borderRadius: "8px",
            textAlign: "center",
            backgroundColor: "rgb(247, 247, 247)",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px",
            flexBasis: "calc(20% - 16px)",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div style={{ width: "50px" }}>
            <img
              src={item.image_url}
              alt={item.name}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "4px",
              }}
            />
          </div>
          <span
            style={{
              marginLeft: "20px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {item.name}
          </span>
        </a>
      ))}
    </div>
  );
};
